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
//        this.onXXX = new YAHOO.util.CustomEvent("onXXX", this);

        /* Register this component */
        Alfresco.util.ComponentManager.register(this);

        /* Load YUI Components */
        Alfresco.util.YUILoaderHelper.require(
                [ "json", "connection", "event" ], this.onComponentsLoaded,
                this);

        return this;
    };

    // +++ Static properties
//    Alfresco.Boilerplate.xxx = xxx;
     
    // Prototype definition
    Alfresco.Boilerplate.prototype = {
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
         * xxx
         * 
         * @property onXXX
         */
//        onXXX : null,

        // +++ PUBLIC METHODS
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
        	// Initialise the UI
        },

        // +++ PRIVATE METHODS

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
                    "Alfresco.Boilerplate",
                    Array.prototype.slice.call(arguments).slice(1));
        }
    };

})();
