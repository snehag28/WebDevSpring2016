'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($routeParams, $scope, $rootScope, FieldService){
        var vm = this;
        var formId = $routeParams.formId;


        $scope.addField = addField;
        $scope.deleteField = deleteField;
        $scope.changeField = changeField;
        $scope.editField = editField;
        $scope.duplicateField = duplicateField;

        function init(){
            var userId = $rootScope.user._id;
            getFieldsForForm(formId);
        }

        init();

        function getFieldsForForm(formId) {
            FieldService.getFieldsForForm(formId)
                .then(
                    function (doc) {
                        $scope.fields = doc;
                    }
                )
        }

        function addField(fieldType) {
            var field;
            if(fieldType) {
                switch (fieldType) {
                    case "singleLineText":
                        field = {
                            //"_id": null,
                            "label": "New Text Field",
                            "type": "TEXT",
                            "placeholder": "New Field"
                        };
                        break;
                    case "paragraphTextField":
                        field = {
                            //"_id": null,
                            "label": "New Text Field",
                            "type": "TEXTAREA",
                            "placeholder": "New Field"
                        };
                        break;
                    case "date":
                        field = {
                            //"_id": null,
                            "label": "New Date Field",
                            "type": "DATE"
                        };
                        break;
                    case "dropdown":
                        field = {
                            //"_id": null,
                            "label": "New Dropdown", "type": "OPTIONS", "options": [
                                {"label": "Option 1", "value": "OPTION_1"},
                                {"label": "Option 2", "value": "OPTION_2"},
                                {"label": "Option 3", "value": "OPTION_3"}
                            ]
                        };
                        break;
                    case "checkBoxes":
                        field = {
                            //"_id": null,
                            "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                                {"label": "Option A", "value": "OPTION_A"},
                                {"label": "Option B", "value": "OPTION_B"},
                                {"label": "Option C", "value": "OPTION_C"}
                            ]
                        };
                        break;
                    case "radioButtons":
                        field = {
                            //"_id": null,
                            "label": "New Radio Buttons", "type": "RADIOS", "options": [
                                {"label": "Option X", "value": "OPTION_X"},
                                {"label": "Option Y", "value": "OPTION_Y"},
                                {"label": "Option Z", "value": "OPTION_Z"}
                            ]
                        };
                }

                FieldService.createFieldForForm(formId, field)
                    .then(
                        function (doc) {
                            $scope.fields = doc;
                            getFieldsForForm(formId);
                        }
                    );
            }
        }

        function duplicateField(field) {
            var newField = {};
            newField.label = field.label;
            newField.type = field.type;
            newField.placeholder = field.placeholder;
            newField.options = field.options;
            FieldService.createFieldForForm(formId, newField)
                .then(
                    function (doc) {
                        $scope.fields = doc;
                        getFieldsForForm(formId);
                    }
                );
        }

        function editField(field) {
            FieldService.getFieldForForm(formId,field._id)
                .then(
                    function (doc) {
                        $scope.modalField = doc.data;
                        if ($scope.modalField.options) {
                            $scope.modalField.options = JSON.stringify($scope.modalField.options);
                        }
                    }
                );
        }

        function changeField(field) {
            if(field.options){
                field.options = JSON.parse(field.options);
            }
            var newField = {};
            newField.label = field.label;
            newField.type = field.type;
            newField.placeholder = field.placeholder;
            newField.options = field.options;

            FieldService.updateField(formId,field._id,newField)
                .then(
                    function (doc) {
                        getFieldsForForm(formId);
                    }
                );
        }

        function deleteField(fieldId) {
            FieldService.deleteFieldFromForm(formId,fieldId)
                .then(
                    function (doc) {
                        $scope.fields = doc;
                        getFieldsForForm(formId);
                    }
                );
        }

        // reference:https://github.com/dev92/WebDevSpring2016/
        $scope.$watch('fields', function (newValue, oldValue) {
           FieldService.reorderFields(formId,newValue)
                    .then(function (response) {
                        $scope.formFields = response;
                    });
        }, true);
    }
})();