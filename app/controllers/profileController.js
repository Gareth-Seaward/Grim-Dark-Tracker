'use strict';
app.controller('profileController', ['$scope', '$rootScope', '$location', 'profileService', function ($scope, $rootScope, $location, profileService) {
    profileService.getProfile();

    $rootScope.$on("profileUpdate", function () {
        $scope.$apply(function () {
            $scope.profile = profileService.userProfile();
        });
    });

    $scope.updateProfile = function () {
        profileService.updateProfile($scope.profile);
    };
}]);