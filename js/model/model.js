angular.module('workout', []).factory('model', ['$resource', '$filter', function ($resource, $filter) {
    return (function () {
        var exports = {},
            users = [],
            routines = [],
            days = [],
            schedules = [],
            weeks = [],
            selections = {};

        function load(callback) {
            $resource('data/ndata.json').get({}, function (result) {
                users.length = 0;
                routines.length = 0;
                days.length = 0;
                schedules.length = 0;
                weeks.length = 0;
                angular.forEach(result.users, function (user) {
                    users.push(user);
                });
                angular.forEach(result.routines, function (routine) {
                    routines.push(routine);
                });
                angular.forEach(result.days, function (day) {
                    days.push(day);
                });
                angular.forEach(result.schedules, function (schedule) {
                    schedules.push(schedule);
                });
                angular.forEach(result.weeks, function (week) {
                    weeks.push(week);
                });
                callback && callback();

            });
        }

        function resetSelections() {
            selections.user = -1;
            selections.routine = -1;
            selections.day = -1;
            selections.schedule = -1;
            selections.week = -1;
        }

        function getUsers() {
            return users;
        }

        function getUser(id) {
            return find(users, id);
        }

        function getRoutines() {
            return routines;
        }

        function getRoutine(id) {
            return find(routines, id);
        }

        function getDays() {
            return days;
        }

        function getDay(id) {
            return find(days, id);
        }
        function getSchedules() {
            return schedules;
        }

        function getSchedule(id) {
            return find(schedules, id);
        }
        function getWeeks() {
            return weeks;
        }

        function getWeek(id) {
            return find(weeks, id);
        }
        function getWorkouts(userId) {
            return getUser(userId).workouts;
        }

        function getWorkout(userId, woid) {
            return find(getWorkouts(userId), woid);
        }

        function find(list, id) {
            return $filter('filter')(list, {id: id})[0];
        }

        exports.load = load;
        exports.getUsers = getUsers;
        exports.getUser = getUser;
        exports.getWeeks = getWeeks;
        exports.getWeek = getWeek;
        exports.getSchedules = getSchedules;
        exports.getSchedule = getSchedule;
        exports.getDays = getDays;
        exports.getDay = getDay;
        exports.getRoutines = getRoutines;
        exports.getRoutine = getRoutine;
        exports.getWorkouts = getWorkouts;
        exports.getWorkout = getWorkout;

        exports.find = find;

        resetSelections();

        return exports;
    }());
}])
;