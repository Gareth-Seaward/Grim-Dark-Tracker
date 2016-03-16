'use strict';
app.controller('signupController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {
    $scope.signUpData = {
        email: "",
        password: ""
    };

    var signUpErrorDefault = {
        title: "",
        detail: ""
    };

    $scope.signUpError = signUpErrorDefault;

    $scope.$on("authError", function () {
        $scope.signUpError = authService.authError;
    });

    $scope.signUp = function () {
        $scope.signUpError = signUpErrorDefault;
        var signUpPromise = authService.createUserAndLogin($scope.signUpData);
        authService.handleAuthResponse(signUpPromise, '/profile');
    };
}
]);