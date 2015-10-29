/*jshint -W089 */

(function() {
  'use strict';
  angular
    .module('app')
    .controller('CompareController', CompareController);

  CompareController.$inject = ['$rootScope', '$scope', 'BattleNetService', 'DataStoreService'];

  function CompareController($rootScope, $scope, BattleNetService, DataStoreService) {
    var vm = this;

    vm.leftAccountInput = 'mordhel-1221';
    vm.rightAccountInput = 'cfjedimaster-1136';
    vm.lefSelect = '';
    vm.rightSelect = '';
    vm.leftAccount = {};
    vm.rightAccount = {};
    vm.leftCharacterData = {};
    vm.rightCharacterData = {};
    vm.getLeftAccount = getLeftAccount;
    vm.getRightAccount = getRightAccount;
    vm.getLeftHero = getLeftHero;
    vm.getRightHero = getRightHero;

    // Calculate diffs for stat values
    vm.stats = {
      leftChar: {},
      rightChar: {}
    };

    // Remap payload class variables
    vm.classLabel = DataStoreService.getClassLabels();

    vm.leftActive = false;
    vm.rightActive = false;

    // Show json debug block under character info?
    vm.debug = false;

    function getLeftAccount() {
      BattleNetService
        .getAccount(vm.leftAccountInput)
        .then(function(data) {
          vm.leftAccount = data;
        });
    }

    function getRightAccount() {
      BattleNetService
        .getAccount(vm.rightAccountInput)
        .then(function(data) {
          vm.rightAccount = data;
        });
    }

    function getLeftHero() {
      BattleNetService
        .getHero(vm.leftAccountInput, vm.leftSelect.id)
        .then(function(data) {
          vm.leftActive = true;
          vm.leftCharacterData = {}; // clear data
          vm.leftCharacterData = data;
          recalcStatDiffs();
        });
    }

    function getRightHero() {
      BattleNetService
        .getHero(vm.rightAccountInput, vm.rightSelect.id)
        .then(function(data) {
          vm.rightActive = true;
          vm.rightCharacterData = {}; // clear data
          vm.rightCharacterData = data;
          recalcStatDiffs();
        });
    }

    function recalcStatDiffs() {
      if (!(vm.leftActive && vm.rightActive)) {
        return;
      }
      for (var key in vm.leftCharacterData.stats) {
        vm.stats.leftChar[key] = vm.leftCharacterData.stats[key] - vm.rightCharacterData.stats[key];
        vm.stats.rightChar[key] = vm.rightCharacterData.stats[key] - vm.leftCharacterData.stats[key];
      }
    }
  }
})();
