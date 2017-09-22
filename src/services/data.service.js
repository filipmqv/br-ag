'use strict';
import angular from 'angular';

class DataGetter {
  constructor($http) {
    this.$http = $http;
  }

  getData(list, lang) {
    return this.$http.get(`data/data-${list}-${lang}.json`);
  }
}

DataGetter.$inject = ['$http'];

export default angular.module('services.data-getter', [])
  .service('dataGetter', DataGetter)
  .name;