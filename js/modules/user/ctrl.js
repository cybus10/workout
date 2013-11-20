controllers = window.controllers || {};
controllers.user = function ($stateProvider) {

    var resolve = {
        users: function resolveData($rootScope, model) {
            if (!$rootScope.users) {
                model.load(function () {
                    $rootScope.users = model.getUsers();
                });
            }
            return $rootScope.users;
        }
    };

    $stateProvider
        .state('user', {
            url: '/',
            templateUrl: 'js/modules/user/user.list.html',
            resolve: resolve,
            controller: function Users($scope, model) {
                $scope.setTitle("Home");
            }
        })
        .state('schedules', {
            url: 'user/:id/schedules',
            resolve: resolve,
            templateUrl: 'js/modules/user/schedule.list.html',
            controller: function Schedules($scope, $state, $stateParams, model) {
                $scope.user = model.getUser($stateParams.id);
                $scope.setTitle("Schedules");
            }
        })
        .state('weeks', {
            url: 'user/:id/schedule/:sid/weeks',
            resolve: resolve,
            templateUrl: 'js/modules/user/week.list.html',
            controller: function Weeks($scope, $state, $stateParams, model) {
                $scope.setTitle("Weeks");
                $scope.user = model.getUser($stateParams.id);
                $scope.schedule = model.find($scope.user.schedules, $stateParams.sid);
            }
        })
        .state('day', {
            url: 'user/:id/schedule/:sid/week/:wid/days',
            resolve: resolve,
            templateUrl: 'js/modules/user/day.list.html',
            controller: function Weeks($scope, $state, $stateParams, model) {
                $scope.setTitle("Day");
                $scope.user = model.getUser($stateParams.id);
                $scope.schedule = model.find($scope.user.schedules, $stateParams.sid);
                $scope.week = model.find($scope.schedule.weeks, $stateParams.wid);
                $scope.days = model.find($scope.week.days, $stateParams.did);
            }
        })
        .state('routine', {
            url: 'user/:id/schedule/:sid/week/:wid/day/:did/routines',
            resolve: resolve,
            templateUrl: 'js/modules/user/routine.list.html',
            controller: function Weeks($scope, $state, $stateParams, model) {
                $scope.setTitle("Routine");
                $scope.user = model.getUser($stateParams.id);
                $scope.schedule = model.find($scope.user.schedules, $stateParams.sid);
                $scope.week = model.find($scope.schedule.weeks, $stateParams.wid);
                $scope.day = model.find($scope.week.days, $stateParams.did);
            }
        });
};