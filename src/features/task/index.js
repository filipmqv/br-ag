import './task.css';
import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './task.routes';
import TaskController from './task.controller';

export default angular.module('app.task', [uirouter])
  .config(routing)
  .controller('TaskController', TaskController)
  .name;