// define error
define('gperror',[], function () {
  console.log("gperror loaded");
  return {
    dataError : function (jqXHR, textStatus) {
      msg = jqXHR || 'There was an error.';
      console.log(msg);
    }
  };
});