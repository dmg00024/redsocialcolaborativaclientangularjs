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

var app = angular.module('perfil', []);

app.controller('login', function ($scope, $http)
{
    $scope.recuerdaSesion = function ()
    {
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/username/',
            withCredentials: true

        }).then(function succes(json)
        {
            $scope.username = json.data.username;

        }, function error(json) {
            //alert("Usuario y/o contraseña incorrectos");
        });
    };
});

app.controller('logoutcontroller', function ($scope)
{
    $scope.logout = function ()
    {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++)
        {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }

        location.href = '/redsocialcolaborativaclientangularjs/index.html';
    };
});

app.controller('perfil', function ($scope, $http)
{
    var username;

    $scope.datosperfil = function ()
    {
        username = getParameterByName("username");

        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/'+username+'/'

        }).then(function success(json)
        {
            $scope.usernameamigo = json.data.username;
            $scope.nivel = json.data.nivel;
            $scope.nombre = json.data.nombre;
            $scope.apellidos = json.data.apellidos;
            $scope.foto = json.data.foto;

        }, function error(response) {

        });
    };
});

app.controller('vias', function ($scope, $http)
{
    var username;
    
    $scope.vias = function ()
    {
        username=getParameterByName("username");
        
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/'+username+'/vias/'

        }).then(function success(json)
        {
            $scope.vias = json.data;
        }, function error(json) {
            //alert("Sesión caducada. Vuelva a iniciar sesión.");
        });
    };
});

app.controller('amigos', function ($scope, $http)
{
    var username;
    
    $scope.amigos = function ()
    {
        username=getParameterByName("username");
        
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/'+username+'/amigos/'

        }).then(function success(json)
        {
            $scope.amigos = json.data;
        }, function error(json) {
            //alert("Sesión caducada. Vuelva a iniciar sesión.");
        });
    };
});


