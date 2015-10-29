/**
 * Created by Kolf on 2015-10-27.
 */
'use strict';

/**
 * Route
 */
angular.module('mgcrea.App').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/home.html'
            })
    }
]);