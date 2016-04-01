'use strict';
(function (){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController(UserService,FormService,$rootScope){

        var vm = this;
        var user = {};

        vm.selectedFormIndex = null;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.setFormTitle = setFormTitle;

        function init() {
            user = UserService.getUser();
            getFormsForUser(user._id);
        }
        init();

        function getFormsForUser(userId){
            FormService.findAllFormsForUser(userId)
                .then(
                    function (doc) {
                        vm.forms = doc;
                    }
                )
        }

        function setFormTitle(title) {
            $rootScope.formTitle = title;
        }

        function addForm (form){
            FormService.createFormForUser(user._id,form)
                .then(
                    function (doc) {
                        vm.form = doc;
                        vm.forms.push(vm.form);
                        vm.selectedFormIndex = null;
                        vm.newForm = {};
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
            FormService.updateFormById(vm.forms[vm.selectedFormIndex]._id, newForm)
                .then(
                    function(doc) {
                        vm.forms[vm.selectedFormIndex] = doc;
                        vm.selectedFormIndex = null;
                        vm.newForm = {};

                    }
                )
        };
        function deleteForm(index){
            FormService.deleteFormById(vm.forms[index]._id)
                .then(
                    function(doc) {
                        vm.forms.splice(index,1);
                    }
                )
        };

        function selectForm(index){
            vm.selectedFormIndex = index;
            vm.newForm = {
                "_id" : vm.forms[index]._id,
                "title" : vm.forms[index].title,
                "userId" : vm.forms[index].userId
            };
        }
    }
})();