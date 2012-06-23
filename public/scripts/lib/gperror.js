// define error
define('gperror',function () {
  return {
    dataError : function (jqXHR, textStatus) {
      msg = jqXHR || 'There was an error.';
      console.log(msg);
    }
  };
});