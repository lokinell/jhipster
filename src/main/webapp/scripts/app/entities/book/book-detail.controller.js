'use strict';

angular.module('jhipsterApp')
    .controller('BookDetailController', function ($scope, $rootScope, $stateParams, entity, Book) {
        $scope.book = entity;
        $scope.load = function (id) {
            Book.get({id: id}, function(result) {
                $scope.book = result;
            });
        };
        $rootScope.$on('jhipsterApp:bookUpdate', function(event, result) {
            $scope.book = result;
        });
    });
