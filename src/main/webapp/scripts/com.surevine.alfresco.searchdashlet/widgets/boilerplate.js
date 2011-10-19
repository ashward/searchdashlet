/**
 * Boilerplate widget.
 * 
 * [Explanation of the widget]
 * 
 * @namespace Alfresco
 * @class Boilerplate
 */
(function()
{
    /**
     * YUI Library aliases
     */
    var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event, Element = YAHOO.util.Element;

    /**
     * Alfresco Slingshot aliases
     */
    var $html = Alfresco.util.encodeHTML;

    /**
     * Boilerplate constructor.
     * 
     * @param {String}
     *                htmlId The HTML id of the parent element
     * @return {Alfresco.Boilerplate} The new instance
     * @constructor
     */
    Alfresco.Boilerplate = function(htmlId)
    {
        /* Mandatory properties */
        this.name = "Alfresco.Boilerplate";
        this.id = htmlId;

        /* Initialise prototype properties */
        this.widgets = {};
        this.modules = {};

        /* Initialise the events */
        this.onTriggerVisibilityClick = new YAHOO.util.CustomEvent(
                "onTriggerVisibilityClick", this);

        /* Register this component */
        Alfresco.util.ComponentManager.register(this);

        /* Load YUI Components */
        Alfresco.util.YUILoaderHelper.require(
                [ "json", "connection", "event" ], this.onComponentsLoaded,
                this);

        return this;
    };

    // +++ Static properties

    Alfresco.EnhancedSecurityVisibilityCount.prototype = {
        /**
         * Object container for initialization options
         * 
         * @property options
         * @type object
         */
        options : {
            /**
             * Determines if the object should be clickable or not. Only takes
             * effect if set at initialisation.
             * 
             * @property clickable
             * @type boolean
             */
            clickable : true
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

        /**
         * Flag to denote whether the visibility is currently loading
         * 
         * @private
         * @property loading
         * @type boolean
         */
        loading : false,

        /**
         * Counter which is incremented every time there is an ajax request
         * 
         * @private
         * @property ajaxCounter
         * @type int
         */
        ajaxCounter : 0,

        /**
         * Used to keep track of what the current marking is so that we can
         * ignore multiple calls for the same marking
         * 
         * @private
         * @property currentMarking
         * @type object
         */
        currentMarking : null,

        /**
         * Whether the count is currently obfuscated
         * 
         * @private
         * @property countObfuscated
         * @type boolean
         */
        countObfuscated : false,

        /**
         * Stored the last count value if the count has been obfuscated. Is set
         * to null if the security label has been changed in the meantime (as
         * the last count would then be incorrect)
         * 
         * @private
         * @property lastCountValue
         * @type int
         */
        lastCountValue : null,

        // +++ PUBLIC EVENTS

        /**
         * Event fired when the visibility drill-down button is clicked
         * 
         * @property onTriggerVisibilityClick
         */
        onTriggerVisibilityClick : null,

        // +++ PUBLIC METHODS

        /**
         * Sets the security marking. Will trigger the update, via ajax, of the
         * visibility count.
         * 
         * @public
         * @method setSecurityMarking
         * @param {Object}
         *                securityMarking the security marking
         */
        setSecurityMarking : function(securityMarking)
        {
            if (Alfresco.EnhancedSecurityVisibilityUtils
                    .securityMarkingsHaveSameVisibility(this.currentMarking,
                            securityMarking)) {
                return;
            }

            this.currentMarking = Alfresco.EnhancedSecurityVisibilityUtils
                    .cloneSecurityMarking(securityMarking);

            this.lastCountValue = null;

            /* We won't bother loading if the count is obfuscated anyway! */
            if (!this.countObfuscated) {
                this.loadAndDisplayMarkingCount();
            }
        },

        /**
         * Sets whether the count should be obfuscated. This may be desirable if
         * the user should not have information on the count, for example if the
         * user cannot see the label they have selected.
         * 
         * @public
         * @method setCountObfuscated
         * @param obfuscated
         *                <code>true</code> to hide the count
         *                <code>false</code> to show the count.
         */
        setCountObfuscated : function(obfuscated)
        {
            this.countObfuscated = obfuscated;

            if (obfuscated) {
                this.displayCount("obfuscated");
            } else {
                if (this.lastCountValue !== null) {
                    this.displayCount(this.lastCountValue);
                } else {
                    this.loadAndDisplayMarkingCount();
                }
            }
        },

        /**
         * Set multiple initialization options at once.
         * 
         * @method setOptions
         * @param obj
         *                {object} Object literal specifying a set of options
         * @return {Alfresco.EnhancedSecuritySingleValueSelector} returns 'this'
         *         for method chaining
         */
        setOptions : function(obj)
        {
            this.options = YAHOO.lang.merge(this.options, obj);

            return this;
        },

        /**
         * Set messages for this component.
         * 
         * @method setMessages
         * @param obj
         *                {object} Object literal specifying a set of messages
         * @return {Alfresco.EnhancedSecurityVisibilityCount} returns 'this' for
         *         method chaining
         */
        setMessages : function(obj)
        {
            Alfresco.util.addMessages(obj, this.name);

            return this;
        },

        /**
         * Fired by YUILoaderHelper when required component script files have
         * been loaded into the browser.
         * 
         * @method onComponentsLoaded
         */
        onComponentsLoaded : function()
        {
            Event.onContentReady(this.id, this.onReady, this, true);
        },

        /**
         * Fired by YUI when parent element is available for scripting.
         * Component initialisation, including instantiation of YUI widgets and
         * event listener binding.
         * 
         * @method onReady
         */
        onReady : function()
        {
            var el = Dom.get(this.id);

            this.widgets.tooltip = new YAHOO.widget.Tooltip(this.id
                    + "-tooltip", {
                context : this.id,
                showDelay : 0,
                width : "20em"
            });

            // Up the z-index when the tooltip is shown otherwise the layout
            // manager
            // gets really confused and the group selector is displayed over the
            // tooltip
            this.widgets.tooltip.contextMouseOverEvent.subscribe(function(
                    context)
            {
                Dom.setStyle(this.id + "-tooltip", "z-index", "1000");
            }, this, true);

            this.widgets.tooltip.contextMouseOutEvent.subscribe(function(
                    context)
            {
                Dom.setStyle(this.id + "-tooltip", "z-index", "0");
            }, this, true);

            if (this.options.clickable) {
                this.widgets.detailsButton = Alfresco.util.createYUIButton(
                        this, "detailsButton", this.fireOnClick, {
                            disabled : true
                        });
            } else {
                Dom.addClass(this.id + "-detailsButton", "hidden");
            }
        },

        // +++ PRIVATE METHODS

        fireOnClick : function()
        {
            // TODO: This conditional should really be somewhere else - it
            // shouldn't be up to this object to decide what happens when the
            // event fires
            if (this.countObfuscated) {
                Alfresco.util.PopupManager.displayPrompt({
                    title : this
                            ._msg("visibility.cannot-view-not-visible.title"),
                    text : this
                            ._msg("visibility.cannot-view-not-visible.message")
                });
            } else {
                this.onTriggerVisibilityClick.fire();
            }
        },

        loadAndDisplayMarkingCount : function()
        {
            this.ajaxCounter++;

            if (!this.currentMarking) {
                return;
            }

            // Display "everyone" if there are no groups.
            // Assumes atomal has no effect on marking.
            if (Alfresco.EnhancedSecurityVisibilityUtils
                    .isMarkingVisibleToEveryone(this.currentMarking)) {
                this.displayCount("everyone");
                return;
            }
            // ---

            this.displayLoading();

            var successCallback = {
                fn : function(count, sequence)
                {
                    /*
                     * If this isn't the latest ajax call then we will ignore
                     * it.
                     */
                    if (sequence != this.ajaxCounter) {
                        return;
                    }

                    this.lastCountValue = count;
                    this.displayCount(count);
                },
                scope : this,
                obj : this.ajaxCounter
            };

            var failureCallback = {
                fn : function(sequence)
                {
                    /*
                     * If this isn't the latest ajax call then we will ignore
                     * it.
                     */
                    if (sequence != this.ajaxCounter) {
                        return;
                    }

                    this.lastCountValue = null;
                    this.displayCount("?");
                },
                scope : this,
                obj : this.ajaxCounter
            };

            Alfresco.EnhancedSecurityVisibilityUtils
                    .getVisibilityCountForMarking(this.currentMarking,
                            successCallback, failureCallback);
        },

        /**
         * Displays the loading animation
         * 
         * @private
         * @method displayLoading
         */
        displayLoading : function()
        {
            Dom.addClass(Dom.get(this.id), "visibility-count-loading");

            this.loading = true;
        },

        /**
         * Displays the count value in the count field.
         * 
         * @private
         * @method displayCount
         */
        displayCount : function(count)
        {
            this.loading = false;

            var countElement = Dom.get(this.id + "-label");

            // Alfresco.util.Anim.pulse(this.id);

            if (count == "everyone") {
                countElement.innerHTML = $html(this._msg("visibility.everyone"));
                this.setDetailsButtonDisabled(true);
            } else if (count == "obfuscated") {
                countElement.innerHTML = this
                        ._msg("visibility.count.obfuscated");
                this.setDetailsButtonDisabled(true);
            } else if (count == 1) {
                countElement.innerHTML = $html(this
                        ._msg("visibility.count.one"));
                this.setDetailsButtonDisabled(false);
            } else {
                countElement.innerHTML = $html(this._msg("visibility.count",
                        count));
                this.setDetailsButtonDisabled(false);
            }

            Dom.removeClass(Dom.get(this.id), "visibility-count-loading");
        },
        
        /**
         * Sets whether the details button should be disabled or not
         * 
         * @private
         * @method setDetailsButtonDisabled
         * @param disabled boolean
         */
        setDetailsButtonDisabled : function(disabled) {
            if(this.widgets.detailsButton) {
                this.widgets.detailsButton.set("disabled", disabled);
            }
        },

        /**
         * Gets a custom message
         * 
         * @method _msg
         * @param messageId
         *                {string} The messageId to retrieve
         * @return {string} The custom message
         * @private
         */
        _msg : function(messageId)
        {
            return Alfresco.util.message.call(this, messageId,
                    "Alfresco.EnhancedSecuritySingleValueSelector",
                    Array.prototype.slice.call(arguments).slice(1));
        }
    };

})();
