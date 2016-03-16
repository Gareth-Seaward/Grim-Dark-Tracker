'use strict';
app.controller('loginController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.loginData = {
        email: "",
        password: ""
    };

    var loginErrorDefault = {
        title: "You are not logged in",
        detail: ""
    };

    $scope.loginError = loginErrorDefault;

    $scope.$on("authError", function () {
        //$scope.$apply(function () {
        $scope.loginError = authService.authError;
        //});
    });

    $scope.login = function () {
        $scope.loginError = loginErrorDefault;
        // Form submission for logging in
        var loginPromise = authService.authWithPassword($scope.loginData);
        authService.handleAuthResponse(loginPromise, '/profile');
    };
}
]);