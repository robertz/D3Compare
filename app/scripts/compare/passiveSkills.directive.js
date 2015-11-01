(function() {
  'use strict';

  angular
    .module('app')
    .directive('passiveSkills', PassiveSkills);

  PassiveSkills.$inject = [];

  function PassiveSkills() {
    return {
      restrict: 'E',
      scope: {
        obj: '='
      },
      templateUrl: 'views/passiveSkills.html',
      link: function(scope, elem, attrs) {}
    };
  }
})();
