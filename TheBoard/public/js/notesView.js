//notesView.js
(function (angular) {
    var theModule = angular.module("notesView", ["ui.bootstrap"]);

    theModule.controller("notesViewController", ["$scope", "$window", "$http", function ($scope, $windows, $http) {
            $scope.notes = [];
            $scope.newNote = createBlankNote();

            //Get the category name
            var urlParts = $windows.location.pathname.split("/");
            var categoryName = urlParts[urlParts.length - 1];

            var notesUrl = "/api/notes/" + categoryName;

            $http.get(notesUrl).
                then(function (result) {
                    //success   
                $scope.notes = result.data;
                }, function (err) {
                    //Error   
                    //TODO
                alert(err);
            });

            $scope.save = function () {
                $http.post(notesUrl, $scope.newNote).
                then(function (result) {
                    //success   
                    $scope.notes.push(result.data);
                    $scope.newNote = createBlankNote();
                }, function (err) {
                    //Error   
                    //TODO
                    alert(err);
                });
            };

            function createBlankNote() {
                return {
                    note: "",
                    color: "yellow",
                    author: ""
                }
            };
            
            

    }]);


})(window.angular);