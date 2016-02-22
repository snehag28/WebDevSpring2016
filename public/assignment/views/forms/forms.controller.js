'use strict';
(function (){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope,$rootScope,FormService){
        console.log("hello from formController!");
        console.log($rootScope.user._id);
        $scope.forms = FormService.findAllFormsForUser($rootScope.user._id);
        console.log("forms array is:"+$scope.forms);

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm(form){
            var newForm = FormService.createFormForUser($rootScope.user._id,form);
            $scope.forms.push(newForm);
        }

        function updateForm(form){
            var updatedForm = FormService.updateFormById($scope.forms[$scope.selectedFormIndex]._id, form);
            $scope.forms[$scope.selectedFormIndex] = updatedForm;
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