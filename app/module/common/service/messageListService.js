app.factory('MessageListService',['MessageListModel', function(messageListModel) {
        var messageListService = function(data) {
            angular.extend(this, data);
        };
        //To get list of message
        messageListService.getAllMessage=function(){
        	return angular.copy(messageListModel.messages);
        };
        return messageListService;
    }]);
