'use strict';
(function (){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope,$rootScope,FormService){

        $scope.selectedFormIndex = null;
        getFormsForUser($rootScope.user._id);

        function getFormsForUser(userId){
            FormService.findAllFormsForUser(userId,
                function(response){
                    var userForms = response;
                    $scope.forms = userForms;
                    console.log("in getFormsForUser:"+$scope.forms);
                }
            )
        };

        $scope.addForm = function(form){
            FormService.createFormForUser($rootScope.user._id,form,
                function(response){
                    var newForm = response;
                    $scope.forms.push(newForm);
                    $scope.selectedFormIndex = null;
                    $scope.newForm = {};
                }
            )
        };

        $scope.updateForm = function(form){
            FormService.updateFormById($scope.forms[$scope.selectedFormIndex]._id, form,
                function(response){
                    var updatedForm = response;
                    $scope.forms[$scope.selectedFormIndex] = updatedForm;
                    $scope.selectedFormIndex = null;
                    $scope.newForm = {};
                }
            )
        };
        $scope.deleteForm = function(index){
            FormService.deleteFormById($scope.forms[index]._id,
            function(response){
                $scope.forms.splice(index,1);
            })
        };

        $scope.selectForm = function(index){
            $scope.selectedFormIndex = index;
            $scope.newForm = {
                "_id" : $scope.forms[index]._id,
                "title" : $scope.forms[index].title,
                "userId" : $scope.forms[index].userId
            };
        }
    }
})();