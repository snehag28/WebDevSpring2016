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
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
        }

        function addField(fieldType) {
            var field;
            switch(fieldType) {
                case "Single Line Text Field":
                    field = {
                        "_id": null,
                        "label": "New Text Field",
                        "type": "TEXT",
                        "placeholder": "New Field"
                    };
                    break;
                case "Multi Line Text Field":
                    field = {
                        "_id": null,
                        "label": "New Text Field",
                        "type": "TEXTAREA",
                        "placeholder": "New Field"
                    };
                    break;
                case "Date Field":
                    field = {
                        "_id": null,
                        "label": "New Date Field",
                        "type": "DATE"
                    };
                    break;
                case "Dropdown Field":
                    field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    break;
                case "Checkboxes Field":
                    field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    break;
                case "Radio Buttons Field":
                    field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]};
            }

            FieldService.createFieldForForm(formId, field)
                .then(
                    function (doc) {
                        $scope.fields = doc;
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
        }

        function duplicateField(field) {
            FieldService.createFieldForForm(formId, field)
                .then(
                    function (doc) {
                        $scope.fields = doc;
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
        }

        function editField(fieldId) {
            FieldService.getFieldForForm(formId,fieldId)
                .then(
                    function (doc) {
                        $scope.modalField = doc;
                        $scope.modalField.options = JSON.stringify($scope.modalField.options);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
        }

        function changeField(newField) {
            newfield.options = JSON.parse(newfield.options);
            FieldService.updateField(formId,newfield._id,newfield)
                .then(
                    function (doc) {
                        $scope.fields = doc;
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
        }
        function deleteField(field) {
            FieldService.deleteFieldByFormIdFieldId(formId,field._id)
                .then(
                    function (doc) {
                        $scope.fields = doc;
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
        }
    }
})();