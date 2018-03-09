myApp.config(['$routeProvider',function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl  : "views/index-view.html",
        controller   : "mainController",
        controllerAs : "matchCtrl"
    })
    .when("/loadAll", {
        templateUrl  : "views/loadallmatches-view.html",
        controller   : "controllerToLoadAllMatches",
        controllerAs : "matchCtrl"
    })
    .when("/singleMatch/:date/:team1code/:team2code", {
        templateUrl  : "views/singlematch-view.html",
        controller   : "singleMatchController",
        controllerAs : "matchCtrl"
    })
    .when("/teamview/:teamName", {
        templateUrl  : "views/team-view.html",
        controller   : "teamDetailsController",
        controllerAs : "teamCtrl"
    })

    .when("/statsview/", {
        templateUrl  : "views/statistics-view.html",
        controller   : "teamDetailsController",
        controllerAs : "teamCtrl"
    })

    .otherwise({template : '<h1> 404 Page not found </h1>'});    
}]);
