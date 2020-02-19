var app = angular.module('MyClassApp', ["ngSanitize","ngMessages"]);

app.controller('MainCtrl', function($scope) {
  $scope.views = {
    teacher: "hidden",
    students: "hidden",
    home: "showing"
  };

  $scope.showEdit = {
    teacher: "hidden",
    interests: "hidden",
    pets: "hidden"
  };

  // Initialise teacher info
  $scope.teacher = {
    firstname: "Corey",
    surname: "Doctorow",
    subject: "Computer Science",
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

  //VIEWS
  // Handle students view link
  $scope.showStudents = function(){
    $scope.views.teacher = "hidden";
    $scope.views.students = "showing";
    $scope.views.home = "hidden";
  };


  // Handle teacher view link
  $scope.showTeacher = function(){
    $scope.views.teacher = "showing";
    $scope.views.students = "hidden";
    $scope.views.home = "hidden";
  };

  // Handle home view link
  $scope.goHome = function(){
    $scope.views.teacher = "hidden";
    $scope.views.students = "hidden";
    $scope.views.home = "showing";
  };

  //INTERESTS
  //Add new interest data to array
  $scope.addInterest = function(){
    //Push the data to the array
    $scope.interests.push($scope.newInterest)
    //Clear out the input fields
    $scope.newInterest ="";
    $scope.showEdit.interests = "hidden";
  };


  //Remove interest from array
  $scope.removeInterest = function(interest){
    //Find the index of the chosen item
    var removedInterest = $scope.interests.indexOf(interest);
    //Ammend the array, begin at the index of the chosen item and remove 1 element.
    $scope.interests.splice(removedInterest, 1);
  };

  //PETS
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
    $scope.showEdit.pets ="hidden";
  };

  //Remove selected pet from array
  $scope.removePet = function(pet){
    //Find the index of the chosen item
    var removedPet = $scope.pets.indexOf(pet);
    //Ammend the array, begin at the index of the chosen item and remove 1 element.
    $scope.pets.splice(removedPet, 1);
  };

  //INFO EDIT FORMS
    //Toggle the display of teacher edit form
  $scope.toggleTEdit = function(){
    if($scope.showEdit.teacher == "hidden"){
      $scope.showEdit.teacher = "showing";

      //Hide other forms
      $scope.showEdit.interests = "hidden";
      $scope.showEdit.pets = "hidden";
    } else {
      $scope.showEdit.teacher = "hidden";
    }
  };

  //Toggle the display of interests edit form
  $scope.toggleIEdit = function(){
    if($scope.showEdit.interests == "hidden"){
      $scope.showEdit.interests = "showing";

      //Hide other forms
      $scope.showEdit.teacher = "hidden";
      $scope.showEdit.pets = "hidden";
    } else {
      $scope.showEdit.interests = "hidden";
    }
  };

  //Toggle the display of pets edit form
  $scope.togglePEdit = function(){
    if($scope.showEdit.pets == "hidden"){
      $scope.showEdit.pets = "showing";
      //Hide other forms
      $scope.showEdit.teacher = "hidden";
      $scope.showEdit.interests = "hidden";
    } else {
      $scope.showEdit.pets = "hidden";
    }
  };



  //TEACHER EDIT
  // Handle submission of teacher edit form
  $scope.editTeacher = function(){
   $scope.teacher.firstname = $scope.newFirstname;
   $scope.teacher.surname  = $scope.newSurname;
   $scope.teacher.tel  = $scope.newTelNo;
   $scope.teacher.subject = $scope.newSubject;

   //Clear out the fields
   $scope.newTelNo = "";
   $scope.newFirstname = "";
   $scope.newSurname = "";
   $scope.newSubject = "";
   $scope.showEdit.teacher = "hidden";
 }
});


//CSV IMPORT
app.directive('fileReader', function() {
  return {
    scope: {
      fileReader:"="
    },
    link: function(scope, element) {
      $(element).on('change', function(changeEvent) {
        //Get target file
        var files = changeEvent.target.files;
        //Check there is a file present
        if (files.length) {
          var r = new FileReader();
          r.onload = function(e) {
              //load contents from CSV
              var contents = e.target.result;
              //Parse CSV with Papaparse library - header set to false so that
              //Output is an array.
              var results = Papa.parse(contents, {header: false, skipEmptyLines: true});

              //Construct HTML table using 2D array.
              var newTableContent = "";
              results.data.forEach(function(row) {
                newTableContent = newTableContent+"<tr>";
                row.forEach(function(field){
                  newTableContent = newTableContent+"<td>"+field+"</td>";
                });
                newTableContent = newTableContent+"</tr>";
              });
              //bind HTML table to fileReader
              scope.fileReader = newTableContent;
              scope.$apply();
          };

          r.readAsText(files[0]);
        }
      });
    }
  };
});
