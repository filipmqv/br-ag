routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('task', {
      url: '/',
      template: require('./task.html'),
      controller: 'TaskController',
      controllerAs: 'task'
    });
}