var app = angular.module('MyClassApp', ["ngSanitize"]);

app.controller('MainCtrl', function($scope) {
  $scope.showTeacherState = "showing";
  $scope.showStudentsState = "hidden";
  // Initialise teacher info
  $scope.teacher = {
    firstname: "Corey",
    surname: "Doctorow",
    tel: "01234567890"
  };

  //Initialise interests
  $scope.interests = ['Drumming', 'Cycling', 'Electronics'];

  //Initialise Pets
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


  //Add new interest data to array
  $scope.addInterest = function(){
    //Push the data to the array
    $scope.interests.push($scope.newInterest)
    //Clear out the input fields
    $scope.newInterest ="";
  };


  //Remove interest from array
  $scope.removeInterest = function(interest){
    //Find the index of the chosen item
    var removedInterest = $scope.interests.indexOf(interest);
    //Ammend the array, begin at the index of the chosen item and remove 1 element.
    $scope.interests.splice(removedInterest, 1);
  };

  //Add new pet data to array
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

  //Remove selected pet from array
  $scope.removePet = function(pet){
    //Find the index of the chosen item
    var removedPet = $scope.pets.indexOf(pet);
    //Ammend the array, begin at the index of the chosen item and remove 1 element.
    $scope.pets.splice(removedPet, 1);
  };

    //Toggle the display of teacher edit form
  $scope.toggleEdit = function(){
    if($scope.showEdit == ""){
      $scope.showEdit = "showing";
    } else {
      $scope.showEdit = "";
    }
  };

  // Handle submission of teacher edit form
  $scope.editTeacher = function(){
   $scope.teacher.firstname = $scope.newFirstname;
   $scope.teacher.surname  = $scope.newSurname;
   $scope.teacher.tel  = $scope.newTelNo;

   //Clear out the fields
   $scope.newTelNo = "";
   $scope.newFirstname = "";
   $scope.newSurname = "";
 }
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
              var results = Papa.parse(contents, {header: false, skipEmptyLines: true});
              var newTableContent = "";
              results.data.forEach(function(row) {
                newTableContent = newTableContent+"<tr>";
                row.forEach(function(field){
                  newTableContent = newTableContent+"<td>"+field+"</td>";
                });
                newTableContent = newTableContent+"</tr>";
              });
              scope.fileReader = newTableContent;
              scope.$apply();
          };

          r.readAsText(files[0]);
        }
      });
    }
  };
});
