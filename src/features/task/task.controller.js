export default class TaskController {
  constructor($scope, $rootScope, dataGetter, treeAccept) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.dataGetter = dataGetter;
    this.treeAccept = treeAccept;

    this.$rootScope.$on('$translateChangeSuccess', (event, data) => {
      let newLang = data.language;
      $rootScope.lang = newLang;
      this.getData(newLang);
    });

    // options for left list - conditions to accept or reject dropping the node
    this.leftTreeOptions = {
      accept: (sourceNodeScope, destNodesScope, destIndex) => treeAccept.acceptNode(sourceNodeScope, destNodesScope, destIndex)
    };
    this.selected = null;
    this.data = {'left': [], 'right': []};
    this.getData($rootScope.lang);
  }

  getData(lang) {
    Object.keys(this.data).map(list => {
      this.dataGetter.getData(list, lang).then((response) => {
        this.data[list] = angular.fromJson(response.data);
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

TaskController.$inject = ['$scope', '$rootScope', 'dataGetter', 'treeAccept'];