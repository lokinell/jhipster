'use strict';

angular.module('jhipsterApp')
    .controller('PersonDetailController', function ($scope, $rootScope, $stateParams, entity, Person) {
        $scope.person = entity;
        $scope.load = function (id) {
            Person.get({id: id}, function(result) {
                $scope.person = result;
            });
        };
        $rootScope.$on('jhipsterApp:personUpdate', function(event, result) {
            $scope.person = result;
        });
    });
