angular.module('workout', []).factory('model', ['$resource', '$filter', function ($resource, $filter) {
    return (function () {
        var exports = {},
            users = [],
            selections = {};

        function load(callback) {
            $resource('data/data.json').get({}, function (result) {
                users.length = 0;
                angular.forEach(result.users, function(user) {
                    users.push(user);
                });
                callback && callback(users);
            });
        }

        function resetSelections() {
            selections.user = -1;
            selections.schedule = -1;
            selections.week = -1;
            selections.day = -1;
            selections.routine = -1;
        }

        function getUsers() {
            return users;
        }

        function getUser(id) {
            return $filter('filter')(users, {id: id})[0];
        }

        function find(list, id) {
            return $filter('filter')(list, {id: id})[0];
        }

//        function getSelectedUser() {
//            return users[selections.user];
//        }
//
//        function setSelectedUser(user) {
//            var result = getSelectedUser();
//            selections.schedule = result ? result.schedules.indexOf(schedule) : -1;
//        }
//
//        function getSelectedSchedule() {
//            var result = getSelectedUser();
//            return result && result.schedules[selections.schedule] || undefined;
//        }
//
//        function setSelectedSchedule(schedule) {
//            var result = getSelectedUser();
//            selections.schedule = result ? result.schedules.indexOf(schedule) : -1;
//        }
//
//        function getSelectedWeek() {
//            var result = getSelectedSchedule();
//            return result && result[selections.week] || undefined;
//        }
//
//        function getSelectedDay() {
//            var result = getSelectedWeek();
//            return result && result[selections.day] || undefined;
//        }
//
//        function getSelectedRoutine() {
//            var result = getSelectedDay();
//            return result && result[selections.routine] || undefined;
//        }

        exports.load = load;
        exports.getUsers = getUsers;
        exports.getUser = getUser;
        exports.find = find;
//        exports.resetSelections = resetSelections;
//
//        exports.getSelectedUser = getSelectedUser;
//        exports.setSelectedUser = setSelectedUser;
//
//        exports.getSelectedSchedule = getSelectedSchedule;
//        exports.getSelectedWeek = getSelectedWeek;
//        exports.getSelectedDay = getSelectedDay;
//        exports.getSelectedRoutine = getSelectedRoutine;

        resetSelections();

        return exports;
    }());
}]);