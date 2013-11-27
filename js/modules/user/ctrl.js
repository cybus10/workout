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
        .state('workoutDays', {
            url: 'user/:id/workoutDays',
            resolve: resolve,
            templateUrl: 'js/modules/user/workoutDays.list.html',
            controller: function workoutDays($scope, $state, $stateParams, model) {
                $scope.workoutDays = model.getWorkoutDays();
                $scope.setTitle("WorkoutDays");
            }
        })
        .state('schedules', {
            url: 'user/:id/schedules',
            resolve: resolve,
            templateUrl: 'js/modules/user/schedule.list.html',
            controller: function Schedules($scope, $state, $stateParams, model) {
                $scope.schedules = model.getSchedules();
                $scope.setTitle("Schedules");
            }
        })
        .state('weeks', {
            url: 'user/:id/schedule/:sid/weeks',
            resolve: resolve,
            templateUrl: 'js/modules/user/week.list.html',
            controller: function Weeks($scope, $state, $stateParams, model) {
                $scope.setTitle("Weeks");
                $scope.weeks = model.getWeeks($stateParams.id);
            }
        })
        .state('day', {
            url: 'user/:id/schedule/:sid/week/:wid/days',
            resolve: resolve,
            templateUrl: 'js/modules/user/day.list.html',
            controller: function Days($scope, $state, $stateParams, model) {
                $scope.setTitle("Day");
                $scope.days = model.getDays($stateParams.id);
            }
        })
        .state('routine', {
            url: 'user/:id/schedule/:sid/week/:wid/day/:did/routines',
            resolve: resolve,
            templateUrl: 'js/modules/user/routine.list.html',
            controller: function Routines($scope, $state, $stateParams, model) {
                $scope.setTitle("Routine");
                $scope.routines = model.getRoutines($stateParams.id);
                         }
        });
};