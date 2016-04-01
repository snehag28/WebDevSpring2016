'use strict';
(function (){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope,$rootScope,FormService){

        var vm = this;

        $scope.selectedFormIndex = null;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.setFormTitle = setFormTitle;

        function init() {
            getFormsForUser($rootScope.user._id);
        }
        init();

        function getFormsForUser(userId){
            FormService.findAllFormsForUser(userId)
                .then(
                    function (doc) {
                        vm.forms = doc;
                        $scope.forms = vm.forms;
                    }
                )
        };

        function setFormTitle(title) {
            $rootScope.formTitle = title;
        }

        function addForm (form){
            FormService.createFormForUser($rootScope.user._id,form)
                .then(
                    function (doc) {
                        vm.form = doc;
                        $scope.forms.push(vm.form);
                        $scope.selectedFormIndex = null;
                        $scope.newForm = {};
                    }
                )
        };

        function updateForm (form){
            var newForm = {};
            newForm.userId = form.userId;
            newForm.title = form.title;
            newForm.fields = form.fields;
            newForm.created = form.created;
            newForm.updated = form.updated;
            FormService.updateFormById($scope.forms[$scope.selectedFormIndex]._id, newForm)
                .then(
                    function(doc) {
                        $scope.forms[$scope.selectedFormIndex] = doc;
                        $scope.selectedFormIndex = null;
                        $scope.newForm = {};

                    }
                )
        };
        function deleteForm(index){
            FormService.deleteFormById($scope.forms[index]._id)
                .then(
                    function(doc) {
                        $scope.forms.splice(index,1);
                    }
                )
        };

        function selectForm(index){
            $scope.selectedFormIndex = index;
            $scope.newForm = {
                "_id" : $scope.forms[index]._id,
                "title" : $scope.forms[index].title,
                "userId" : $scope.forms[index].userId
            };
        }
    }
})();