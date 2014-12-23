(function () {
    "use strict";

    angular.module('app')
    .service("QueryService", ['EsriService', '$log', '$q', function (EsriService, $log, $q) {
        this.getQuery = function () {
            return EsriService.getQuery();
        };
        this.queryTaskExcute = function (url, option, query) {
            var queryTask = EsriService.getQueryTask(url, option);
            var deferred = $q.defer();
            queryTask.execute(query, function (r) {
                deferred.resolve(r);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

    }]);
}).call(this);