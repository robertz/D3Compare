(function() {
  'use strict';
  angular
    .module('app', [
      'ui.router',
      'ngDialog'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/compare');
      $stateProvider
        .state('compare', {
          url: '/compare',
          templateUrl: 'views/compare.html',
          controller: 'CompareController',
          controllerAs: 'compare'
        });
    });
})();
