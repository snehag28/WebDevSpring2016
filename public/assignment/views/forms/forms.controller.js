'use strict';
(function (){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope){
        $scope.forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.removeForm = removeForm;
        $scope.selectForm = selectForm;

        function addForm(form){
            var newForm = {
                "_id" : form._id,
                "title" : form.title,
                "userId" : form.userId
            };
            $scope.forms.push(newForm);
        }

        function updateForm(form){
            $scope.forms[$scope.selectedFormIndex] = {
                "_id" : form._id,
                "title" : form.title,
                "userId" : form.userId
            }
        }

        function removeForm(form){
            var index = $scope.forms.indexOf(form);
            $scope.forms.splice(index,1);
        }

        function selectForm(index){
            $scope.selectedFormIndex = index;
            $scope.form = {
                "_id" : $scope.forms[index]._id,
                "title" : $scope.forms[index].title,
                "userId" : $scope.forms[index].userId
            }
        }
    }
})();