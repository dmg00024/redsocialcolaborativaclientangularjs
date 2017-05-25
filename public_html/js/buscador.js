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

app.controller('escuelas', function($scope, $http, $rootScope)
{
    var cod_provincia=null;
    
    $scope.obtenerEscuelas=function()
    {
        cod_provincia=getParameterByName("provincia");
        
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/escuelas/'+cod_provincia

        }).then(function success(json)
        {
            $scope.escuelas=json.data;
            
        }, function error(json) 
        {  
            //alert("Usuario y/o contraseña incorrectos");
        });
    };
    
    $scope.redirigeEscuela=function(id)
    {
        location.href='/redsocialcolaborativaclientangularjs/sectoresescuela.html?cod='+id;
    };
        
});

app.controller('sectores', function($scope, $http)
{
    var cod_escuela=null;
    
    $scope.datosEscuela=function()
    {
        cod_escuela=getParameterByName("cod");
        
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/escuela/'+cod_escuela

        }).then(function success(json)
        {
            $scope.nombreEscuela=json.data.nombre;
            $scope.horarioEscuela=json.data.horario;
            $scope.descripcionEscuela=json.data.descripcion;
            $scope.provinciaEscuela=json.data.provincia;
            $scope.fotoEscuela=json.data.foto;
            
        }, function error(json) 
        {  
            //alert("Usuario y/o contraseña incorrectos");
        });
    };
    
    $scope.sectoresEscuela=function()
    {
        cod_escuela=getParameterByName("cod");
        
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/sectores/'+cod_escuela

        }).then(function success(json)
        {
            $scope.sectores=json.data;
            
        }, function error(json) 
        {  
            //alert("Usuario y/o contraseña incorrectos");
        });
    };
    
    $scope.redirigeNuevoSector=function()
    {
        cod_escuela=getParameterByName("cod");
        
        location.href = '/redsocialcolaborativaclientangularjs/nuevosector.html?cod='+cod_escuela;
    };
    
    $scope.redirigeSector=function(id)
    {
        location.href = '/redsocialcolaborativaclientangularjs/viassector.html?cod='+id;
    };
});

app.controller('vias', function($scope, $http)
{
    var cod_sector=null;
    
    $scope.datosSector=function()
    {
        cod_sector=getParameterByName("cod");
        
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/sector/'+cod_sector

        }).then(function success(json)
        {
            $scope.nombreSector=json.data.nombre;
            $scope.orientacionSector=json.data.orientacion;
            $scope.escuelaSector=json.data.escuela;
            $scope.fotoSector=json.data.foto;
        }, function error(json) 
        {  
            //alert("Usuario y/o contraseña incorrectos");
        });
    };
    
    $scope.viasSector=function()
    {
        cod_sector=getParameterByName("cod");
        
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/vias/'+cod_sector

        }).then(function success(json)
        {
            $scope.vias=json.data;
            
        }, function error(json) 
        {  
            //alert("Usuario y/o contraseña incorrectos");
        });
    };
    
    $scope.redirigeNuevaVia=function()
    {
        cod_sector=getParameterByName("cod");
        
        location.href = '/redsocialcolaborativaclientangularjs/nuevavia.html?cod='+cod_sector;
    };
    
    $scope.redirigeValorarVia=function(id_via)
    {
        location.href = '/redsocialcolaborativaclientangularjs/valorarvia.html?cod='+id_via;
    };
});

app.controller('via', function($http, $scope)
{
    var cod_via=null;
    
    $scope.datosVia=function()
    {
        cod_via=getParameterByName("cod");
        
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/via/'+cod_via

        }).then(function success(json)
        {
            $scope.nombreVia=json.data.nombre;
            $scope.sectorVia=json.data.sector;
            $scope.identificadorVia=json.data.id_mapa;
            $scope.nivelOficialVia=json.data.nivel_oficial;
            $scope.nivelConsensuadoVia=json.data.nivel_consensuado;
            $scope.valoracionVia=json.data.estrellas;
            
            if($scope.valoracionVia === null)
            {
                $scope.novalorada=true;
                $scope.uno=false;
                $scope.dos=false;
                $scope.tres=false;
            }
            else if($scope.valoracionVia === 1)
            {
                $scope.novalorada=false;
                $scope.uno=true;
                $scope.dos=false;
                $scope.tres=false;
            }
            else if($scope.valoracionVia === 2)
            {
                $scope.novalorada=false;
                $scope.uno=false;
                $scope.dos=true;
                $scope.tres=false;
            }
            else if($scope.valoracionVia === 3)
            {
                $scope.novalorada=false;
                $scope.uno=false;
                $scope.dos=false;
                $scope.tres=true;
            }
            
            $scope.contadorVia=json.data.contador;
        }, function error(json) 
        {  
            //alert("Usuario y/o contraseña incorrectos");
        });
    };
    
    $scope.valorarVia=function()
    {
        cod_via=getParameterByName("cod");
        
        $http({
            method: 'POST',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/vias/'+cod_via,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                nivel:$scope.nivelConsensuado,
                valoracion:$scope.valoracion
            }
        }).then(function success(json)
        {
            $scope.valoracionCorrecta=true;
            $scope.valoracionError=false;
            location.href='/redsocialcolaborativaclientangularjs/valorarvia.html?cod='+cod_via;
        }, function error(json) 
        {  
            $scope.valoracionCorrecta=false;
            $scope.valoracionError=true;
            //alert("Usuario y/o contraseña incorrectos");
        });
    };
    
    $scope.comentarios=function()
    {
        cod_via=getParameterByName("cod");
        
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/comentarios/'+cod_via,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                nivel:$scope.nivelConsensuado,
                valoracion:$scope.valoracion
            }
        }).then(function success(json)
        {
            $scope.comentarios=json.data;
        }, function error(json) 
        {  
            
        });
    };
});


