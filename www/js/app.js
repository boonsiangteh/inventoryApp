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
      // console.log(storageArea);
      // check if storageArea exists
      if (storageArea){
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
      // console.log(window.localStorage['storageArea_key']);
    },
    // set last active storage for us to add items to the corect storage areas
    setLastActiveStorage: function(index) {
      window.localStorage['lastActiveStorage_key'] = index;
    },
    getLastActiveStorage: function () {
      return parseInt(window.localStorage['lastActiveStorage_key']) || 0;
    }
  }
});
// controller
inventoryApp.controller('myInventoryCtrl', function ($scope, $ionicModal, inventoryAppFactory) {
  //to show delete button beside each and every storage area
  $scope.data = {
    showDelete : false
  };
  // store all storage areas into storages array when we load
  $scope.storages = inventoryAppFactory.load();

  // createStorage function
  $scope.createStorage = function(storageInput){
    var newStorage_var = inventoryAppFactory.newStorage(storageInput);
    if (!storageInput) {
      alert("Nothing entered. Please enter a storage.");
      return ;
    }
    $scope.storages.push(newStorage_var);
    inventoryAppFactory.save($scope.storages);
    $scope.closeStorageModal();
    document.getElementById('storageForm').reset();
    // set the latest addition of storage area as the actove storage area
    $scope.selectStorage(newStorage_var, $scope.storages.length - 1);
  };
  // Remove storage when delete button is clicked
  $scope.removeStorage = function ($index){
    $scope.storages.splice($index, 1);
    inventoryAppFactory.save($scope.storages);
    $scope.activeStorage = $scope.storages[0];
  };

  // set the current active storage to the last active storage
  $scope.activeStorage = $scope.storages[inventoryAppFactory.getLastActiveStorage()];

  // selectStorage function acts to set the selected storage as the active storage and remember its index as well
  $scope.selectStorage = function (storage, $index){
    $scope.activeStorage = storage;
    inventoryAppFactory.setLastActiveStorage($index);
    // console.log(window.localStorage['lastActiveStorage_key']);
  };

  $scope.createItem = function (itemName) {
    if (!$scope.activeStorage || !itemName){
      alert("Nothing entered. Please enter an item.");
      return ;
    }
    $scope.activeStorage.items.push({ name: itemName });
    inventoryAppFactory.save($scope.storages);
    $scope.closeItemModal();
    itemName.name = ''; 
    console.log(itemName);
  };

  $scope.removeItems = function ($index){
    $scope.activeStorage.items.splice($index, 1);
    inventoryAppFactory.save($scope.storages);
  };

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
    document.getElementById('itemForm').reset();
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
