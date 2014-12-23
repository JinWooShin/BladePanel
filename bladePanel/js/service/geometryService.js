(function () {
    "use strict";
    angular.module('app')
    .service("GeometryService", ['EsriService', '$q', function (EsriService, $q) {
        var gp = EsriService.getGeometryService("https://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
        this.getGeometryType = function (extent) {
            if (angular.isDefined(extent.rings)) {
                return 'esriGeometryPolygon';
            }
            else if (angular.isDefined(extent.points)) {
                return 'esriGeometryMultipoint';
            }
            else if (angular.isDefined(extent.x) && angular.isDefined(extent.y)) {
                return 'esriGeometryPoint';
            }
            else {
                return null;
            }
        };
        this.combinePolygons = function (geometries) {
            var deferred = $q.defer();
            if (geometries.length === 0) {
                deferred.resolve(null);
            } else {
                var combinedPolygon = EsriService.getPolygon(geometries[0].spatialReference);

                angular.forEach(geometries, function (geometry) {
                    combinedPolygon.addRing(geometry.rings[0]);
                });
                //Simplyfy
                if (combinedPolygon.isSelfIntersecting(combinedPolygon)) {
                    $log.info("Do simplyfy to resolve selfIntersecting");
                    gp.simplify([combinedPolygon], function (r) {
                        deferred.resolve(r[0]);
                    }, function (err) {
                        deferred.reject(err);
                    });
                } else {
                    deferred.resolve(combinedPolygon);
                }
            }
            return deferred.promise;
        };
        this.combinePoints = function (query) {
            var multipoint = {
                points: [],//push point array into this E.g. [[29.416,41.6708], [18.1963,35.8478]]
                spatialReference: {
                    wkid: '4326',
                    lastestWkid: '4326'
                }
            };
            angular.forEach(query.extents, function (extent) {
                if (getGeometryType(extent) === 'esriGeometryMultipoint') {
                    multipoint.points = multipoint.points.concat(extent.points);
                }
                else if (getGeometryType(extent) === 'esriGeometryPoint') {
                    multipoint.points.push([extent.x, extent.y]);
                }
            });
            return multipoint;
        };
        this.normalize = function (geometry) {
            var deferred = $q.defer();
            EsriService.getNormalizeUtils.normalizeCenteralMeridian(geometry, gp).then(function (r) {
                deferred.resolve(r);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
    }]);
}).call(this);