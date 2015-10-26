(function() {
  'use strict';
  angular
    .module('app')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['ngDialog'];

  function ShellController(ngDialog) {
    var vm = this;
    var aboutResult = null;

    vm.showAbout = function(e) {
      e.stopPropagation();
      if (!_.isNull(aboutResult)) {
        aboutResult.close();
      } else {
        ngDialog.closeAll();
        aboutResult = ngDialog.open({
          template: 'views/about.html',
          overlay: false,
          className: 'about',
          scope: $('body > div').scope()
        });
        // $('body').addClass('about');
        aboutResult.closePromise.then(function() {
          aboutResult = null;
          // $('body').removeClass('about');
        });
      }
    };
  }
})();
