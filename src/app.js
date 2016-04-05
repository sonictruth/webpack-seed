'use strict';

require('animate.css');

var angular = require('angular');

var angularRouter = require('angular-ui-router');


// test module
var hi = require('sayhi');
console.log(hi('alexz'));

angular
    .module('angularApp', [angularRouter])
    .config(function($stateProvider, $urlRouterProvider) {
        console.log('Config');

        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise('/state1');
        //
        // Now set up the states
        $stateProvider
            .state('state1', {
                url: '/state1',
                template: require('about.html')
            })
            .state('state1.list', {
                url: '/list',
                template: 'zzz',
                controller: function($scope) {
                    $scope.items = ['A', 'List', 'Of', 'Items'];
                }
            })
            .state('state2', {
                url: '/state2',
                template: 'zzz'
            })
            .state('state2.list', {
                url: '/list',
                template: 'zzz',
                controller: function($scope) {
                    $scope.things = ['Of', 'Things'];
                }
            });

    })
    .run(function() {
        console.log('RUN');
    })
    .controller('HelloUserController', function($scope) {
        $scope.NameChange = function() {
            $scope.greeting = 'Hello ' + $scope.name;
        };
    });


angular.bootstrap(document, ['angularApp']);

console.log('Done');