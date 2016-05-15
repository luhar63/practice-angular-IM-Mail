app.factory('UtilService', function() {
        var utilService = function(data) {
            angular.extend(this, data);
        };
        utilService.searchElement = function(someArray, target, keyElement) {
            for (var i = 0; i < someArray.length; i++) {
                if (someArray[i][keyElement] && someArray[i][keyElement] === target) {
                    return someArray[i];
                }
            }
            return false;
        };
        utilService.isEmptyObject = function(object) {
            if (angular.isObject(object) && Object.keys(object).length > 0) {
                return false;
            } else {
                return true;
            }
        };
        return utilService;
    });
