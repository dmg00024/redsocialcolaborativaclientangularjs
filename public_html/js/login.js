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

var app = angular.module('authentication', []);

app.config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.withCredentials = true;
    }]);

app.controller('login', function ($scope, $http)
{   
    $scope.inicioSesion = function ()
    {      
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/username/',
            
            headers: {
                Authorization: "Basic " + btoa($scope.username + ":" + $scope.password)
            }

        }).then(function succes(json)
        {
            $scope.username=json.data.username;
            location.href = '/redsocialcolaborativaclientangularjs/miperfil.html';

        }, function error(json) {
            alert("Usuario y/o contraseña incorrectos");
        });
    };
    
    $scope.recuerdaSesion = function ()
    {      
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/username/'

        }).then(function succes(json)
        {
            $scope.username=json.data.username;

        }, function error(json) {
            alert("Usuario y/o contraseña incorrectos");
        });
    };
    
});

app.controller('miperfil', function ($scope, $http) 
{   
    $scope.miperfil = function ()
    {     
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/',
            
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
        
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/numeropeticiones',
            
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function success(json)
        {
            $scope.numero=json.data.numeroPendientes;
        }, function error(json) {
            alert("Sesión caducada. Vuelva a iniciar sesión.");
        });
        
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/peticiones',
            
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function success(json)
        {
            $scope.peticiones=json.data;
        }, function error(json) {
            
        });
        
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/vias',
            
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function success(json)
        {
            $scope.vias=json.data;
        }, function error(json) {
            alert("Sesión caducada. Vuelva a iniciar sesión.");
        });
        
        
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/amigos',
            
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function success(json)
        {
            $scope.amigos=json.data;
        }, function error(json) {
            alert("Sesión caducada. Vuelva a iniciar sesión.");
        });
        
    };
    
    $scope.confirmarpeticion=function(idPeticion)
    {   
        $http({
            method: 'PUT',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/peticiones/',
            
            headers: {
                'Content-Type': 'application/json'
            },
            
            data: {
                idPeticion:idPeticion,
                conf:true
            }

        }).then(function success(json)
        {
            location.href='/redsocialcolaborativaclientangularjs/miperfil.html';
        }, function error(json) {
            alert("Sesión caducada. Vuelva a iniciar sesión.");
        });
        
    };
    
    $scope.redirige=function(username)
    {
        location.href='/redsocialcolaborativaclientangularjs/perfil.html?username='+username;
    };
});
   
app.controller('logoutcontroller', function ($scope) 
{   
    $scope.logout = function ()
    {        
        location.href='/redsocialcolaborativaclientangularjs/index.html';
    };
});


app.controller('perfil', function ($scope, $http)
{
    
    $scope.datosperfil = function ()
    {
        var username=getParameterByName("username");
        
        $http({
            method: 'GET',
            url: "http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/" + username

        }).then(function success(json)
        {
            $scope.usernameamigo = json.data.username;
            $scope.nivel=json.data.nivel;
            $scope.nombre=json.data.nombre;
            $scope.apellidos=json.data.apellidos;
            $scope.foto=json.data.foto;
            
        }, function error(response) {

        });
    };
});