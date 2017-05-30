angular.module('myContacts.contacts', ['ngRoute', 'firebase'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'contactsCtrl'
  })
}])

//contacts controller
.controller('contactsCtrl', ['$scope','$firebaseArray', function($scope, $firebaseArray){
  
  var config = {
    apiKey: "Removed",
    authDomain: "Removed",
    databaseURL: "Removed",
    projectId: "Removed",
    storageBucket: "Removed",
    messagingSenderId: "Removed"
  };
  
  //  Get contacts
  var myContactsApp = firebase.initializeApp(config);
  var database = myContactsApp.database().ref();
  $scope.contacts = $firebaseArray(database);

  //  Show add form
  $scope.showAddForm = function(){
    $scope.addFormShow = true;
  }
  
   //Edit form show
  $scope.showEditForm = function(contact){
    console.log('editing')
    $scope.editFormShow = true
    
    
    //show contacts for edit
    
    $scope.name = contact.name;
    $scope.email = contact.email;
    $scope.company = contact.company;
    $scope.work_phone = contact.phones[0].work
    $scope.mobile_phone = contact.phones[0].mobile;
    $scope.home_phone = contact.phones[0].home;
    $scope.street_address = contact.address[0].street_address;
    $scope.city = contact.address[0].city;
    $scope.state = contact.address[0].state;
    $scope.zipcode = contact.address[0].zipcode;
  }
  
  $scope.hide = function() {
    $scope.addFormShow = false;
    $scope.contactShow = false;
  }
  
  //Sbumit contacts
  $scope.addFormSubmit = function(){
    
    //Assign values
    if($scope.name){ var name = $scope.name } else { var name = null; }
    if($scope.email){ var email = $scope.email; } else { var email = null; }
    if($scope.company){ var company = $scope.company; } else { var company = null; }
    if($scope.mobile_phone){ var mobile_phone = $scope.mobile_phone; } else { var mobile_phone = null; }
    if($scope.home_phone){ var home_phone = $scope.home_phone; } else { var home_phone = null; }
    if($scope.work_phone){ var work_phone = $scope.work_phone; } else { var work_phone = null; }
    if($scope.street_address){ var street_address = $scope.street_address; } else { var street_address = null; }
    if($scope.city){ var city = $scope.city; } else { var city = null; }
    if($scope.state){ var state = $scope.state; } else { var state = null; }
    if($scope.zipcode){ var zipcode = $scope.zipcode; } else { var zipcode = null; }
    //Object build
  
  $scope.contacts.$add({
    name: name,
    email: email,
    company: company,
    phones:[
      {
        mobile: mobile_phone,
        home: home_phone,
        work: work_phone
      }
    ],
    address: [
      {
        street_address: street_address,
        city: city,
        state: state,
        zipcode: zipcode
      }
    ]
  }).then(function(ref){

    
    //clear form
      clearFields($scope);

      //hide form
      $scope.addFormShow = false;

      //send message

      $scope.msg = 'Contact added'
    })
  }
  
  //Submit Edit contact
  $scope.editFormSubmit = function(){
    console.log('yeah is working')
    var record = $scope.contacts.$getRecord('-KlM5FH6SjMGiOVuSUJT')
    console.log(record)
    record.name = $scope.name;
    record.email = $scope.email;
    record.company = $scope.company;
    record.phones[0].work = $scope.work_phone;
    record.phones[0].home = $scope.home_home;
    record.phones[0].mobile = $scope.mobile_phone;
    record.address[0].street_address = $scope.street_address;
    record.address[0].city = $scope.city;
    record.address[0].state = $scope.state;
    record.address[0].zipcode = $scope.zipcode;
    
    $scope.contacts.$save(record).then(function(){
      console.log('saving cotact')
      clearFields();
      
      //hide form
      
      $scope.editFormShow = false;
      
      $scope.msg = "contact updated"
    })
  }
  
  $scope.showContact = function(contact){
    console.log('showing contacts')
    $scope.name = contact.name;
    $scope.email = contact.email;
    $scope.company = contact.company;
    $scope.work_phone = contact.phones[0].work
    $scope.mobile_phone = contact.phones[0].mobile;
    $scope.home_phone = contact.phones[0].home;
    $scope.street_address = contact.address[0].street_address;
    $scope.city = contact.address[0].city;
    $scope.state = contact.address[0].state;
    $scope.zipcode = contact.address[0].zipcode;
    $scope.contactShow = true;
  }
  
  function clearFields($scope){
    console.log('Clearing All Fields...');

    $scope.name = '';
    $scope.email = '';
    $scope.company = '';
    $scope.mobile_phone = '';
    $scope.home_phone = '';
    $scope.work_phone = '';
    $scope.street_address = '';
    $scope.city = '';
    $scope.state = '';
    $scope.zipcode = '';
  }
  
  $scope.removeContact = function(contact){
    console.log('removing contact')
    $scope.contacts.$remove(contact)
    $scope.msg = "contact removed"
  }
 
}])

