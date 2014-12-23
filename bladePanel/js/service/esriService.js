(function () {
    "use strict";
    define([
        'esri/map',

        'esri/layers/ArcGISDynamicMapServiceLayer',
        'esri/layers/FeatureLayer',
        'esri/layers/GraphicsLayer',

        'esri/tasks/query',
        'esri/tasks/QueryTask',
        'esri/tasks/GeometryService',

        'esri/geometry/Circle',
        'esri/geometry/normalizeUtils',
        'esri/geometry/Polygon',

        'esri/symbols/SimpleMarkerSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/symbols/SimpleFillSymbol',

        'esri/config',

        'esri/Color',

        'esri/toolbars/draw'

    ], function (Map,
            ArcGISDynamicMapServiceLayer, FeatureLayer, GraphicsLayer,
            Query, QueryTask, GeometryService,
            Circle, normalizeUtils, Polygon,
            SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
            esriConfig,
            Color,
            Draw
        ) {
        angular.module('app')
        .provider('EsriService', [function () {

            this.$get = function ($log, $rootScope) {
                return {
                    getMap: function (id, options) {
                        return new Map(id, options);
                    },
                    getDrawToolbar: function (map) {
                        return new Draw(map);
                    },
                    getLayer: function (type, url, options) {
                        var layer = null;
                        switch (type) {
                            case "feature":
                                layer = new FeatureLayer(url, options);
                                break;
                            case "map":
                                layer = new ArcGISDynamicMapServiceLayer(url, options);
                                break;
                            case "graphic":
                                layer = new GraphicsLayer(options);
                                break;
                            default:
                                break;
                        }
                        if (layer) {
                            return layer;
                        } else {
                            throw new Error("invalid layer parameter");
                        }
                    },
                    getQuery: function () {
                        return new Query();
                    },
                    getQueryTask: function (url, options) {
                        return new QueryTask(url, options);
                    },
                    getGeometryService: function (url) {
                        return new GeometryService(url);
                    },
                    getNormalizeUtils: function () {
                        return normalizeUtils;
                    },                    
                    getGeometryCircle: function (param1, param2) {
                        if (param1.center) {
                            return new Circle(param1);
                        } else {
                            return new Circle(param1, param2);
                        }
                    },
                    getPolygon: function (option) {
                        return new Polygon(option);
                    },
                    getSymbolsSimpleSymbol: function (type, param1, param2, param3, param4) {
                        var symbol = null;
                        switch (type) {
                            case 'marker':
                                symbol = new SimpleMarkerSymbol(param1, param2, param3, param4);
                                break;
                            case 'line':
                                symbol = new SimpleLineSymbol(param1, param2, param3);
                                break;
                            case 'fill':
                                symbol = new SimpleFillSymbol(param1, param2, param3);
                                break;
                            default:
                                throw new Error("Invalid symbol type");
                                break;
                        };
                        if (symbol) {
                            return symbol;
                        } else {
                            throw new Error("Invalid symbol parameters");
                        }
                    },
                    getColor: function (color) {
                        return new Color(color);
                    }

                }
            }
        }]);

    });
}).call(this);