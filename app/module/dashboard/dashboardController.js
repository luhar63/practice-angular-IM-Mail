app.controller('DashboardCtrl', ['$scope','TeamListService','$timeout','MessageListService','CallService',function(scope,teamListService,$timeout,messageListService,callService) {
        
        scope.closeProfileFn=function(){
        	scope.dashboard.showProfile=false;
        	scope.dashboard.calling.callingMode = false;
        	if(scope.dashboard.onGoingCall){
        		scope.dropCall();
        	}
        };
        scope.dropCall=function(){
        	callService.broadcastDisconnected();
        };
        scope.showProfileFn=function(){
        	scope.dashboard.showProfile=true;

        };
        scope.startCallingFn=function(){
        	scope.dashboard.calling.callingMode = true;
        	scope.dashboard.member.calling = scope.dashboard.calling.callingMode;
        	//Just to give some delay in connecting call
        	$timeout(function() {
		        callService.broadcastCalling();
		    }, 1000);
        	
        };
        scope.toggleMute=function(){
        	scope.dashboard.mute=!scope.dashboard.mute;
        };
        var init=function(){
        	scope.dashboard={};
        	scope.dashboard.callingText="Calling...";
        	scope.dashboard.calling={};
        	scope.dashboard.showProfile=false;
        	scope.dashboard.onGoingCall=false;
        	scope.dashboard.calling.callingMode = false;
        	scope.dashboard.messages=messageListService.getAllMessage();
	        scope.$on('handleMemberChange', function() {
		        scope.dashboard.member= teamListService.getSelectedMember();
		        if(scope.dashboard.member.calling){
		        	scope.dashboard.calling.callingMode=scope.dashboard.member.calling;
		        }else{
		        	scope.dashboard.calling.callingMode= false;
		        }
		    });
		    scope.$on('callConnected', function() {
		    	scope.dashboard.callingText="00:00"
		    	scope.dashboard.onGoingCall=true;
		    });
		    scope.$on('callDisconnected', function() {
		        scope.dashboard.callingText="Calling...";
		        scope.dashboard.onGoingCall=false;
		        scope.closeProfileFn();
		    });
        };
        init();
    }
]);
