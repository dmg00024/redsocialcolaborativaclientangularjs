/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        console.log(reader.result);
        //alert(reader.result);
        return reader.result;
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };

    return reader.result;
}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var app = angular.module('authentication', []);

app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.withCredentials = true;
    }]);

app.controller('login', function ($scope, $http)
{
    $scope.fail = false;
    $scope.success = false;
    $scope.mensaje = null;

    $scope.inicioSesion = function ()
    {
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/username/',
            headers: {
                Authorization: "Basic " + btoa($scope.username + ":" + $scope.password)
            }

        }).then(function success(json)
        {
            $scope.fail = false;
            $scope.success = true;
            $scope.username = json.data.username;
            $scope.mensaje = "Usuario y contraseña correctos. Espere por favor...";
            location.href = '/redsocialcolaborativaclientangularjs/miperfil.html';

        }, function error(json) {
            $scope.fail = true;
            $scope.success = false;
            $scope.mensaje = "Usuario y/o contraseña incorrectos.";
        });
    };

    $scope.recuerdaSesion = function ()
    {
        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/username/'

        }).then(function succes(json)
        {
            $scope.username = json.data.username;

        }, function error(json) {
            //alert("Usuario y/o contraseña incorrectos");
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
            $scope.nivel = json.data.nivel;
            $scope.nombre = json.data.nombre;
            $scope.apellidos = json.data.apellidos;
            $scope.foto = json.data.foto;

        }, function error(json) {
            //alert("Sesión caducada. Vuelva a iniciar sesión.");
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/numeropeticiones',
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function success(json)
        {
            $scope.numero = json.data.numeroPendientes;
        }, function error(json) {
            //alert("Sesión caducada. Vuelva a iniciar sesión.");
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/peticiones',
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function success(json)
        {
            $scope.peticiones = json.data;
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
            $scope.vias = json.data;
        }, function error(json) {
            //alert("Sesión caducada. Vuelva a iniciar sesión.");
        });


        $http({
            method: 'GET',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/amigos',
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function success(json)
        {
            $scope.amigos = json.data;
        }, function error(json) {
            //alert("Sesión caducada. Vuelva a iniciar sesión.");
        });

    };

    $scope.confirmarpeticion = function (idPeticion)
    {
        $http({
            method: 'PUT',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/peticiones/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                idPeticion: idPeticion,
                conf: true
            }

        }).then(function success(json)
        {
            location.href = '/redsocialcolaborativaclientangularjs/miperfil.html';
        }, function error(json) {
            //alert("Sesión caducada. Vuelva a iniciar sesión.");
        });

    };

    $scope.redirige = function (username)
    {
        location.href = '/redsocialcolaborativaclientangularjs/perfil.html?username=' + username;
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

app.controller('actualizarperfil', function ($scope, $http)
{
    $scope.actualizacioncorrecta = false;

    $scope.datosperfil = function ()
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
            $scope.nombre = json.data.nombre;
            $scope.apellidos = json.data.apellidos;
            $scope.mail = json.data.mail;
            $scope.foto = json.data.foto;

        }, function error(json) {

        });
    };

    $scope.actualizaperfil = function ()
    {
        $scope.actualizacioncorrecta = false;
        $scope.confirmaemail = false;
        $scope.cargando = true;

        var fichero;
        var file = null;
        file = document.getElementById('fotoperfil').files[0];

        if (file === undefined)
        {
            $http({
                method: 'PUT',
                url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    nombre: $scope.nombre,
                    apellidos: $scope.apellidos,
                    mail: $scope.mail,
                    confMail: $scope.confMail,
                    dir_foto: null
                }

            }).then(function success(json)
            {
                $scope.actualizacioncorrecta = true;
                $scope.confirmaemail = false;
                $scope.cargando = false;
                $scope.mensaje = "Actualización correcta";

            }, function error(json) {
                $scope.actualizacioncorrecta = false;
                $scope.confirmaemail = true;
                $scope.cargando = false;
                $scope.mensaje = "Por favor confirme email y confirme de nuevo";
            });
        } else
        {
            var reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = function () {

                fichero = reader.result;

                $http({
                    method: 'PUT',
                    url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        nombre: $scope.nombre,
                        apellidos: $scope.apellidos,
                        mail: $scope.mail,
                        confMail: $scope.confMail,
                        dir_foto: fichero
                    }

                }).then(function success(json)
                {
                    $scope.actualizacioncorrecta = true;
                    $scope.confirmaemail = false;
                    $scope.cargando = false;
                    $scope.mensaje = "Actualización correcta";

                }, function error(json) {
                    $scope.actualizacioncorrecta = false;
                    $scope.confirmaemail = true;
                    $scope.cargando = false;
                    $scope.mensaje = "Por favor confirme email e inténtelo de nuevo";
                });

            };

            reader.onerror = function (error) {
                console.log('Error: ', error);

            };

        }

    };
});

app.controller('actualizarpassword', function ($scope, $http)
{
    $scope.cambiocorrecto=false;
    $scope.autenticacion=false;
    $scope.confirmacionpassword=false;
    $scope.datos=false;
    
    $scope.actualizapassword = function ()
    {
        $http({
            method: 'PUT',
            url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/password/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                passwordActual: $scope.passwordActual,
                newPassword: $scope.newPassword,
                confPassword: $scope.confPassword
            }

        }).then(function success(json)
        {
            $scope.cambiocorrecto = true;
            $scope.autenticacion = false;
            $scope.confirmacionpassword = false;
            $scope.datos = false;
            $scope.mensaje = "Actualización correcta";
        }, function error(json) {
            if(json.status === 401)
            {
                $scope.cambiocorrecto = false;
                $scope.autenticacion = true;
                $scope.confirmacionpassword = false;
                $scope.datos = false;
                $scope.mensaje = "Por favor confirma tu contraseña actual";
            }
            else if(json.status === 400)
            {
                $scope.cambiocorrecto = false;
                $scope.autenticacion = false;
                $scope.confirmacionpassword = true;
                $scope.datos = false;
                
                $scope.mensaje = "Debes escribir y confirmar la nueva contraseña";
            }
            else
            {
                $scope.cambiocorrecto = false;
                $scope.autenticacion = false;
                $scope.confirmacionpassword = false;
                $scope.datos = true;
                $scope.mensaje = "Introduce los datos correctamente";
            }
        });
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
            url: "http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/" + username +"/"

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
    
    $scope.viasamigo=function()
    {
        username = getParameterByName("username");

        $http({
            method: 'GET',
            url: "http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/" + username + "/vias/"

        }).then(function success(json)
        {
            $scope.vias=json.data;

        }, function error(response) {

        });
    };
    
    $scope.amigosamigo=function()
    {
        username = getParameterByName("username");

        $http({
            method: 'GET',
            url: "http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/" + username + "/amigos/"

        }).then(function success(json)
        {
            $scope.amigos=json.data;

        }, function error(response) {

        });
    };
    
    $scope.redirigePerfil=function(usernamePerfil)
    {
        $http({
            method: 'GET',
            url: "http://localhost:8080/RedSocialColaborativaRESTFUL/username/"

        }).then(function success(json)
        {
            if(json.data.username === usernamePerfil)
            {
                location.href = '/redsocialcolaborativaclientangularjs/miperfil.html';
            }
            else
            {
                location.href = '/redsocialcolaborativaclientangularjs/perfil.html?username=' + usernamePerfil;
            }

        }, function error(response) {

        });
    };
});