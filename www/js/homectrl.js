app.controller("homectrl",function($scope,$http,$rootScope,$state,share){
        $scope.noMoreItemsAvailable = true;
    $scope.searchthis = function(frm){
        $scope.pageSize = 10;
        $scope.pageIndex = 1;
        $scope.response = [];
        $scope.searchinput = frm.searchinput.$viewValue;
        $scope.noMoreItemsAvailable = true;
        if($rootScope.onLine)
     $scope.httpcall(frm.searchinput.$viewValue); 
        else{
          var s = JSON.parse(localStorage.getItem("storage"))  
          if(s!=null){
              $scope.response = s;
          }else{
              alert("no connection, no stored items");
          }
        }
    }
    
    $scope.httpcall = function(res){
        $scope.keyWord = res;
        var url = "https://api.stackexchange.com/2.2/questions?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&page="+$scope.pageIndex+"&pagesize="+$scope.pageSize+"&order=desc&sort=activity&tagged="+$scope.keyWord+"&filter=withbody"
        
        $http({
  method: 'GET',
  url: url
}).then(function successCallback(response) {
            
            if(response.data.items.length>0)
            $scope.response = $scope.response.concat(response.data.items);
            else
                alert("No items matched");
            if(response.data.items.length<10){
                $scope.noMoreItemsAvailable = true;
            }else{
                $scope.noMoreItemsAvailable = false;
            }
  }, function errorCallback(response) {
    alert("No items matched");
  });
        
    }
    $scope.openThis = function(url){
        
        if(localStorage.getItem("storage")){
            $scope.localItem = JSON.parse(localStorage.getItem("storage"));

            $scope.localItem.push(url);
            if($scope.localItem.length>3){
                $scope.localItem.pop();
            }
            localStorage.setItem("storage",JSON.stringify($scope.localItem));
        }else{
            debugger;
            $scope.localItem = [];
            $scope.localItem.push(url);
            localStorage.setItem("storage",JSON.stringify($scope.localItem));
        }
        share.setQuestion(url);
        $state.go('details');
    }
    
    $scope.loadMore = function(){
        $scope.pageIndex = $scope.pageIndex + 1;
        $scope.httpcall($scope.searchinput);
    }
    
}).controller("detailscontroller",function($scope,share,$state){
$scope.data = share.getQuestion();
    console.log($scope.data)
    $scope.goBack = function(){
        $state.go('home');
    }
}).factory('share', function(){
    var data =
        {
            question: {}
        };
    
    return {
        getQuestion: function () {
            return data.question;
        },
        setQuestion: function (question) {
            data.question = question;
        }
    };
});