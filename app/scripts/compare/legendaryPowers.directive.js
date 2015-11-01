(function() {
  'use strict';

  angular
    .module('app')
    .directive('legendaryPowers', LegendaryPowers);

  LegendaryPowers.$inject = [];

  function LegendaryPowers() {
    return {
      restrict: 'E',
      scope: {
        obj: '='
      },
      templateUrl: 'views/legendaryPowers.html',
      link: function(scope, elem, attrs) {
      }
    };
  }
})();
