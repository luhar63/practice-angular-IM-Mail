app.factory('TeamListService',['$rootScope','TeamListModel','UtilService', function($rootScope,teamListModel,utilService) {
        var teamListService = function(data) {
            angular.extend(this, data);
        };
        teamListService.selectedMember = {};
        //To Get the List of All Members
        teamListService.getAllMembers=function(){
        	return angular.copy(teamListModel.teamMember);
        };
        //To Get the Member by its ID
        teamListService.getMemberById=function(target){
        	return utilService.searchElement(teamListModel.teamMember, target, 'id');
        };
        //Member who is selected by user so that it can be communicated to other controller
        teamListService.setSelectedMemberById=function(id){
        	teamListService.selectedMember = this.getMemberById(id);
        	this.broadcastMemberChange();
        }
        //Get selected Member detail
        teamListService.getSelectedMember=function(){
        	if(utilService.isEmptyObject(this.selectedMember)){
        		return null;
        	}
        	return this.selectedMember;
        }
        //Tell other controller about the change in selected member
        teamListService.broadcastMemberChange = function() {
        	$rootScope.$broadcast('handleMemberChange');
    	};
        return teamListService;
    }]);
