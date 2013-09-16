/**
 * Created with IntelliJ IDEA.
 * User: lance_sims
 * Date: 3/3/13
 * Time: 12:28 PM
 * purpose: the centralized location for the applicaiton directives
 */
'use strict';
angular.module('app.directives', [])
    .directive('main', function() {
        return {
            restrict:'EA',
            replace:'true',
            templateUrl: 'partials/main'
        }
    })
    .directive('nameForm', function() {
        return {
            restrict:'EA',
            replace:true,
            scope:true,
            templateUrl: 'partials/name-form',
            link: function(scope, elem, attrs) {
                scope.saveUser = function(user) {
                    if(user.$valid) {
                        scope.doSaveUser(user.userName);
                    }
                },
                scope.checkUser = function(user) {
                    console.log(user.userName);
                }
            }
        }
    })
    .directive('about', function() {
        return {
            restrict:'EA',
            replace: true,
            templateUrl: 'partials/about'
        }
    })
    .directive('geoForm', function() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'partials/geo-form',
            link:function(scope, elem, attrs) {
                //empty for now
            }
        }
    })
