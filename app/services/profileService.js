"use strict";
app.factory("profileService", ["$rootScope", "localStorageService", "firebaseService", "$location", "$q", function ($rootScope, localStorageService, firebaseService, $location, $q) {
    var rootRef = firebaseService.rootRef;

    var profileServiceFactory = {};


    var userProfile = {
        name: "",
        currentFaction: ""
    }

    var getUserProfile = function () {
        return userProfile;
    }

    var fetchProfile = function () {
        // Check the current user
        var user = rootRef.getAuth();
        var userRef;

        if (!user) {
            $location.path("/signup");
            return;
        }

        userRef = rootRef.child("users").child(user.uid);
        userRef.once("value", function (snap) {
            var user = snap.val();
            if (!user) {
                return;
            }

            // set the fields
            userProfile.name = user.name;
            userProfile.currentFaction = user.currentFaction;

            $rootScope.$broadcast("profileUpdate");
        }, function (err) {
            console.log(err);
            // code to handle read error
        });
    }

    var updateProfile = function (profile) {
        var user = rootRef.getAuth();
        var userRef;

        if (!user) {
            $location.path("/signup");
            return;
        }

        userRef = rootRef.child("users").child(user.uid);
        userRef.set(profile, function onComplete() {

            // show the message if write is successful
            //showAlert({
            //    title: 'Successfully saved!',
            //    detail: 'You are still logged in',
            //    className: 'alert-success'
            //});
        });
    }

    profileServiceFactory.getProfile = fetchProfile;

    profileServiceFactory.userProfile = getUserProfile;
        profileServiceFactory.updateProfile = updateProfile;
    return profileServiceFactory;
}
]);