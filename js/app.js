angular.module('app', ['ngResource', 'ui.router', 'workout'])
    .config(function ($stateProvider, $routeProvider, $urlRouterProvider) {
        $urlRouterProvider
            .when('', '/');

        angular.forEach(controllers, function (fn) {
            fn($stateProvider);
        });
    })
    .run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });