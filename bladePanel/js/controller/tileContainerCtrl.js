/**
 * Created by jwshin on 12/8/2014.
 */
(function () {
    'use strict';

    angular.module('app')

    .controller('TileContainerCtrl', ['$rootScope', '$scope', 'PanelProvider',
        function ($rootScope, $scope, PanelProvider) {
            $scope.getPanels = function () {
                return PanelProvider.getPanels();
            };

        }
    ])
    .directive('tileContainer', ['$window', function () {
        return {
            restrict: 'EA',
            templateUrl: 'Views/template/tileContainer.html',
            controller: 'TileContainerCtrl',
            link: function (scope, element) {
                element.children().css("height", (window.innerHeight - 16 - 10 /*scrollbar height*/) + "px");
            }
        }
    }]);

}).call(this);