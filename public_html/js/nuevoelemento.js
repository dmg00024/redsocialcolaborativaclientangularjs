/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
        file = document.getElementById('fotoescuelainput').files[0];

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
                    dir_foto: null,
                    horario: $scope.horarioEscuela,
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
                        dir_foto: fichero,
                        horario: $scope.horarioEscuela,
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

var openFile = function (event)
{
    var input = event.target;

    var reader = new FileReader();

    reader.onload = function ()
    {
        var dataURL = reader.result;
        var output = document.getElementById('outputescuela');
        output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
};
