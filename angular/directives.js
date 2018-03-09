
/* Directives sections */

myApp.directive("wonmatches", function() {
  return {
    restrict: "E",
    templateUrl: "tabs/wonmatches.html"
  }
});

myApp.directive("lostmatches", function() {
  return {
    restrict: "E",
    templateUrl: "tabs/lostmatches.html"
  }
});

myApp.directive("tiedmatches", function() {
  return {
    restrict: "E",
    templateUrl: "tabs/tiedmatches.html"
  }
});


myApp.directive("matchesTabs", function() {
  return {
    restrict: "E",

    templateUrl: "tabs/matches-tabs.html",
    controller: function() {
      this.tab = 1;

      this.isSet = function(checkTab) {
        return this.tab === checkTab;
      };

      this.setTab = function(activeTab) {
        this.tab = activeTab;
      };
    },
    controllerAs: "tab"
  };
});

/* End Directives section */