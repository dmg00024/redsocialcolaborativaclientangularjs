/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var token=getParameterByName("token");

angular.module('confirmacionregistro', [])
        .controller('confirmacion', function ($scope, $http) {
            
            $scope.confirmar = function () 
            {
                $http({
                    method: 'POST',
                    url: "http://localhost:8080/RedSocialColaborativaRESTFUL/confirmacion/"+token,
                    
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    
                    data:{
                        
                    }
                    
                }).then(function succes(response)
                {
                    location.href='/redsocialcolaborativaclientangularjs/miperfil.html';
                    
                }, function error(response){
                    alert("mal");
                    //location.href='/redsocialcolaborativaclientangularjs/index.html';
                });
            };
        });
            
