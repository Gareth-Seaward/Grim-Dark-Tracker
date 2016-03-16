var app = angular.module("angularGrimDarkTracker", ["ngRoute", "LocalStorageModule", "angular-loading-bar","firebase"]);

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/views/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "/app/views/signup.html"
    });

    $routeProvider.when("/profile", {
        controller: "profileController",
        templateUrl: "/app/views/profile.html"
    });

    //Default to the home partial page
    $routeProvider.otherwise({ redirectTo: "/home" });
});

var firebaseBaseUrl = "https://radiant-inferno-6264.firebaseio.com/whTracker";
app.constant("ngAuthSettings", {
    apiServiceBaseUri: firebaseBaseUrl + "/uauth"
})