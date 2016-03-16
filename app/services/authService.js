"use strict";
app.factory("authService", ["$rootScope", "localStorageService", "firebaseService", "$location", "$q", function ($rootScope,localStorageService, firebaseService, $location, $q) {
    var rootRef = firebaseService.rootRef;

    var authServiceFactory = {};

    var authentication = {
        isAuth: false,
        authData: {}
    };

    var authError = {
        title: "You are not logged in",
        detail: ""
    }

    var clearError = function() {
        authError.title = "";
        authError.detail = "";
    }

    // call back for auth data state changes
    var authDataCallback = function (authData) {
        if (authData) {
            authentication.isAuth = true;
            authentication.authData = authData;
        } else {
            authentication.isAuth = false;
            authentication.authData = {};
        }

    }

    //Handle onAuth callback
    rootRef.onAuth(authDataCallback);

    // Handle third party login providers
    // returns a promise
    var thirdPartyLogin = function (provider) {
        var deferred = $q.defer();

        rootRef.authWithOAuthPopup(provider, function (err, user) {
            if (err) {
                deferred.reject(err);
            }

            if (user) {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    };

    // Handle Email/Password login
    // returns a promise
    var authWithPassword = function (userObj) {
        clearError();
        var deferred = $q.defer();
        console.log(userObj);
        rootRef.authWithPassword(userObj, function (err, user) {
            if (err) {
                deferred.reject(err);
            }

            if (user) {
                deferred.resolve(user);
            }

        });

        return deferred.promise;
    }

    // create a user but not login
    // returns a promsie
    var createUser = function (userObj) {
        var deferred = $q.defer();
        rootRef.createUser(userObj, function (err) {

            if (!err) {
                deferred.resolve();
            } else {
                deferred.reject(err);
            }

        });

        return deferred.promise;
    }

    // Create a user and then login in
    // returns a promise
    var createUserAndLogin = function (userObj) {
        return createUser(userObj)
            .then(function () {
                return authWithPassword(userObj);
            });
    }

    // route to the specified route if sucessful
    // if there is an error, show the alert
    var handleAuthResponse = function (promise, route) {
        $q.when(promise)
            .then(function (authData) {

                // route
                $location.path(route);

            }, function (err) {
                console.log(err);
                // pop up error
                authError.title = err.code;
                authError.detail = err.message;
            $rootScope.$broadcast("authError");
        });
    }

    var logOut = function() {
        rootRef.unauth();
    }

    //Expose private functions
    authServiceFactory.thirdPartyLogin = thirdPartyLogin;
    authServiceFactory.authWithPassword = authWithPassword;
    authServiceFactory.createUserAndLogin = createUserAndLogin;
    authServiceFactory.logOut = logOut;
    authServiceFactory.handleAuthResponse = handleAuthResponse;

    authServiceFactory.authentication = authentication;
    authServiceFactory.authError = authError;
    return authServiceFactory;
}])