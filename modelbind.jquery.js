(function ($) {

  /** 
   * Constructor
   * @param context - this instance's "context", i.e., the page element this is attached to
   * @param config - the configuration parameters passed into this instance
   */
  var ModelBind = function (context, config) {
    var CONFIG = {
      autoUpdate: true,
      bindAttribute: "id"
    };

    // Make a deep copy of the config obj
    CONFIG = $.extend({}, CONFIG, config);

    // Make a deep copy of the model
    var MODEL = $.extend({}, config.model);

    /**
     * init - initialize this widget
     */
    this.init = function () {
      var self = this;
      this.updateForm();

      $elems = this.getDynamicElems();
      $elems.change(function () {
        self.updateModel();
      });
      return context;
    };

    /**
     * getDynamicElems - Gets all "dynamic" elements on the page, i.e., any field
     * that can be changed such as inputs.
     */
    this.getDynamicElems = function () {
      return $(context).find("input,select,textarea").filter(function(a,b) {
        var attr = $(b).attr("data-fn");
        if (typeof attr !== typeof undefined && attr !== false) {
            return true;
        }
      });
    };

    /**
     * updateModel - update the model for this instance, based
     * on changes in the form (in any of the "dynamic" elements) 
     */
    this.updateModel = function () {
      var $elems = this.getDynamicElems();
      $elems.each(function (i, v) {
        MODEL[$(v).attr(CONFIG.bindAttribute)] = $(this).val();
      });
    };

    /**
     * setModel - set a new model to be applied to this instance. This
     * automatically updates the page (or area therein) with the values
     * of the new model.
     * 
     * @param newModel - thew new model to apply to this instance
     */
    this.setModel = function(newModel) {
      MODEL = $.extend({}, newModel);
      this.updateForm();
    }

    /**
     * updateForm - updates the "form" (or other area on the page) with
     * the values in the model
     */
    this.updateForm = function () {
      $.each(MODEL, function(k,v){
        var $elem = $(context).find("["+CONFIG.bindAttribute+"="+k+"]");
        var tName = $elem.get(0).tagName;
        if(["INPUT", "SELECT", "TEXTAREA"].includes(tName)) { 
          $elem.val(v);
        } else {
          $elem.text(v);
        }
      });
    };

    /**
     * getModel - returns a cloned copy of this instance's model
     */
    this.getModel = function () {
      this.updateModel();
      return $.extend({}, MODEL);
    };

  }

  $.fn.modelbind = function () {
    var instance = $(this).data("instance");

    if (typeof instance === "undefined") {
      instance = new ModelBind(this, arguments[0]);
      var newContext = instance.init();
      $(newContext).data("instance", instance);
    } else {
      // Call any of the "public" functions. If you add a public function
      // in the widget, it should be added here to expose it to the user
      if (typeof arguments[0] === "string") {
        if (arguments[0] === "updateModel") {
          instance.updateModel();
        } else if (arguments[0] === "updateForm") {
          instance.updateForm();
        } else if (arguments[0] === "getModel") {          
          return instance.getModel();
        } else if (arguments[0] === "setModel") {
          instance.setModel(arguments[1]);
        }
      }
    }
  }
})(jQuery);
