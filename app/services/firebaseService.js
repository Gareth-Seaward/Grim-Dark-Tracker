"use strict"
app.factory("firebaseService", ["ngAuthSettings", function(ngAuthSettings) {
    var rootRef = new Firebase(ngAuthSettings.apiServiceBaseUri);

    var firebaseServiceFactory = {};

    firebaseServiceFactory.rootRef = rootRef;
    return firebaseServiceFactory;
}]);