/**
 * SearchDashletResults widget.
 * 
 * Contains a live YUI data table which loads and displays the results of the
 * search
 * 
 * @namespace Alfresco
 * @class SearchDashletResults
 */
(function() {
	/**
	 * YUI Library aliases
	 */
	var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event, Element = YAHOO.util.Element;

	/**
	 * Alfresco Slingshot aliases
	 */
	var $html = Alfresco.util.encodeHTML;

	/**
	 * SearchDashletResults constructor.
	 * 
	 * @param {String}
	 *            htmlId The HTML id of the parent element
	 * @return {Alfresco.SearchDashletResults} The new instance
	 * @constructor
	 */
	Alfresco.SearchDashletResults = function(htmlId) {
		/* Mandatory properties */
		this.name = "Alfresco.Boilerplate";
		this.id = htmlId;

		/* Initialise prototype properties */
		this.widgets = {};
		this.modules = {};

		/* Register this component */
		Alfresco.util.ComponentManager.register(this);

		/* Load YUI Components */
		Alfresco.util.YUILoaderHelper.require(
				[ "json", "connection", "event" ], this.onComponentsLoaded,
				this);

		return this;
	};

	// +++ Static properties
	// Alfresco.Boilerplate.xxx = xxx;

	// Prototype definition
	Alfresco.SearchDashletResults.prototype = {
		/**
		 * Object container for initialization options
		 * 
		 * @property options
		 * @type object
		 */
		options : {
			maxSearchResults : 100
		},

		/**
		 * Object container for storing YUI widget instances.
		 * 
		 * @property widgets
		 * @type object
		 */
		widgets : null,

		/**
		 * Object container for storing module instances.
		 * 
		 * @property modules
		 * @type object
		 */
		modules : null,

		// +++ PUBLIC EVENTS

		// +++ PUBLIC METHODS
		/**
		 * Set multiple initialization options at once.
		 * 
		 * @method setOptions
		 * @param obj
		 *            {object} Object literal specifying a set of options
		 * @return {Alfresco.EnhancedSecuritySingleValueSelector} returns 'this'
		 *         for method chaining
		 */
		setOptions : function(obj) {
			this.options = YAHOO.lang.merge(this.options, obj);

			return this;
		},

		/**
		 * Fired by YUILoaderHelper when required component script files have
		 * been loaded into the browser.
		 * 
		 * @method onComponentsLoaded
		 */
		onComponentsLoaded : function() {
			Event.onContentReady(this.id, this.onReady, this, true);
		},

		/**
		 * Fired by YUI when parent element is available for scripting.
		 * Component initialisation, including instantiation of YUI widgets and
		 * event listener binding.
		 * 
		 * @method onReady
		 */
		onReady : function() {
			// DataSource definition
			var uriSearchResults = Alfresco.constants.PROXY_URI_RELATIVE
					+ "slingshot/search?";
			this.widgets.dataSource = new YAHOO.util.DataSource(
					uriSearchResults, {
						responseType : YAHOO.util.DataSource.TYPE_JSON,
						connXhrMode : "cancelStaleRequests",
						responseSchema : {
							resultsList : "items"
						}
					});

			this._initDataTable();
		},

		/**
		 * Initiate a new search.
		 * 
		 * @public
		 * @method doSearch
		 * @param term
		 *            the search term
		 * @param order
		 *            an array of fields to order by
		 */
		doSearch : function(term, tags, orderBy) {
	         // Success handler
	         function successHandler(sRequest, oResponse, oPayload)
	         {
		         // empty results table
		         this.widgets.dataTable.deleteRows(0, this.widgets.dataTable.getRecordSet().getLength());

	            this.widgets.dataTable.onDataReturnInitializeTable.call(this.widgets.dataTable, sRequest, oResponse, oPayload);
	         }
	         
	         // Failure handler
	         function failureHandler(sRequest, oResponse)
	         {
	            if (oResponse.status == 401)
	            {
	               // Our session has likely timed-out, so refresh to offer the login page
	               window.location.reload();
	            }
	            else
	            {
	               try
	               {
	                  var response = YAHOO.lang.JSON.parse(oResponse.responseText);
	                  this.widgets.dataTable.set("MSG_ERROR", response.message);
	                  this.widgets.dataTable.showTableMessage(response.message, YAHOO.widget.DataTable.CLASS_ERROR);
	               }
	               catch(e)
	               {
	                  this._setDefaultDataTableErrors(this.widgets.dataTable);
	                  this.widgets.dataTable.render();
	               }
	            }
	         }
	         
	         this.widgets.dataSource.sendRequest(this._buildSearchParams(null, term, tags, orderBy),
	         {
	            success: successHandler,
	            failure: failureHandler,
	            scope: this
	         });

		},

		// +++ PRIVATE METHODS

		/**
		 * Set up the data table
		 * 
		 * @private
		 * @method _initDataTable
		 */
		_initDataTable : function() {
			var me = this;
			
			var _itemLinkFormatter = function(elCell, oRecord, oColumn, sData) {
				var url = me._getBrowseUrlForRecord(oRecord);

				// displayname and link to details page
				var displayName = oRecord.getData("displayName");
				var desc = '<h3 class="itemname"><a href="' + url
						+ '" class="theme-color-1">' + $html(displayName) + '</a>';
				// add title (if any) to displayname area
				var title = oRecord.getData("title");
				if (title && title !== displayName) {
					desc += '<span class="title">(' + $html(title) + ')</span>';
				}
				desc += '</h3>';

				elCell.innerHTML = desc;
			};
			
			var columnDefs = [ {
				key : "title",
				sortable : false,
				resizeable : true,
				label : this._msg("results.title"),
				formatter : _itemLinkFormatter
			} ];

			this.widgets.dataTable = new YAHOO.widget.DataTable(this.id
					+ "-results", columnDefs, this.widgets.dataSource, {
				renderLoopSize : Alfresco.util.RENDERLOOPSIZE,
				initialLoad : false,
				MSG_LOADING : ""
			});
		},

	      /**
	       * Constructs the completed browse url for a record.
	       * @param record {string} the record
	       */
	      _getBrowseUrlForRecord: function Search__getBrowseUrlForRecord(record)
	      {
	         var url = null;
	         
	         var name = record.getData("name"),
	             type = record.getData("type"),
	             site = record.getData("site"),
	             path = record.getData("path");
	         
	         switch (type)
	         {
	            case "document":
	            {
	               url = "document-details?nodeRef=" + record.getData("nodeRef");
	               break;
	            }
	            
	            case "folder":
	            {
	               if (path !== null)
	               {
	                  if (site)
	                  {
	                     url = "documentlibrary?path=" + encodeURIComponent(this._buildSpaceNamePath(path.split("/"), name));
	                  }
	                  else
	                  {
	                     url = "repository?path=" + encodeURIComponent(this._buildSpaceNamePath(path.split("/").slice(2), name));
	                  }
	               }
	               break;
	            }
	            
	            case "blogpost":
	            {
	               url = "blog-postview?postId=" + name;
	               break;
	            }
	            
	            case "forumpost":
	            {
	               url = "discussions-topicview?topicId=" + name;
	               break;
	            }
	            
	            case "calendarevent":
	            {
	               url = record.getData("container") + "?date=" + Alfresco.util.formatDate(record.getData("modifiedOn"), "yyyy-mm-dd");
	               break;
	            }
	            
	            case "wikipage":
	            {
	               url = "wiki-page?title=" + name;
	               break;
	            }
	            
	            case "link":
	            {
	               url = "links-view?linkId=" + name;
	               break;
	            }
	            
	            case "datalist":
	            case "datalistitem":
	            {
	               url = "data-lists?list=" + name;
	               break;
	            }
	         }
	         
	         if (url !== null)
	         {
	            // browse urls always go to a page. We assume that the url contains the page name and all
	            // parameters. Add the absolute path and the optional site param
	            if (site)
	            {
	               url = Alfresco.constants.URL_PAGECONTEXT + "site/" + site.shortName + "/" + url;
	            }
	            else
	            {
	               url = Alfresco.constants.URL_PAGECONTEXT + url;
	            }
	         }
	         
	         return (url !== null ? url : '#');
	      },
	      
	      _buildSpaceNamePath: function Search__buildSpaceNamePath(pathParts, name)
	      {
	         return (pathParts.length !== 0 ? ("/" + pathParts.join("/")) : "") + "/" + name;
	      },

		/**
		 * Constructs the folder url for a record.
		 * 
		 * @param path
		 *            {string} folder path For a site relative item this can be
		 *            empty (root of doclib) or any path - without a leading
		 *            slash For a repository item, this can never be empty - but
		 *            will contain leading slash and Company Home root
		 */
		_getBrowseUrlForFolderPath : function Search__getBrowseUrlForFolderPath(
				path, site) {
			var url = null;
			if (site) {
				url = Alfresco.constants.URL_PAGECONTEXT + "site/"
						+ site.shortName + "/documentlibrary?path="
						+ encodeURIComponent('/' + path);
			} else {
				url = Alfresco.constants.URL_PAGECONTEXT
						+ "repository?path="
						+ encodeURIComponent('/'
								+ path.split('/').slice(2).join('/'));
			}
			return url;
		},

	      /**
	       * Build URI parameter string for search JSON data webscript
	       *
	       * @method _buildSearchParams
	       */
	      _buildSearchParams: function Search__buildSearchParams(siteId, searchTerm, searchTag, orderBy)
	      {
	         var params = YAHOO.lang.substitute("site={site}&term={term}&tag={tag}&maxResults={maxResults}&sort={sort}",
	         {
	            site: encodeURIComponent(siteId ? siteId : ""),
	            term: encodeURIComponent(searchTerm ? searchTerm : ""),
	            tag: encodeURIComponent(searchTag ? searchTag : ""),
	            sort: encodeURIComponent(orderBy ? orderBy : ""),
	            maxResults: this.options.maxSearchResults + 1 // to calculate whether more results were available
	         });
	         
	         return params;
	      },
	      
		/**
		 * Gets a custom message
		 * 
		 * @method _msg
		 * @param messageId
		 *            {string} The messageId to retrieve
		 * @return {string} The custom message
		 * @private
		 */
		_msg : function(messageId) {
			return Alfresco.util.message.call(this, messageId,
					"Alfresco.SearchDashlet", Array.prototype.slice.call(
							arguments).slice(1));
		}
	};

})();
