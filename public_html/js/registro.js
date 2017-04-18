/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('registro', [])
        .controller('solicitud', function ($scope, $http) {
            
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
                    
                }).then(function succes(response)
                {
                    alert("Revise su correo electrónico y valide el registro");
                    location.href='/redsocialcolaborativaclientangularjs/index.html';
                    
                }, function error(response){
                    if(response.status === 409)
                    {
                        alert("Nombre de usuario no disponible. Por favor elija otro.");
                    }
                    else
                    {
                        alert("Por favor compruebe los campos y confirme de nuevo");
                    }
                });
            };
        });
            