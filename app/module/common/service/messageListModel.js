app.factory('MessageListModel', function() {
        var messageListModel = function(data) {
            angular.extend(this, data);
        };
        messageListModel.messages=[{
        	"msgid":1,
            "time":"14:00",
        	"from":"Katy Perry",
            "fromPic":"/img/pic2.jpg",
            "to":"Rahul Maurya",
        	"message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },{
            "msgid":2,
            "time":"14:02",
            "from":"Rahul Maurya",
            "fromPic":"/img/pic1.jpg",
            "to":"Katy Perry",
            "message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },{
            "msgid":3,
            "time":"14:03",
            "from":"Katy Perry",
            "fromPic":"/img/pic2.jpg",
            "to":"Rahul Maurya",
            "message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },{
            "msgid":4,
            "time":"14:09",
            "from":"Rahul Maurya",
            "fromPic":"/img/pic1.jpg",
            "to":"Katy Perry",
            "message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        }];
        return messageListModel;
    });
