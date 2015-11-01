'use strict';

angular.module('jhipsterApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('person', {
                parent: 'entity',
                url: '/persons',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'jhipsterApp.person.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/person/persons.html',
                        controller: 'PersonController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('person');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('person.detail', {
                parent: 'entity',
                url: '/person/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'jhipsterApp.person.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/person/person-detail.html',
                        controller: 'PersonDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('person');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Person', function($stateParams, Person) {
                        return Person.get({id : $stateParams.id});
                    }]
                }
            })
            .state('person.new', {
                parent: 'person',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/person/person-dialog.html',
                        controller: 'PersonDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    age: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('person', null, { reload: true });
                    }, function() {
                        $state.go('person');
                    })
                }]
            })
            .state('person.edit', {
                parent: 'person',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/person/person-dialog.html',
                        controller: 'PersonDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Person', function(Person) {
                                return Person.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('person', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
