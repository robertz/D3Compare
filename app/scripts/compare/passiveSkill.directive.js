(function() {
  'use strict';

  angular
    .module('app')
    .directive('passiveSkill', PassiveSkill);

  PassiveSkill.$inject = [];

  function PassiveSkill() {
    return {
      restrict: 'E',
      scope: {
        obj: '='
      },
      templateUrl: 'views/passiveSkills.html',
      link: function(scope, elem, attrs) {

      }
    };
  }
})();
