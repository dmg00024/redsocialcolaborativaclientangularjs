/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('authentication', []);

app.config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.withCredentials=true;
}]);

app.controller('login', function ($scope, $http)
{   
    $scope.inicioSesion = function ()
    {      
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/username/',
            xhrFields: {
                withCredentials: true
            },
            headers: {
                Authorization: "Basic " + btoa($scope.username + ":" + $scope.password)
            }

        }).then(function succes(json)
        {
            location.href = '/redsocialcolaborativaclientangularjs/miperfil.html';

        }, function error(json) {
            alert("Usuario y/o contraseña incorrectos");
        });
    };
    
});

app.controller('datosperfil', function ($scope, $http) 
{   
    $scope.miperfil = function ()
    {        
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/',
            
             xhrFields: {
                withCredentials: true
            },
            
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function success(json)
        {
            $scope.username = json.data.username;
            $scope.nivel=json.data.nivel;
            $scope.nombre=json.data.nombre;
            $scope.apellidos=json.data.apellidos;
            $scope.foto=json.data.foto;

        }, function error(json) {
            alert("Sesión caducada. Vuelva a iniciar sesión.");
        });
    };
});
