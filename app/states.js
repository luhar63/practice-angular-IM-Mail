app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {

                url: '/',
                views: {
                    '': {
                        templateUrl: 'module/common/view/home.html'
                    },
                    "dashboardView@home": {
                        templateUrl: 'module/dashboard/dashboard.html',
                        controller: 'DashboardCtrl',
                    },
                    "teamlistView@home": {
                        templateUrl: 'module/team/teamlist.html',
                        controller: 'TeamCtrl',
                    }
                }

            })


    $urlRouterProvider.otherwise("/");

}]);
