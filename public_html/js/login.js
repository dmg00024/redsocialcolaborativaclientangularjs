/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('authentication', [])
        .controller('login', function ($scope, $http) {
            
            $scope.llamada = function () 
            {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/username/',
                    
                    xhrFields: {
                        withCredentials: true
                    },
                    
                    headers:{
                        Authorization : "Basic " + btoa($scope.username + ":" + $scope.password)
                    }
                    
                }).then(function succes(json)
                {
                    location.href='/redsocialcolaborativaclientangularjs/miperfil.html';
                    
                }, function error(json){
                    
                    alert("Usuario y/o contraseña incorrectos");
                });
            };
        });