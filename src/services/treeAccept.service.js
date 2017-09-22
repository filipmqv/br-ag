import angular from 'angular';

class TreeAccept {
  constructor() {
  }

  isOutOfDepth(sourceNodeScope, destNodesScope) {
    return destNodesScope.outOfDepth(sourceNodeScope);
  }

  // check destNode
  parentId(destNodesScope) {
    if (destNodesScope.$nodeScope && destNodesScope.$nodeScope.$modelValue)
      return destNodesScope.$nodeScope.$modelValue.id;
    return -1;
  }

  isParentIdSameAsSourceId(sourceId, destNodesScope) {
    return this.parentId(destNodesScope) === sourceId;
  }

  // check recursively higher levels of parents (apart from direct destNde)
  isNodeInAncestorsInner(sourceId, node) {
    if(node.$parentNodeScope) {
      if (sourceId === node.$parentNodeScope.$modelValue.id) {
        return true
      } else {
        return this.isNodeInAncestorsInner(sourceId, node.$parentNodeScope);
      }
    }
  }

  isNodeInAncestors(sourceId, destNodesScope) {
    return this.isParentIdSameAsSourceId(sourceId, destNodesScope) || this.isNodeInAncestorsInner(sourceId, destNodesScope);
  }

  acceptNode(sourceNodeScope, destNodesScope, destIndex) {
    let sourceId = sourceNodeScope.$modelValue.id;
    return !this.isOutOfDepth(sourceNodeScope, destNodesScope) &&
      !destNodesScope.isParent(sourceNodeScope) &&
      !this.isNodeInAncestors(sourceId, destNodesScope);
  }
}

export default angular.module('services.tree-accept', [])
  .service('treeAccept', TreeAccept)
  .name;