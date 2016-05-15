app.factory('CallService',['$rootScope', function($rootScope) {
    var callService = function(data) {
        angular.extend(this, data);
    };
	callService.broadcastCalling = function() {
    	$rootScope.$broadcast('callConnected');
	};
	callService.broadcastDisconnected = function() {
    	$rootScope.$broadcast('callDisconnected');
	};
    return callService;
}]);
