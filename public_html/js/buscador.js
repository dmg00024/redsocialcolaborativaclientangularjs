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

var app = angular.module('buscador', []);

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

app.controller('redirigebusqueda', function ($scope)
{
    $scope.seleccion=false;
    
    $scope.redirigeBusqueda = function ()
    {
        $scope.seleccion=false;
        
        if($scope.valorBusqueda === "usuarios")
        {
            location.href='/redsocialcolaborativaclientangularjs/buscausuarios.html';
        }
        else if($scope.valorBusqueda === "escuelas de escalada")
        {
            location.href='/redsocialcolaborativaclientangularjs/buscaescuelas.html';
        }
        else
        {
            $scope.seleccion=true;
            $scope.mensaje="Por favor introduzca un criterio de búsqueda";
        }
    };
});

app.controller('buscausuario', function ($scope, $http)
{
    $scope.mostrarNoDisponible=true;
    $scope.usuarioEncontrado=false;
    
    $scope.buscarUsuario=function()
    {
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/'+$scope.username,
            withCredentials: true

        }).then(function success(json)
        {
            $scope.mostrarNoDisponible=false;
            $scope.usuarioEncontrado=true;
            $scope.mensaje="Resultado para "+$scope.username;
            $scope.usernamePerfil=json.data.username;
            $scope.nombrePerfil=json.data.nombre;
            $scope.apellidosPerfil=json.data.apellidos;
            $scope.fotoPerfil=json.data.foto;
            $scope.nivelPerfil=json.data.nivel;

        }, function error(json) 
        {
            $scope.mostrarNoDisponible=true;
            $scope.usuarioEncontrado=false;
            $scope.mensaje=$scope.username +" no figura como usuario registrado.";
            //alert("Usuario y/o contraseña incorrectos");
        });
    };
    
    $scope.verPerfilBuscado=function()
    {
        location.href='/redsocialcolaborativaclientangularjs/perfil.html?username='+$scope.usernamePerfil;
    };
    
});

app.controller('buscaescuelas', function ($scope)
{
    $scope.redirigeProvincia=function()
    {
        location.href='/redsocialcolaborativaclientangularjs/escuelas.html?provincia=' + $scope.provincia;
    };
});

app.controller('provincia', function($scope, $http)
{
    var cod_provincia=null;
    
    $scope.obtenerProvincia=function()
    {
        cod_provincia=getParameterByName("provincia");
        
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/provincia/'+cod_provincia

        }).then(function success(json)
        {
            $scope.provincia=json.data.provincia;
        }, function error(json) 
        {  
            //alert("Usuario y/o contraseña incorrectos");
        });
    };
});
