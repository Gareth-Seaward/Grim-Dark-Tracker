'use strict';
app.controller('indexController', ['$scope', '$rootScope', '$location', 'authService', 'profileService', function ($scope, $rootScope, $location, authService, profileService) {

    $scope.authentication = authService.authentication;
    $scope.profile = profileService.userProfile();

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/home');
    }

    $rootScope.$on("profileUpdate", function () {
        $scope.$apply(function () {
            $scope.profile = profileService.userProfile();
        });
    });


}]);