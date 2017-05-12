/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('buscador', []);

app.controller('login', function ($scope, $http, $rootScope)
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
            $rootScope.username=json.data.username;

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

app.controller('redirigebusqueda', function ($scope)
{
    $scope.redirigeBusqueda = function ()
    {
        if($scope.valorBusqueda === "Usuarios")
        {
            location.href='/redsocialcolaborativaclientangularjs/buscausuarios.html';
        }
        else if($scope.valorBusqueda === "Escuelas de escalada")
        {
            location.href='/redsocialcolaborativaclientangularjs/buscaescuelas.html';
        }
    };
});
