
app.directive('cfadeIn', function() {
    return {
        restrict: 'A',
        scope:{
            cfadeIn:'='
        },
        link: function(scope, $elm) {
            scope.$watch(function(){
                    return scope.cfadeIn;
                },function(newValue){
               if(newValue){
                    $elm.fadeIn(500);
               }
               else{
                    $elm.fadeOut(500);
               }
            });
        }
    };
}).directive('cfadeOut', function() {
    return {
        restrict: 'A',
         scope:{
            cfadeOut:'='
        },
        link: function(scope, $elm) {
            scope.$watch(function(){
                    return scope.cfadeOut;
                },function(newValue){
               if(newValue){
                    $elm.fadeOut(500);
               } 
               else{
                    $elm.fadeIn(500);
               }
            });
        }
    };
});