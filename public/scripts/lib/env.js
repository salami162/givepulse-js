// define env
define(['backbone'], function (Backbone) {
  window.givepulse = window.givepulse || {};
  var Env = Backbone.Model.extend({});
  window.givepulse.env = new Env(window.givepulse.options || {});
  window.givepulse.options = undefined;
  return window.givepulse.env;
});
