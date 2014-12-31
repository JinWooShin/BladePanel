/**
 * Created by jwshin on 12/8/2014.
 */
(function () {
    'use strict';

    angular.module('app')
    .controller("PanelCtrl", ['$scope', '$rootScope', '$element', '$log', 'PanelProvider',
        function ($scope, $rootScope, $element, $log, PanelProvider) {
            $scope.addChildPanel = function () {
                console.log($scope.panel);
            };
            $scope.toggleLock = function () {
                $scope.panel.lock = !$scope.panel.lock;
            };
            $scope.toggleCollapse = function (isCollapsing, event) {
                event.stopPropagation();
                if (!isCollapsing) {
                    $scope.panel.collapse = false;                    
                } else {
                    $scope.panel.collapse = !$scope.panel.collapse;                    
                }
                if ($scope.panel.collapse) {
                    $element[0].querySelector('.panelHeadTitle').style.width = (window.innerHeight - 28) + "px";
                } else {
                    $element[0].querySelector('.panelHeadTitle').style.width = "auto";
                }
                $rootScope.$broadcast("panelChanged");
            };
            $scope.closePanel = function () {
                if (!$scope.panel.lock) {
                    PanelProvider.removePanel($scope.panel);
                } else {
                    $log.debug("Cannot close locked panel");
                }
            };
            $scope.savePanel = function () {
                PanelProvider.savePanel($scope.panel);
            };


            $scope.getStyle = function () {
                var panels = PanelProvider.getPanels();
                if (panels.length > 0) {
                    //$element.children()[0].style.height = (window.innerHeight - 28 - 10 /*scrollbar height*/) + "px";
                }
            };
        }
    ])

    .directive("layoutPanel", ['$compile', '$templateCache', function ($compile, $templateCache) {
        return {
            restrict: 'EA',
            controller: 'PanelCtrl',
            templateUrl: 'js/template/panel.html',
            scope: {
                panel: "="
            },
            link: function (scope, element) {
                //var pan = $(element.children()[0]).clone(false);
                var pan = $compile($templateCache.get(scope.panel.templateUrl))(scope);
                $(pan).appendTo(document.body);
                var width = pan.css("width");   //we can get intended(rendered) width value only after add element to document.
                pan.remove();
                element.children().css("height", (window.innerHeight - 18 - 10 /*scrollbar height*/) + "px")
                                .css("width", width);
                                //.css("maxWidth", width);
            }
        };
    }]);

}).call(this);