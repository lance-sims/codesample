/**
 * Created with IntelliJ IDEA.
 * User: lance_sims
 * Date: 3/3/13
 * Time: 12:33 PM
 * purpose: to act as a central location for the application services
 */

'use strict';

angular.module('app.services', ['ngResource'])
    .factory('StringUtilService', function() {
        var stringUtils = {
            trim:function(str) {
                var result = str;
                try {
                    result = str.replace(/^\s+|\s+$/g,'');
                } catch(ignored){}
                return result;
            }
        }
        return stringUtils;
    })
    .factory('geoService', ['$q', '$rootScope', function ($q, $rootScope) {
        return function () {
            var updateLocation = function (coords) {
                $rootScope.$broadcast('locationUpdated', {coordinates: coords});
            };
            var d = $q.defer();
            setTimeout(function () {
                try {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                                $rootScope.$apply(function () {
                                    var latitude  = position.coords.latitude;
                                    var longitude = position.coords.longitude;
                                    updateLocation({lat: latitude, lon: longitude});
                                    d.resolve();
                                });
                            },
                            function (error) {
                                d.reject(error);
                            }
                        );
                    }
                    else {
                        d.reject('location services not allowed');
                    }
                }
                catch (err) {
                    d.reject(err);
                }
            }, 1000);
            return d.promise;
        };
    }])
    .factory('geoCodeService', ['$q', '$rootScope', function($q, $rootScope) {
        return(function(lat, lon) {
            var updateCodedLocation = function(codedLocation) {
                $rootScope.$broadcast('locationCoded', {codedLocation: codedLocation});
            };
            var d = $q.defer();
            setTimeout(function() {
                try{
                    var geocoder = new google.maps.Geocoder();
                    var latlng = new google.maps.LatLng(lat, lon);
                    //
                    geocoder.geocode({'location':latlng}, function(results, status) {
                        $rootScope.$apply(function() {
                            if(status == google.maps.GeocoderStatus.OK) {
                                if(results[1]) {
                                    var address = results[0].address_components;
                                    updateCodedLocation(address);
                                    d.resolve();
                                }
                            } else {
                                d.reject('status is: ' + status);
                            }
                        })
                    });
                } catch(error) {
                    d.reject(error);
                }
            }, 1000);
            return d.promise;
        });
    }])
    .factory('addressCodeService', ['$q', '$rootScope', function($q, $rootScope) {
        return(function(address) {
            var updateCodedAddress = function(codedAddress) {
                $rootScope.$broadcast('addressCoded', {codedAddress: codedAddress});
            };
            var d = $q.defer();
            setTimeout(function() {
                try{
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({'address':address}, function(results, status) {
                        $rootScope.$apply(function() {
                            if(status == google.maps.GeocoderStatus.OK) {
                                var codedAddress = {lat: results[0].geometry.location.lat(), lon: results[0].geometry.location.lng(), mapInfo: results};
                                updateCodedAddress(codedAddress);
                                d.resolve();
                            } else {
                                d.reject('status is: ' + status);
                            }
                        })
                    });
                } catch(error) {
                    d.reject(error);
                }
            }, 1000);
            return d.promise;
        });
    }])
    .factory('UserService', ['$resource', function($resource) {
        var User = $resource('/api/user/:id');
        return User;
    }])
    .factory('LocationService', ['$resource', function($resource){
        var Location = $resource('/api/location/:id');
        return Location;
    }])
