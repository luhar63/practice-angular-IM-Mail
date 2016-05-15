app.controller('TeamCtrl', ['$scope','TeamListService','CallService', function(scope,teamListService,callService) {
		
		var setSelectedMember=function(id){
			teamListService.setSelectedMemberById(id);
		};
		scope.changeSelectedMember=function(id){
			scope.team.selectedMemberId = id;
			setSelectedMember(id);
		};
		scope.endCallFn=function(){
			callService.broadcastDisconnected();
		};
		var init=function(){
			scope.team={};
			scope.team.selectedMember = teamListService.getSelectedMember();
			scope.team.selectedMemberId = scope.team.selectedMember?scope.team.selectedMember.id:1;
			setSelectedMember(scope.team.selectedMemberId);
			scope.team.allMembers = teamListService.getAllMembers();
			scope.$on('callConnected', function() {
		        scope.team.memberCalled= teamListService.getSelectedMember();
		        if(scope.team.memberCalled.calling){
		        	scope.showCallPanel=true;
		        }
		    });
		    scope.$on('callDisconnected', function() {
		        scope.team.memberCalled.calling=false;
		        scope.showCallPanel=false;
		    });
		};
		init();
    }
]);