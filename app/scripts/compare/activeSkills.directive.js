(function() {
  'use strict';

  angular
    .module('app')
    .directive('activeSkills', ActiveSKills);

  ActiveSKills.$inject = [];

  function ActiveSKills() {
    return {
      restrict: 'E',
      scope: {
        obj: '='
      },
      templateUrl: 'views/activeSkills.html',
      link: function(scope, elem, attrs) {

      }
    };
  }
})();
