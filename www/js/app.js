// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var inventoryApp = angular.module('myInventory', ['ionic']);
// create a factory to create new stoareg areas, save and load all storage areas

// controller
inventoryApp.controller('myInventoryCtrl', function ($scope, $ionicModal) {
  //to show delete button beside each and every storage area
$scope.data = {
  showDelete : false
};
  // load all storage areas if any and set it to storageAreas
  // note that storageAreas will be an array
  // modal function for Items
  $ionicModal.fromTemplateUrl('item-modal.html',{
    // give the modal access to the parent scope
    scope : $scope,
    animation : 'slide-in-up'
  }).then(function(modal){
    // set our $scope.itemModal to our input modal
    $scope.itemModal = modal;
  });
  // create a method to show our modal
  $scope.addItem = function(){
    $scope.itemModal.show();
  };
  // create a method to close modal
  $scope.closeItemModal = function(){
    $scope.itemModal.hide();
  };
  // cleanup the modal once we are done with it
  $scope.$on('$destroy', function(){
    $scope.itemModal.remove();
  });

  // Modal function for Storage
  $ionicModal.fromTemplateUrl('storage-modal.html',{
    // give the modal access to the parent scope
    scope : $scope,
    animation : 'slide-in-up'
  }).then(function(modal){
    // set our $scope.itemModal to our input modal
    $scope.storageModal = modal;
  });
  // create a method to show our modal
  $scope.addStorage = function(){
    $scope.storageModal.show();
  };
  // create a method to close modal
  $scope.closeStorageModal = function(){
    $scope.storageModal.hide();
  };
  // cleanup the modal once we are done with it
  $scope.$on('$destroy', function(){
    $scope.storageModal.remove();
  });
});
