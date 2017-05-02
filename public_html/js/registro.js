/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('registro', [])
        .controller('solicitud', function ($scope, $http) {   
            
            $scope.revisarCorreo=false;
            $scope.usuarioNoDisponible=false;
            $scope.comprobarDatos=false;
            $scope.mensaje=null;
            
            $scope.registro = function () 
            {
                $http({
                    method: 'POST',
                    url: 'http://localhost:8080/RedSocialColaborativaRESTFUL/perfil/acceso',
                    
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    
                    data:{
                        username: $scope.username,
                        password: $scope.password,
                        confPassword: $scope.confPassword,
                        mail: $scope.mail,
                        confMail: $scope.confMail
                    }
                    
                }).then(function success(response)
                {
                    $scope.revisarCorreo = true;
                    $scope.usuarioNoDisponible = false;
                    $scope.comprobarDatos = false;
                    $scope.mensaje="Dispone de 30 minutos para revisar su correo electrónico y validar el registro.";
                    //alert("Revise su correo electrónico y valide el registro");
                    //location.href='/redsocialcolaborativaclientangularjs/index.html';
                    
                }, function error(response){
                    if(response.status === 409)
                    {
                        $scope.usuarioNoDisponible=true;
                        $scope.revisarCorreo=false;
                        $scope.comprobarDatos=false;
                        $scope.mensaje="Nombre de usuario no disponible. Por favor elija otro.";
                        //alert("Nombre de usuario no disponible. Por favor elija otro.");
                    }
                    else
                    {
                        $scope.comprobarDatos = true;
                        $scope.revisarCorreo = false;
                        $scope.usuarioNoDisponible = false;
                        //alert($scope.comprobarDatos);
                        $scope.mensaje="Por favor compruebe los campos y confirme de nuevo";
                        //alert("Por favor compruebe los campos y confirme de nuevo");
                    }
                });
            };
        });
            