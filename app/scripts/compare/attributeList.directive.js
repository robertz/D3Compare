(function() {
  'use strict';

  angular
    .module('app')
    .directive('attributeList', AttributeList);

  AttributeList.$inject = [];

  function AttributeList() {
    return {
      restrict: 'E',
      scope: {
        obj: '='
      },
      templateUrl: 'views/attributeList.html',
      link: function(scope, elem, attrs) {
      }
    };
  }
})();
