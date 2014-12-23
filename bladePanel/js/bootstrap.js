/**
 * Created by Jin Woo Shin on 12/4/2014.
 */
(function () {
    "use strict";

    define([
        //Load services/providers first
        'service/esriService',
        'service/geometryService',
        'service/queryService',
        'service/layerService',
        'service/resizeService',
        'service/panelProvider',
        'service/mapService',

        //then load controllers
        'controller/indexCtrl',
        'controller/projectCtrl',
        'controller/mapCtrl',
        'controller/toolbarCtrl',
        'controller/tileContainerCtrl',
        'controller/panelContainerCtrl',
        'controller/panelCtrl'
    ], function (EsriService, QueryService, GeometryService, LayerService, ResizeService, PanelProvider, MapService,
                ProjectCtrl, indexCtrl, MapCtrl, ToolbarCtrl, TileContainer, PanelContainerCtrl, PanelCtrl) {
        function init(App) {

            App.config(function (PanelProviderProvider) {
                PanelProviderProvider.panelsConfig = {
                    panels: {
                        map: {
                            content: {
                                title: "Map",
                                content: "Map goes here"
                            }
                        },
                        search: {
                            content: {
                                title: "Search",
                                content: "Search goes here"
                            }
                        },
                        project: {
                            content: {
                                title: "Project",
                                content: "Project goes here"
                            }
                        },
                        control: {
                            content: {
                                title: "Control",
                                content: "Control goes here"
                            }
                        }
                    }

                };
            });
            angular.bootstrap(document.body, ['app']);
            return App;
        }
        return { start: init };
    });
}).call(this);