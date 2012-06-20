// define env
define(['backbone'], function (Backbone) {
  window.givepulse = window.givepulse || {};
  var ENVModel = Backbone.Model.extend({
  	opportunityCollection : {},
  	loginUser : {}
  });
  window.givepulse.env = new ENVModel(window.givepulse.options || {});
  window.givepulse.options = undefined;
  return window.givepulse.env;
});
