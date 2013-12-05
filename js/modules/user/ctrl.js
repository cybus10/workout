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
        .state('workouts', {
            url: 'user/:id/workouts',
            resolve: resolve,
            templateUrl: 'js/modules/user/workouts.list.html',
            controller: function Workouts($scope, $state, $stateParams, model) {
                $scope.user = model.getUser($stateParams.id);
                $scope.workouts = model.getWorkouts($stateParams.id);
                $scope.setTitle("Workouts");
            }
        })
        .state('workout', {
            url: 'user/:id/workout/:woid',
            resolve: resolve,
            templateUrl: 'js/modules/user/workout.list.html',
            controller: function Workouts($scope, $state, $stateParams, model) {
                $scope.user = model.getUser($stateParams.id);
                $scope.workout = model.getWorkout($stateParams.id, $stateParams.woid);
                $scope.setTitle("Workout");
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