(function () {
    'use strict';

    angular.module('app')

    .controller('MapCtrl', ['$rootScope', '$scope', '$attrs', 'MapService', function ($rootScope, $scope, $attrs, MapService) {
        var self = this;
        var mapDiv;

        this.init = function (element) {
            if (!$attrs.id) {
                throw new Error('\'id\' is required for a map.');
            }
            self.$element = element;
            self.createDiv();
            self.createMap();
        };
        this.createDiv = function () {
            mapDiv = document.createElement('div');
            mapDiv.setAttribute('id', $attrs.id);
            self.$element.removeAttr('id');
            self.$element.append(mapDiv);
        };
        this.createMap = function () {
            var options = {
                center: $attrs.center ? JSON.parse($attrs.center) : [-115.049, 40.485],
                zoom: $attrs.zoom ? parseInt($attrs.zoom) : 2,
                basemap: $attrs.basemap ? $attrs.basemap : 'streets'
            };
            $scope.map = MapService.createMap($attrs.id, options);
            $scope.map.resize();
        };
    }])

    .directive('esriMap', function () {
        return {
            restrict: 'EA',
            controller: 'MapCtrl',
            link: function (scope, element, attrs, ctrl) {
                ctrl.init(element);
            }
        }
    });
}).call(this);