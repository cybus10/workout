function Body($scope, model, $state) {
    $scope.version = "1.0";

    $scope.setTitle = function (title) {
        $scope.title = title;
    };

    $scope.setTitle("");

    $scope.transitionTo = function (route, params) {
        $state.transitionTo(route, params);
    };
}