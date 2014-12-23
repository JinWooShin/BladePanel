(function () {
    "use strict";
    angular.module('app')
    .service('MapService', ['EsriService', '$log', function (EsriService, $log) {
        var map = null;
        var toolbar = null;
        this.addLayer = function (layer) {
            try {
                map.addLayer(layer);
            } catch (e) {
                $log.error(e);
            }
            return layer;
        }
        this.createMap = function (id, options) {
            if (map) {
                return map;
            } else {
                map = EsriService.getMap(id, options);
                toolbar = EsriService.getDrawToolbar(map);
                return map;
            }
        };
        this.getToolbar = function () {
            return toolbar;
        }
        this.clearAllGraphicLayers = function () {
            var layerIds = map.graphicsLayerIds;
            angular.forEach(layerIds, function (id) {
                map.removeLayer(map.getLayer(id));
            });
        };
    }]);
}).call(this);