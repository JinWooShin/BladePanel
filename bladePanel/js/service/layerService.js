(function () {
    "use strict";

    angular.module('app')
    .service('LayerService', ['$log', '$q', '$http', 'EsriService', function ($log, $q, $http, EsriService) {
        this.createLayer = function (type, url, options) {
            return EsriService.getLayer(type, url, options);
        };
        this.populateLayerInfo = function (layer) {
            var deferred = $q.defer();
            var param = { 'f': 'json' };
            $http({
                method: 'GET',
                url: layer.url + "/layers",
                params: param
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        this.getLayerName = function (layer, full) {
            if (layer.name) {
                return layer.name;
            } else if (layer.id && layer.id.indexOf("layer") !== 0) {
                return layer.id;
            } else if (layer.resourceInfo && JSON.parse(layer.resourceInfo) && JSON.parse(layer.resourceInfo).documentInfo &&
                JSON.parse(layer.resourceInfo).documentInfo.title) {
                return JSON.parse(layer.resourceInfo).documentInfo.title;
            } else if (layer.url) {
                if (full) {
                    var a = layer.url.toLowerCase().indexOf("/rest/services/"),
                        b = layer.url.toLowerCase().indexOf("/mapserver", a);
                    return layer.url.substring(a + 15, b);
                } else {
                    var ret = layer.url.split("/");
                    return ret[ret.length - 2];
                }
            } else {
                return "Unknown";
            }
        };

    }]);
}).call(this);