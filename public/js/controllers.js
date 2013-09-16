/**
 * Created with IntelliJ IDEA.
 * User: lance_sims
 * Date: 3/3/13
 * Time: 12:27 PM
 * purpose: controllers for the application
 */

'use strict';

function AppCtrl($scope) {
    $scope.model = {};
}

//AppCtrl.$inject = [];

function MainCtrl($scope, geoService, geoCodeService, addressCodeService, $timeout) {
    //scope properties
    $scope.model = {
        appTitle: 'Lance\'s Code Sample',
        formStep: 0
    };
}

function NameFormCtrl($scope, UserService, StringUtilService, $location) {
    $scope.doSaveUser = function (userName) {
        console.log('saving user');
        var user = new UserService();
        user.userName = StringUtilService.trim(userName);
        user.$save(function (data) {
                $location.path('/geoForm').search({userId: data.data._id});
            },
            function (err) {
                alert(err.data);
            })
    }
}

function GeoFormControl($scope, $location) {
    $scope.model = {
        foo: ' foo'
    }
}

//map controller
function MapCtrl($scope, geoService, geoCodeService, addressCodeService, $timeout, LocationService, $routeParams) {
    //scope properties
    $scope.model = {
        geoLat: 0,
        geoLon: 0,
        generalAddress: '',
        useMyLocation: false,
        enterMyLocation: false,
        selfCodedGeoLat: 0,
        selfCodedGeoLon: 0,
        possibleLocations: [],
        gMapVisible: false,
        gMapMarkerArray: [],
        selectedLocation : ''
    };

    //set this up here instead of the getGeoLocation method
    //because it will continue to add listeners each time you call it
    $scope.$on('locationUpdated', function (event, parameters) {
        var coords = parameters.coordinates;
        $scope.model.geoLat = coords.lat;
        $scope.model.geoLon = coords.lon;
        //now go get the coded address
        geoCodeService(coords.lat, coords.lon);

        //show the map
        $scope.model.gMapVisible = true;


        //todo this is so lame, but we can fix it later
        //the ui-event map-idle is not being dispatched or caught
        $timeout(function () {
            var latLng = new google.maps.LatLng(coords.lat, coords.lon);
            google.maps.event.trigger($scope.gMap, 'resize');
            //now set the center
            $scope.gMap.setCenter(latLng);

            //remove any old markers
            removeMarkers();

            //create the new marker
            var marker = createMarker(coords.lat, coords.lon, null, null);

            $scope.model.gMapMarkerArray.push(marker);

            //now save the location to the user
            $scope.saveUserLocation($routeParams.userId, coords.lat, coords.lon);

        }, 500);
    });

    $scope.saveUserLocation = function(userId, lat, lon) {
        var location = new LocationService();
        location.userId = userId;
        location.lat = lat;
        location.lon = lon;
        location.$save(function(data) {
            //positive outcome
            console.log('user location saved');
        },
            //bad outcome
        function(err) {
            alert('Exception while saving user location');
        })
    }

    //add a listener for when the location has been coded
    $scope.$on('locationCoded', function (event, parameters) {
        var loc = parameters.codedLocation;
        var address = loc[3].long_name + ' ' + loc[5].long_name + ' ' + loc[7].long_name + ' ' + loc[6].short_name;
        $scope.model.generalAddress = address;
    });

    //get the location for the user
    $scope.getGeoLocation = function () {
        geoService();
    }

    //map stuff default to Guancaste Costa Rica
    var ll = new google.maps.LatLng(10.523, -85.354);
    $scope.mapOptions = {
        center: ll,
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.markerClicked = function (m) {
        window.alert('clicked');
    };

    $scope.toggleLocationForms = function (useGeo, enterMine) {
        $scope.model.useMyLocation = useGeo;
        $scope.model.enterMyLocation = enterMine;
        if (useGeo) {
            $scope.getGeoLocation();
        }
    };

    $scope.codeSelfEntered = function (city_region) {
        addressCodeService(city_region);
    };


    $scope.$on('addressCoded', function (event, parameters) {
        //first check to see if there are multiple addresses
        if (parameters.codedAddress.mapInfo.length > 1) {
            //fill up the table with possible addresses
            $scope.model.gMapVisible = false;
            $scope.model.possibleLocations = [];
            for (var i = 0; i < parameters.codedAddress.mapInfo.length; i++) {
                $scope.model.possibleLocations.push(parameters.codedAddress.mapInfo[i].formatted_address);
            }
        } else if (parameters.codedAddress.mapInfo.length <= 0) {
            alert('No match')
        } else {
            //make it visible
            $scope.model.possibleLocations = [];
            $scope.model.gMapVisible = true;

            $scope.model.selfCodedGeoLat = parameters.codedAddress.lat || 0;
            $scope.model.selfCodedGeoLon = parameters.codedAddress.lon || 0;

            //todo this is so lame, but we can fix it later
            //the ui-event map-idle is not being dispatched or caught, so the timeout has to be used until
            //the bug is fixed on the google map
            $timeout(function () {
                google.maps.event.trigger($scope.gMap, 'resize');
                //now set the center
                var latLng = new google.maps.LatLng(parameters.codedAddress.lat, parameters.codedAddress.lon);
                $scope.gMap.setCenter(latLng);
                //remove any old markers
                removeMarkers();

                var marker = createMarker(parameters.codedAddress.lat, parameters.codedAddress.lon, null, null);
                $scope.model.gMapMarkerArray.push(marker);
            }, 500);
        }

    });

    $scope.next = function () {

    }

    /**
     * remove the markers
     */
    function removeMarkers() {
        //remove any old markers
        if ($scope.model.gMapMarkerArray.length > 0) {
            $scope.model.gMapMarkerArray[$scope.model.gMapMarkerArray.length - 1].setMap(null);
        }
    }

    /**
     * put a marker on the map
     * @param lat
     * @param lon
     * @param title
     * @param label
     */
    function createMarker(lat, lon, title, label) {
        //create the latlng object
        var latLng = new google.maps.LatLng(lat, lon);

        var marker = new google.maps.Marker({
            position: latLng,
            map: $scope.gMap,
            title: title,
            labelContent: label
        });

        return marker;
    }

    function setSelected() {
        console.log('row was clicked');
        $scope.selectedLocation = location;
    }
}

//MainCtrl.$inject = [];
