(function() {
  'use strict';

  angular
    .module('app')
    .directive('equipmentList', EquipmentList);

  EquipmentList.$inject = ['DataStoreService'];

  function EquipmentList(DataStoreService) {
    return {
      restrict: 'E',
      scope: {
        obj: '='
      },
      templateUrl: 'views/equipment.html',
      link: function(scope, elem, attrs) {
        // Call the datastore serviec and store it in the local scope
        scope.keys = DataStoreService.getEquipmentSlots();
      }
    };
  }
})();
