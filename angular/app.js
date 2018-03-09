//creating module
var myApp = angular.module('PremierApp', ['ngRoute','angular.filter']); 
   
myApp.controller("mainController", ['$http', function($http){
    //creating a context 
    var main=this;
        
    this.latestMatches = [];
    this.temp = [];
    this.seasonName = '';
    this.matchWeekName = '';
    this.lastMatchWeek = 0;

    this.url15="https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json";
    //this.baseUrl16="https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json";
   
    this.loadLatestMatches = function() {   
        $http({
            method:'GET',
            url:main.url15
        }).then(function successCallback(response) {
            console.log(main.seasonName);  
            console.log(response.data.rounds);  

            main.seasonName = response.data.name;

            main.lastMatchWeek = response.data.rounds.length - 1;
            main.matchWeekName = response.data.rounds[main.lastMatchWeek].name;

            main.latestMatches = response.data.rounds[main.lastMatchWeek].matches;
            
        }, function errorCallback(response) {
            alert("some error occurred. Check the console.");
            console.log(response);
        });
    }//End function
}]); // end controller



myApp.controller("controllerToLoadAllMatches", ['$http', function($http){
    //creating a context 
    var main=this;
    var limitIndex =0;    
    this.allMatches = [];
    this.allMatchesName = [];
    this.temp = [];
    this.seasonName = '';
    this.teams = [
        '',
        "Arsenal",
	"Aston Villa",
        "Bournemouth",
        "Burnley",
        "Chelsea",
        "Crystal Palace",
        "Everton",
        "Huddersfield Town",
	"Hull City",
        "Leicester City",
        "Liverpool",
        "Manchester City",
        "Manchester United",
	"Middlesbrough",
        "Newcastle United",
	"Norwich City",
        "Southampton",
	"Sunderland",
        "Stoke City",
        "Swansea City",
        "Tottenham Hotspur",
        "Watford",
        "West Bromwich Albion",
        "West Ham United"
    ];

    this.urlToUsed = "https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json";

    this.changedValue = function(year){
    
      if(year === "EPL2016/17")
      {
        main.urlToUsed = "https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json";
        main.limitIndex=0;
        main.loadAlltMatches(main.limitIndex,true);      

      }
      else if(year === "EPL2015/16"){
        main.urlToUsed = "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json";
        main.limitIndex=0;
        main.loadAlltMatches(main.limitIndex,true);
      }
      else{
       main.urlToUsed = "https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json";     
      }
        

    }//End Function of ChangedValue

    this.loadAlltMatches = function(limitIndex,init) {   
        $http({
            method:'GET',
            url:main.urlToUsed
        }).then(function successCallback(response) {

            if(init === true) { // checking for init if it is true initialize the array to null and start adding items in it
              main.allMatches = [];
              main.seasonName = response.data.name;
              main.allMatchesName = response.data.rounds[limitIndex].name;


              main.temp = response.data.rounds[limitIndex].matches;
              $.each(main.temp, function(j, item) {
                main.allMatches.push(main.temp[j]);
              });
  

            }
            else{ //else add the next index matches to all matches
              main.seasonName = response.data.name;
              main.allMatchesName = response.data.rounds[limitIndex].name;


              main.temp = response.data.rounds[limitIndex].matches;
              $.each(main.temp, function(j, item) {
                main.allMatches.push(main.temp[j]);
              });

            }

        }, function errorCallback(response) {
            alert("some error occurred. Check the console.");
            console.log(response);
        });
        
    }//End function

	
    main.changedValue("EPL2016/17");
    $(function(){
/*
      $("#getAllMatches").on('click',function(){
        //$("#navbarDiv").hide(1000);
        //main.loadAlltMatches(limitIndex);      
        //main.changedValue("EPL2016/17");
      }); 
*/
      $("#loadMore").on('click',function(){
	if(main.limitIndex <= 37){ // here we know the limit of our array of object of matches
          main.limitIndex +=1;
	
          console.log(main.limitIndex); 
          main.loadAlltMatches(main.limitIndex,false); //will take two params first one the limit index and second will tell whether the array of matches should be initialized or not

	}
	else{
	
	} 

      }); 

	
    });//end JQuery Function
  	

}]); // end controller


myApp.controller('singleMatchController',['$http','$routeParams','$q',function($http,$routeParams,$q) {

    //create a context
    var main = this;

    //taking routeParams



    this.baseUrl15 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
    this.baseUrl16 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';

    this.loadSingleMatch = function(){ // 

      main.matchDataOf2015 = $http.get(main.baseUrl15);
      main.matchDataOf2016 = $http.get(main.baseUrl16);  

      $q.all([main.matchDataOf2015 , main.matchDataOf2016]).then(function successCallback(response){ //  promise function for loading both season data
        main.rounds2015=response[0].data.rounds;
        main.rounds2016=response[1].data.rounds;

        this.matchDetails = function(){
         main.rounds = main.rounds2015.concat(main.rounds2016);
         main.date = $routeParams.date;
         main.year = (main.date).substr(0,4);
         main.team1code = $routeParams.team1code;
         main.team2code = $routeParams.team2code;


            if(main.year == 2015){

              $.each(main.rounds2015, function(i, item) {
                main.temp = main.rounds2015[i].matches;
                $.each(main.temp, function(j, item) {
                  
                  if(main.date == main.temp[j].date && main.team1code == main.temp[j].team1.code && main.team2code == main.temp[j].team2.code){
                    console.log("Match Details Found");
                    main.team1Name = main.temp[j].team1.name;
                    main.team2Name = main.temp[j].team2.name;
                    main.team1score = main.temp[j].score1;
                    main.team2score = main.temp[j].score2;
                  }
                  //main.allMatches.push(main.temp[j]);
                });
              });

            
            }
            else if(main.year == 2016){

              $.each(main.rounds, function(i, item) {
                main.temp = main.rounds[i].matches;
                $.each(main.temp, function(j, item) {

                  if(main.date == main.temp[j].date && main.team1code == main.temp[j].team1.code && main.team2code == main.temp[j].team2.code){
                    console.log("Match Details Found");
  
                    main.team1Name = main.temp[j].team1.name;
                    main.team2Name = main.temp[j].team2.name;
                    main.team1score = main.temp[j].score1;
                    main.team2score = main.temp[j].score2;
                  }
                  //main.allMatches.push(main.temp[j]);
                });
              });

            }
            else{ // will search in 2016 database

              $.each(main.rounds2016, function(i, item) {
                main.temp = main.rounds2015[i].matches;
                $.each(main.temp, function(j, item) {
                  
                  if(main.date == main.temp[j].date && main.team1code == main.temp[j].team1.code && main.team2code == main.temp[j].team2.code){
                    console.log("Match Details Found");

                    main.team1Name = main.temp[j].team1.name;
                    main.team2Name = main.temp[j].team2.name;
                    main.team1score = main.temp[j].score1;
                    main.team2score = main.temp[j].score2;
                  }
                  //main.allMatches.push(main.temp[j]);
                });
              });
            }


        };// end of matchDetails function

        this.matchDetails();
      },
    
      function errorCallback(response) {
        alert("Error occurred");
    });//end 0f $q service

  };//end of loadSingleMatch.

  this.loadSingleMatch();

}]); // end controller





myApp.controller('teamDetailsController',['$http','$routeParams','$q',function($http,$routeParams,$q) {

    //create a context
    var main = this;

    //taking routeParams
    this.team = {
       teamCode: ' ',
       teamName: ' ',
       count: {
          wonMatches15: 0,
          lostMatches15: 0,
          drawnMatches15: 0,
          wonMatches16: 0,
          lostMatches16: 0,
          drawnMatches16: 0,
          goals15: 0,
          goals16: 0
       },
    };




    this.baseUrl15 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
    this.baseUrl16 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
  
    this.routeTeamName = $routeParams.teamName;
    
    this.loadTeamStats = function(){ // 

      main.matchDataOf2015 = $http.get(main.baseUrl15);
      main.matchDataOf2016 = $http.get(main.baseUrl16);  

      $q.all([main.matchDataOf2015 , main.matchDataOf2016]).then(function successCallback(response){ //  promise function for loading both season data
        main.rounds2015=response[0].data.rounds;
        main.rounds2016=response[1].data.rounds;

        this.matchStats = function(){
              
              $.each(main.rounds2015, function(i, item) { //EPL 2015-16
                main.temp = main.rounds2015[i].matches;
                $.each(main.temp, function(j, item) {
                  
                  if(main.routeTeamName == main.temp[j].team1.name ){
                    
                    main.team.teamCode = main.temp[j].team1.code;
                    
                    if(main.team.teamName === ' ')
                        main.team.teamName = main.temp[j].team1.name;

                      if(main.temp[j].score1 > main.temp[j].score2){
                        main.team.count.wonMatches15++;
                      }
                      else if(main.temp[j].score1 < main.temp[j].score2){
                              main.team.count.lostMatches15++;
                      }
                      else{
                              main.team.count.drawnMatches15++;
                      }

                        main.team.count.goals15 += main.temp[j].score1;// counting the goals scored in EPL15/16
                    }
                    else if(main.routeTeamName == main.temp[j].team2.name){
                      
                      main.team.teamCode = main.temp[j].team2.code;
                      
                      if(main.team.teamName === ' ')
                          main.team.teamName = main.temp[j].team2.name;

                        if(main.temp[j].score1 < main.temp[j].score2){
                          main.team.count.wonMatches15++;
                        }
                        else if(main.temp[j].score1 > main.temp[j].score2){
                                main.team.count.lostMatches15++;
                        }
                        else{
                                main.team.count.drawnMatches15++;
                        }

                          main.team.count.goals15 += main.temp[j].score2;// counting the goals scored in EPL15/16
                    }    
                });
              });


              $.each(main.rounds2016, function(i, item) { //EPL 2016-17
                main.temp = main.rounds2016[i].matches;
                $.each(main.temp, function(j, item) {
                  
                  if(main.routeTeamName == main.temp[j].team1.name ){
                    
                    main.team.teamCode = main.temp[j].team1.code;
                    
                    if(main.team.teamName === ' ')
                        main.team.teamName = main.temp[j].team1.name;

                      if(main.temp[j].score1 > main.temp[j].score2){
                        main.team.count.wonMatches16++;
                      }
                      else if(main.temp[j].score1 < main.temp[j].score2){
                              main.team.count.lostMatches16++;
                      }
                      else{
                              main.team.count.drawnMatches16++;
                      }

                        main.team.count.goals16 += main.temp[j].score1;// counting the goals scored in EPL15/16
                    }
                    else if(main.routeTeamName == main.temp[j].team2.name){
                      
                      main.team.teamCode = main.temp[j].team2.code;
                      
                      if(main.team.teamName === ' ')
                          main.team.teamName = main.temp[j].team2.name;

                        if(main.temp[j].score1 < main.temp[j].score2){
                          main.team.count.wonMatches16++;
                        }
                        else if(main.temp[j].score1 > main.temp[j].score2){
                                main.team.count.lostMatches16++;
                        }
                        else{
                                main.team.count.drawnMatches16++;
                        }

                          main.team.count.goals16 += main.temp[j].score2;// counting the goals scored in EPL15/16
                    }    
                });
              });



        };// end of matchStats function

        this.matchStats();
      },
    
      function errorCallback(response) {
        alert("Error occurred");
    });//end 0f $q service

  };//end of loadTeamStats.

  this.loadTeamStats();

}]); // end controller
