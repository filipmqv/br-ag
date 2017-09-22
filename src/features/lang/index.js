import angular from 'angular';

import LanguageSwitchController from './lang.controller';

export default angular.module('app.lang', [])
  .controller('LanguageSwitchController', LanguageSwitchController)
  .name;