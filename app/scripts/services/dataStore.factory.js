(function() {
  'use strict';

  angular
    .module('app')
    .factory('DataStoreService', DataStoreService);

  DataStoreService.$inject = [];

  function DataStoreService() {
    return {
      getClassLabels: getClassLabels,
      getEquipmentSlots: getEquipmentSlots
    };

    function getClassLabels() {
      return {
        'barbarian': 'Barbarian',
        'crusader': 'Crusader',
        'demon-hunter': 'Demon Hunter',
        'monk': 'Monk',
        'witch-doctor': 'Witch Doctor',
        'wizard': 'Wizard'
      };
    }

    function getEquipmentSlots() {
      return [
        {key: 'head', label: 'Head'},
        {key: 'neck', label: 'Neck'},
        {key: 'shoulders', label: 'Shoulders'},
        {key: 'torso', label: 'Torso'},
        {key: 'bracers', label: 'Bracers'},
        {key: 'mainHand', label: 'Main Hand'},
        {key: 'offHand', label: 'Off Hand'},
        {key: 'waist', label: 'Waist'},
        {key: 'legs', label: 'Legs'},
        {key: 'feet', label: 'Feet'},
        {key: 'leftFinger', label: 'Left Finger'},
        {key: 'rightFinger', label: 'Right Finger'}
      ];
    }

  }

})();
