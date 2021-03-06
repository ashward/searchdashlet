/**
 * SearchDashletTermInput widget.
 * 
 * Provides the term input and a search button so that the user can carry out a
 * search
 * 
 * @namespace Surevine
 * @class SearchDashletTermInput
 */
(function() {
	// Set up the appropriate namespace (if it's not already)
	typeof(Surevine) == "undefined" && ( Surevine = {} );

	/**
	 * YUI Library aliases
	 */
	var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event, Element = YAHOO.util.Element;

	/**
	 * Alfresco Slingshot aliases
	 */
	var $html = Alfresco.util.encodeHTML;

	/**
	 * SearchDashletInput constructor.
	 * 
	 * @param {String}
	 *            htmlId The HTML id of the parent element
	 * @return {Alfresco.SearchDashletInput} The new instance
	 * @constructor
	 */
	Surevine.SearchDashletTermInput = function(htmlId) {
		/* Mandatory properties */
		this.name = "Surevine.SearchDashletTermInput";
		this.id = htmlId;

		/* Initialise prototype properties */
		this.widgets = {};
		this.modules = {};

		/* Initialise the events */
		this.onChange = new YAHOO.util.CustomEvent("onChange", this);

		/* Register this component */
		Alfresco.util.ComponentManager.register(this);

		/* Load YUI Components */
		Alfresco.util.YUILoaderHelper.require(
				[ "json", "connection", "event" ], this.onComponentsLoaded,
				this);

		return this;
	};

	// Prototype definition
	Surevine.SearchDashletTermInput.prototype = {
		/**
		 * Object container for initialization options
		 * 
		 * @property options
		 * @type object
		 */
		options : {
		// Put any config options here
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

		/**
		 * Fired when the user triggers a search
		 * 
		 * @property onSearch
		 */
		onChange : null,

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
			this.widgets.searchTerm = Dom.get(this.id + "-searchTerm");
			
			Event.addListener(this.widgets.searchTerm, "keyup", function(e) {
				this.onChange.fire(this.getValue());
			}, this, true);
		},
		
		getValue : function() {
			return this.widgets.searchTerm.value;
		},

		// +++ PRIVATE METHODS

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
					"Surevine.SearchDashlet", Array.prototype.slice.call(
							arguments).slice(1));
		}
	};

})();
