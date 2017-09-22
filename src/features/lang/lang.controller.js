export default class LanguageSwitchController {
  constructor($rootScope, $translate) {
    this.$rootScope = $rootScope;
    this.$translate = $translate;

    this.$rootScope.$on('$translateChangeSuccess', (event, data) => {
      $rootScope.lang = data.language;
    });
  }

  changeLanguage(langKey) {
    this.$translate.use(langKey);
  };
}

LanguageSwitchController.$inject = ['$rootScope', '$translate'];
