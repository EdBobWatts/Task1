var myApp = angular.module('MyClass',[]);

myApp.controller('MainController', ['$scope', function($scope) {
  $scope.showEdit = "";
  $scope.teacherFirstname = 'Ed';
  $scope.teacherSurname = 'Watts';
  $scope.teacherTelNo = "01234567890";
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

  $scope.toggleEdit = function(){
    if($scope.showEdit == ""){
      $scope.showEdit = "showing";
    } else {
      $scope.showEdit = "";
    }
  };

  //Create a function to remove interests and assign it to a scope variable
  //Accept the selected interest as a parameter
  $scope.removeInterest = function(interest){
    //Find the index of the chosen item
    var removedInterest = $scope.interests.indexOf(interest);
    //Ammend the array, begin at the index of the chosen item and remove 1 element.
    $scope.interests.splice(removedInterest, 1);
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
  $scope.removePet = function(pet){
    //Find the index of the chosen item
    var removedPet = $scope.pets.indexOf(pet);
    //Ammend the array, begin at the index of the chosen item and remove 1 element.
    $scope.pets.splice(removedPet, 1);
  };

  //Create a function to add data to array
  $scope.addInterest = function(){
    //Push the data to the array
    $scope.interests.push($scope.newInterest)
    //Clear out the input fields
    $scope.newInterest ="";
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


  $scope.editTeacher = function(){

    $scope.teacherFirstname = $scope.newFirstname;
    $scope.teacherSurname  = $scope.newSurname;
    $scope.teacherTelNo  = $scope.newTelNo;

    //Clear out the fields
    $scope.newTelNo = "";
    $scope.newFirstname = "";
    $scope.newSurname = "";
  }
}]);
