(function() {
  'use strict';
  angular
    .module('app')
    .factory('BattleNetService', BattleNetService);

  BattleNetService.$inject = ['$http'];

  function BattleNetService($http) {
    return {
      getAccount: getBNetAccount,
      getHero: getBNetHero
    };

    function getBNetAccount(account) {
      return $http.get('https://us.api.battle.net/d3/profile/' + account + '/?locale=en_US&apiKey=3q8vurf6jnh85bs54hn4q9skp3h4r2g2')
        .then(function(response) {
          return response.data;
        });
    }

    function getBNetHero(account, id) {
      return $http.get('https://us.api.battle.net/d3/profile/' + account + '/hero/' + id + '?locale=en_US&apiKey=3q8vurf6jnh85bs54hn4q9skp3h4r2g2')
        .then(function(response) {
          return response.data;
        });
    }
  }
})();
