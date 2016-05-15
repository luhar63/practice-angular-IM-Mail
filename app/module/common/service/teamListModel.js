app.factory('TeamListModel', function() {
        var teamListModel = function(data) {
            angular.extend(this, data);
        };
        teamListModel.teamMember=[{
        	"id":1,
        	"name":"Rahul Maurya",
        	"email":"rahulmaurya.mnnit@gmail.com",
        	"designation":"Frontend Interactive Developer",
        	"profilepic":"/img/pic1.jpg"
        },{
        	"id":2,
        	"name":"Katy Perry",
        	"email":"katyperry@gmail.com",
        	"designation":"Singer/Actress",
        	"profilepic":"/img/pic2.jpg"
        },{
        	"id":3,
        	"name":"Chandler Bing",
        	"email":"friends@gmail.com",
        	"designation":"Little Master of Sarcasm",
        	"profilepic":"/img/pic3.jpeg"        	
        },{
        	"id":4,
        	"name":"Dr. House",
        	"email":"house.cw@gmail.com",
        	"designation":"Doctor of Diagnosis",
        	"profilepic":"/img/pic4.jpg"
        }];
        return teamListModel;
    });
