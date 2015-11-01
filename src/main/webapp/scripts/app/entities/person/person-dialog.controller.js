'use strict';

angular.module('jhipsterApp').controller('PersonDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Person',
        function($scope, $stateParams, $modalInstance, entity, Person) {

        $scope.person = entity;
        $scope.load = function(id) {
            Person.get({id : id}, function(result) {
                $scope.person = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('jhipsterApp:personUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.person.id != null) {
                Person.update($scope.person, onSaveFinished);
            } else {
                Person.save($scope.person, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
