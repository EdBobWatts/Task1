var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.view = 'Student';
  $scope.showTeacherState = "showing";
  $scope.showStudentsState = "hidden";
  $scope.interests = ['Drumming', 'Cycling', 'Electronics'];
  $scope.pets = [{
      name: 'Miso',
      species: 'Dog',
      gender: 'Female',
      age: '6'
    },
    {
      name: 'Florence',
      species: 'Dog',
      gender: 'Female',
      age: '4'
    },
    {
      name: 'Herbie',
      species: 'Rabbit',
      gender: 'Male',
      age: '8'
  }];

  // Handle students link
  $scope.showStudents = function(){
    $scope.showTeacherState = "hidden";
    $scope.showStudentsState = "showing";
  };


  // Handle teacher link
  $scope.showTeacher = function(){
    $scope.showTeacherState = "showing";
    $scope.showStudentsState = "hidden";
  };


  //Create a function to add data to array
  $scope.addInterest = function(){
    //Push the data to the array
    $scope.interests.push($scope.newInterest)
    //Clear out the input fields
    $scope.newInterest ="";
  };

  //Create a function to remove interests and assign it to a scope variable
  //Accept the selected interest as a parameter
  $scope.removeInterest = function(interest){
    //Find the index of the chosen item
    var removedInterest = $scope.interests.indexOf(interest);
    //Ammend the array, begin at the index of the chosen item and remove 1 element.
    $scope.interests.splice(removedInterest, 1);
  };

  $scope.addPet = function(){
    //Push the data to the array
    $scope.pets.push({
      name: $scope.newPet.name,
      species: $scope.newPet.species,
      gender: $scope.newPet.gender,
      age: $scope.newPet.age
    })
    //Clear out the input fields
    $scope.newPet.name ="";
    $scope.newPet.species ="";
    $scope.newPet.gender ="";
    $scope.newPet.age ="";
  };

  $scope.removePet = function(pet){
    //Find the index of the chosen item
    var removedPet = $scope.pets.indexOf(pet);
    //Ammend the array, begin at the index of the chosen item and remove 1 element.
    $scope.pets.splice(removedPet, 1);
  };
});

app.directive('fileReader', function() {
  return {
    scope: {
      fileReader:"="
    },
    link: function(scope, element) {
      $(element).on('change', function(changeEvent) {
        var files = changeEvent.target.files;
        if (files.length) {
          var r = new FileReader();
          r.onload = function(e) {
              var contents = e.target.result;
              scope.$apply(function () {
                scope.fileReader = contents;
              });
          };

          r.readAsText(files[0]);
        }
      });
    }
  };
});
