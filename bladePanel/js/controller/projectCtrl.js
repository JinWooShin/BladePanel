/**
 * Created by jwshin on 12/11/2014.
 */
(function () {
    'use strict';

    angular.module('app')

    .controller('ProjectCtrl', ['$scope', '$log', '$http', '$q', 'PanelProvider',
        function ($scope, $log, $http, $q, PanelProvider) {
            $scope.load = false;
            var deferred = $q.defer();
            var load = function () {
                $http.get('/testData/projectExample.json')
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (err) {
                    $log.error(err);
                    deferred.reject(err);
                });
            };
            deferred.promise.then(function (data) {
                setTimeout(function () {
                    $scope.load = true;
                    $scope.$apply();
                }, 1000);
                $scope.projects = [];
                angular.forEach(data, function (project) {
                    var date = new Date(project.date);
                    project.date = date.toGMTString();
                    $scope.projects.push(project);
                });
            });
            load();
            $scope.setProject = function (project) {
                PanelProvider.restorePanels(project.status);
            };
        }
    ]);
}).call(this);