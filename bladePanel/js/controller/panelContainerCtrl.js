/**
 * Created by jwshin on 12/5/2014.
 */
(function () {
    'use strict';
    angular.module('app')

    .controller('PanelContainerCtrl', ['$rootScope', '$scope', '$element', 'PanelProvider',
        function ($rootScope, $scope, $element, PanelProvider) {
            $scope.getPanels = function () {
                return PanelProvider.getPanels();
            };
            $scope.$on("panelChanged", function () {
                $scope.panels = $scope.getPanels();
            });
            $scope.panels = $scope.getPanels();

            //resizing container according to panels
            $scope.getStyle = function () {
                var panels = document.querySelectorAll(".layoutPanel.horizontal");
                var container = window.getComputedStyle(document.querySelector(".panelContainer.horizontal"), null);
                var total = 0;
                if (panels.length > 0) {
                    angular.forEach(panels, function (panel) {
                        var style = window.getComputedStyle(panel, null);
                        total += parseInt(style.getPropertyValue("width")) +
                                parseInt(style.getPropertyValue("margin-left")) +
                                parseInt(style.getPropertyValue("margin-right"));
                    });
                    var containerMargin = parseInt(container.getPropertyValue("margin-left")) +
                                            parseInt(container.getPropertyValue("margin-right"));
                    $element.children()[0].style.width = (total + containerMargin) + "px";
                    $scope.resizeLayout();
                }
            };
            $scope.resizeLayout = function () {
                var toolbar = window.getComputedStyle(document.querySelector("#toolbar"), null);
                var tileContainer = window.getComputedStyle(document.querySelector("#tileContainer"), null);
                var panelContainer = window.getComputedStyle(document.querySelector("#panelContainer"), null);
                var total = 0;
                if (toolbar) {
                    total += parseInt(toolbar.getPropertyValue("width")) + parseInt(toolbar.getPropertyValue("margin-right")) + parseInt(toolbar.getPropertyValue("margin-left"));
                }
                if (tileContainer) {
                    total += parseInt(tileContainer.getPropertyValue("width")) + parseInt(tileContainer.getPropertyValue("margin-right")) + parseInt(tileContainer.getPropertyValue("margin-left"));
                }
                if (panelContainer) {
                    total += parseInt(panelContainer.getPropertyValue("width")) + parseInt(panelContainer.getPropertyValue("margin-right")) + parseInt(panelContainer.getPropertyValue("margin-left"));
                }

                document.querySelector(".layoutContainer").style.width = total + "px";
            };
        }
    ])
    .directive("panelContainer", function () {
        return {
            restrict: 'EA',
            controller: 'PanelContainerCtrl',
            templateUrl: 'Views/template/panelContainer.html',
            link: function (scope, element) {
                element.children().css("height", (window.innerHeight - 16 - 10 /*scrollbar height*/) + "px");
            }
        };
    });

}).call(this);