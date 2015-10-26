(function() {
  'use strict';
  angular
    .module('app')
    .controller('CompareController', CompareController);

  CompareController.$inject = ['$rootScope', '$scope', 'BattleNetService'];

  function CompareController($rootScope, $scope, BattleNetService) {
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

    vm.leftActive = false;
    vm.rightActive = false;

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
          vm.leftCharacterData = data;
        });
    }

    function getRightHero() {
      BattleNetService
        .getHero(vm.rightAccountInput, vm.rightSelect.id)
        .then(function(data) {
          vm.rightActive = true;
          vm.rightCharacterData = data;
        });
    }
  }
})();
