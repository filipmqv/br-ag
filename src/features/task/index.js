import './task.css';
import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './task.routes';
import TaskController from './task.controller';
import dataGetter from '../../services/data.service';

export default angular.module('app.task', [uirouter, dataGetter])
  .config(routing)
  .controller('TaskController', TaskController)
  .name;