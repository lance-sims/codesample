/**
 * Created with IntelliJ IDEA.
 * User: lance_sims
 * Date: 3/3/13
 * Time: 12:23 PM
 * purpose: angular app file
 */
'use strict';

//declare the app level module
var app = angular.module('app', ['app.filters', 'app.services', 'app.directives', 'ngResource', 'ui']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'partials/ls-main', controller: 'MainCtrl'})
        $routeProvider.when('/about', {templateUrl: 'partials/ls-about', controller: 'MainCtrl'});
        $routeProvider.when('/geoForm', {templateUrl: 'partials/ls-geo-form', controller: 'MapCtrl'});
        $routeProvider.when('/nameForm', {templateUrl: 'partials/ls-name-form', controller: 'NameFormCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
