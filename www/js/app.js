// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var inventoryApp = angular.module('myInventory', ['ionic']);
// create a factory to create new stoareg areas, save and load all storage areas

inventoryApp.factory('inventoryAppFactory',function(){
  return {
    // load all storage areas
    load : function () {
      var storageArea = window.localStorage['storageArea_key'];
      console.log(storageArea);
      // check if storageArea exists
      if (storageArea !== 'undefined'){
        return angular.fromJson(storageArea)
      }
        return [];
    },
    // save all storage areas
    newStorage: function(storageTitle){
      return {
        title : storageTitle,
        items : []
      }
    },
    // save storage areas using localStorage with the storageArea_key as the key
    save: function(storage){
      window.localStorage['storageArea_key'] = angular.toJson(storage);
    }
  }
});
// controller
inventoryApp.controller('myInventoryCtrl', function ($scope, $ionicModal, inventoryAppFactory) {
  //to show delete button beside each and every storage area
  $scope.data = {
    showDelete : false
  };

  // createStorage
  $scope.createStorage = function(storageInput){
    var newStorage_var = inventoryAppFactory.newStorage(storageInput);
    $scope.storages.push(newStorage_var);
    inventoryAppFactory.save($scope.storages);
  };

  $scope.storages = inventoryAppFactory.load();

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
