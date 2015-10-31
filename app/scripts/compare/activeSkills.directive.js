(function() {
  'use strict';

  angular
    .module('app')
    .directive('activeSkills', ActiveSKills);

  ActiveSKills.$inject = ['DataStoreService'];

  function ActiveSKills(DataStoreService) {
    return {
      restrict: 'E',
      scope: {
        obj: '='
      },
      templateUrl: 'views/activeSkills.html',
      link: function(scope, elem, attrs) {
        scope.keys = DataStoreService.getActiveSkillSlots()
      }
    };
  }
})();
