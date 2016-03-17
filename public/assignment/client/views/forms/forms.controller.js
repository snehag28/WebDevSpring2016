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

        function init() {
            getFormsForUser($rootScope.user._id);
        }
        init();

        function getFormsForUser(userId){
            FormService.findAllFormsForUser(userId)
                .then(
                    function (doc) {
                        vm.forms = doc;
                        $scope.forms = userForms;
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
        };

        function addForm (form){
            FormService.createFormForUser($rootScope.user._id,form)
                .then(
                    function (doc) {
                        vm.form = doc;
                        $scope.selectedFormIndex = null;
                        $scope.newForm = {};
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
        };

        function updateForm (form){
            FormService.updateFormById($scope.forms[$scope.selectedFormIndex]._id, form,
                function(response){
                    var updatedForm = response;
                    $scope.forms[$scope.selectedFormIndex] = updatedForm;
                    $scope.selectedFormIndex = null;
                    $scope.newForm = {};
                }
            )
        };
        function deleteForm(index){
            FormService.deleteFormById($scope.forms[index]._id,
            function(response){
                $scope.forms.splice(index,1);
            })
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