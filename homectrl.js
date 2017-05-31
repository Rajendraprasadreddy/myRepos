app.controller("homectrl",function($scope,$http){
    $scope.searchthis = function(frm){
        $scope.pageSize = 10;
        $scope.pageIndex = 1;
     $scope.httpcall(frm.searchinput.$viewValue);  
    }
    
    $scope.httpcall = function(res){
        $scope.keyWord = res;
        var url = "https://api.stackexchange.com/2.2/questions?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&page="+$scope.pageIndex+"&pagesize="+$scope.pageSize+"&order=desc&sort=activity&tagged="+$scope.keyWord+"&filter=default"
        
        $http({
  method: 'GET',
  url: url
}).then(function successCallback(response) {
            
            if(response.data.items.length>0)
            $scope.response = response.data.items;
            else
                alert("No items matched");
            
  }, function errorCallback(response) {
    alert("No items matched");
  });
        
    }
    $scope.openThis = function(url){
        debugger;
     if(url.is_answered == true){
         iabRef = window.open(url.link, '_blank', 'location=no');
//             $http({
//  method: 'GET',
//  url: "https://api.stackexchange.com/2.2/questions/"+url.question_id+"?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity&filter=default"
//}).then(function successCallback(response) {
//            
//  }, function errorCallback(response) {
//                 
//  });
    }else{
        alert("Question not answered");
    }
    }
})