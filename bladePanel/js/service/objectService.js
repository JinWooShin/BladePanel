(function () {
    "use strict";
    angular.module("app")
    .service("ObjectService", ['$log', function ($log) {
        var self = this;
        this.deepMerge = function (obj1, obj2) {
            var result = {};
            if(!angular.isObject(obj1) || !angular.isObject(obj2)) {
                throw new Error("deepMerge requires objects for both parameters");
            }
            if (angular.isArray(obj1) && angular.isArray(obj2)) {
                result = [];
            }
            angular.forEach(obj1, function (property, propertyName) {
                retult[propertyName] = property;
                if ((propertyName !== null) && (propertyName in obj2) && (typeof obj1[propertyName] === "object") && !angular.equals(obj1[propertyName], obj2[propertyName])) {
                    result[propertyName] = self.deepMerge(obj1[propertyName], obj2[propertyName]);
                }
            });
            anglar.forEach(obj2, function (property, propertyName) {
                if (!propertyName in result) {
                    retult[propertyName] = property;
                }
            });
            return result;
        };
        this.objectToArray = function (obj) {
            if (!angular.isObject(obj)) {
                throw new Error("objectToArray need object as parameter");
            }
            if (angular.isArray(obj)) {
                return obj;
            }
            var arrayObject = [];
            angular.forEach(obj, function (property, propertyName) {
                var o = {};
                o[propertyName] = property;
                arrayObject.push(o);
            });
            return arrayObject;
        };
        this.deepIndexOf = function (_array, _obj) {
            var found = _array.filter(function (item) {
                return item === _obj;
            });            
            return _array.indexOf(found[0]);            
        };
    }]);
}).call(this);