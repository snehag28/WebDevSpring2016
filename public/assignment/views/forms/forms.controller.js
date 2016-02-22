'use strict';
(function (){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope,$rootScope,FormService){

        $scope.forms = FormService.findAllFormsForUser($rootScope.user._id);
        $scope.selectedFormIndex = null;

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm(form){
            var newForm = FormService.createFormForUser($rootScope.user._id,form);
            console.log("newForm:"+newForm);
            $scope.forms.push(newForm);
            $scope.selectedFormIndex = null;
            $scope.newForm = {};
        }

        function updateForm(form){
            var updatedForm = FormService.updateFormById($scope.forms[$scope.selectedFormIndex]._id, form);
            $scope.forms[$scope.selectedFormIndex] = updatedForm;
            $scope.selectedFormIndex = null;
            $scope.newForm = {};
        }

        function deleteForm(index){
            FormService.deleteFormById($scope.forms[index]._id);
            $scope.forms.splice(index,1);
        }

        function selectForm(index){
            $scope.selectedFormIndex = index;
            $scope.newForm = {
                "_id" : $scope.forms[index]._id,
                "title" : $scope.forms[index].title,
                "userId" : $scope.forms[index].userId
            }
        }
    }
})();