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

var app = angular.module('nuevoelemento', []);

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

app.controller('nuevaescuela', function ($scope, $http)
{
    $scope.cargando=true;
    $scope.correcto=false;
    
    $scope.guardarNuevaEscuela = function ()
    {
        var fichero;
        var file = null;
        file = document.getElementById('inputfoto').files[0];

        if (file === undefined)
        {   
            $http({
                method: 'POST',
                url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/escuelas/',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    nombre: $scope.nombreEscuela,
                    descripcion: $scope.descripcionEscuela,
                    horario: $scope.horarioEscuela,
                    dir_foto: null,
                    cod_provincia: $scope.ubicacionEscuela
                }

            }).then(function succes(json)
            {
                $scope.cargando=false;
                $scope.correcto=true;
                $scope.mensaje="La escuela ha sido registrada correctamente";
                location.href = '/redsocialcolaborativaclientangularjs/buscaescuelas.html';

            }, function error(json) {
                //alert("Usuario y/o contraseña incorrectos");
            });
        } else
        {
            var reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = function ()
            {
                fichero = reader.result;

                $http({
                    method: 'POST',
                    url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/escuelas/',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        nombre: $scope.nombreEscuela,
                        descripcion: $scope.descripcionEscuela,
                        horario: $scope.horarioEscuela,
                        dir_foto: fichero,
                        cod_provincia: $scope.ubicacionEscuela
                    }

                }).then(function success(json)
                {
                    $scope.cargando=false;
                    $scope.correcto=true;
                    $scope.mensaje="La escuela ha sido registrada correctamente";
                    location.href = '/redsocialcolaborativaclientangularjs/buscaescuelas.html';

                }, function error(json)
                {
                    
                });

            };

            reader.onerror = function (error)
            {
                alert('Error: ', error);

            };
        }
    };
});

app.controller('nuevosector', function ($scope, $http)
{
    $scope.cargando=true;
    $scope.correcto=false;
    
    $scope.guardarNuevoSector = function ()
    {
        var fichero;
        var file = null;
        file = document.getElementById('inputfoto').files[0];
        var cod_escuela=null;
        
        if (file === undefined)
        {  
            cod_escuela=getParameterByName("cod");
            
            $http({
                method: 'POST',
                url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/escuelas/'+cod_escuela+'/sectores/',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    nombre: $scope.nombreSector,
                    orientacion: $scope.orientacionSector,
                    dir_foto: null
                }

            }).then(function succes(json)
            {
                $scope.cargando=false;
                $scope.correcto=true;
                $scope.mensaje="El sector ha sido registrado correctamente";
                location.href = 'javascript:window.history.back();';

            }, function error(json) {
                //alert("Usuario y/o contraseña incorrectos");
            });
        } else
        {
            cod_escuela=getParameterByName("cod");
            
            var reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = function ()
            {
                fichero = reader.result;

                $http({
                    method: 'POST',
                    url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/escuelas/'+cod_escuela+'/sectores/',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        nombre: $scope.nombreSector,
                        orientacion: $scope.orientacionSector,
                        dir_foto: fichero
                        
                    }

                }).then(function success(json)
                {
                    $scope.cargando=false;
                    $scope.correcto=true;
                    $scope.mensaje="El sector ha sido registrado correctamente";
                    console.log(fichero);
                    location.href = 'javascript:window.history.back();';

                }, function error(json)
                {
                    console.log(fichero);
                });

            };

            reader.onerror = function (error)
            {
                alert('Error: ', error);

            };
        }
    };
});

app.controller('nuevavia', function ($scope, $http)
{
    var cod_sector=null;
    
    $scope.guardarNuevaVia = function ()
    {
        cod_sector=getParameterByName("cod");
        
        $http({
            method: 'POST',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/sectores/' + cod_sector + '/vias/',
            
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                nombre: $scope.nombreVia,
                id_mapa: $scope.idMapaVia,
                nivel_oficial: $scope.nivelOficialVia
            }

        }).then(function success(json)
        {
            $scope.cargando = false;
            $scope.correcto = true;
            $scope.mensaje = "La vía ha sido registrada correctamente";
            location.href = 'javascript:window.history.back();';

        }, function error(json)
        {
            
        });
    };
});

var openFile = function (event)
{
    var input = event.target;

    var reader = new FileReader();

    reader.onload = function ()
    {
        var dataURL = reader.result;
        var output = document.getElementById('outputfoto');
        output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
};
