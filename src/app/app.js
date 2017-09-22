import 'bootstrap/dist/css/bootstrap.css';

import angular from 'angular';
import routing from './app.config';
import task from '../features/task';
import lang from '../features/lang';
import 'angular-ui-tree';
import 'angular-translate';
import 'angular-translate-loader-static-files';

import '../style/app.css';

const MODULE_NAME = 'app';
const DEFAULT_LANG = 'en';

angular.module(MODULE_NAME, ['ui.router', 'ui.tree', 'pascalprecht.translate', task, lang])
  .config(routing)
  .config(['$translateProvider', function($translateProvider) {
    $translateProvider
      .useStaticFilesLoader({
        prefix: '/translations/',
        suffix: '.json'
      })
      .preferredLanguage(DEFAULT_LANG)
      .useSanitizeValueStrategy('escape');
  }])
  .run(['$rootScope', function($rootScope) {
    $rootScope.lang = DEFAULT_LANG;
  }])

export default MODULE_NAME;