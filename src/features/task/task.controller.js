'use strict';
export default class TaskController {
  constructor($http, $scope, $rootScope) {
    this.$http = $http;
    this.$scope = $scope;
    this.$rootScope = $rootScope;

    this.$rootScope.$on('$translateChangeSuccess', (event, data) => {
      let newLang = data.language;
      $rootScope.lang = newLang;
      this.getData(newLang);
    });

    this.leftTreeOptions = {
      accept: (sourceNodeScope, destNodesScope, destIndex) => {
        function isOutOfDepth(sourceNodeScope, destNodesScope) {
          return destNodesScope.outOfDepth(sourceNodeScope)
        }
        // check destNode
        function parentId(destNodesScope) {
          if (destNodesScope.$nodeScope && destNodesScope.$nodeScope.$modelValue)
             return destNodesScope.$nodeScope.$modelValue.id;
          return -1;
        }
        function isParentIdSameAsSourceId(sourceId, destNodesScope) {
          return parentId(destNodesScope) === sourceId;
        }
        // check recursively higher levels of parents (apart from direct destNde)
        function isNodeInAncestorsInner(sourceId, node) {
          if(node.$parentNodeScope) {
            if (sourceId === node.$parentNodeScope.$modelValue.id) {
              return true
            } else {
              return isNodeInAncestorsInner(sourceId, node.$parentNodeScope);
            }
          }
        }
        function isNodeInAncestors(sourceId, destNodesScope) {
          return isParentIdSameAsSourceId(sourceId, destNodesScope) || isNodeInAncestorsInner(sourceId, destNodesScope)
        }

        let sourceId = sourceNodeScope.$modelValue.id;
        return !isOutOfDepth(sourceNodeScope, destNodesScope) &&
          !destNodesScope.isParent(sourceNodeScope) &&
          !isNodeInAncestors(sourceId, destNodesScope);
      }
    };
    this.selected = null;
    this.data = {'left': [], 'right': []};
    this.getData($rootScope.lang);
  }

  getData(lang) {
    Object.keys(this.data).map(e => {
      this.$http.get(`data/data-${e}-${lang}.json`).then((response) => {
        this.data[e] = angular.fromJson(response.data);
      })
    });
  }

  editItem(node) {
    this.selected = node.$modelValue;
  }

  collapseAll() {
    this.$scope.$broadcast('angular-ui-tree:collapse-all');
  };

  expandAll() {
    this.$scope.$broadcast('angular-ui-tree:expand-all');
  };
}

TaskController.$inject = ['$http', '$scope', '$rootScope'];