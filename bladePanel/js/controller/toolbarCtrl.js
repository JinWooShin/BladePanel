/**
 * Created by Jin Woo Shin on 12/6/2014.
 */
(function () {
    'use strict';

    angular.module('app')
    .controller('ToolbarCtrl', ['$rootScope', '$scope', '$attrs', 'PanelProvider',
        function ($rootScope, $scope, $attrs, PanelProvider) {
            $scope.goHome = function () {
                PanelProvider.clear();
            };
            $scope.openPanel = function (type) {
                PanelProvider.addPanel(type);
            };
            $scope.saveStatus = function () {
                PanelProvider.saveAllPanels();
            }
        }
    ])
    .directive('toolbar', ['$window', 'ResizeService', function ($window, ResizeService) {
        return {
            restrict: 'EA',
            templateUrl: 'Views/template/toolbar.html',
            controller: 'ToolbarCtrl',
            link: function () {
                angular.element($window).bind("resize", function () {
                    ResizeService.setHeight()
                });
                ResizeService.setHeight();
            }
        }
    }]);
}).call(this);