'use strict';
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($q,$http) {

        var api = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            //reorderFields: reorderFields
        };

        return api;

        function createFieldForForm(formId, field) {
            var deferred = $q.defer();
            $http.post("/api/assignment/form/"+formId+"/field", field)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getFieldsForForm(formId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/"+formId+"/field")
                .then(
                    function(response){
                        deferred.resolve(response.data);
                    },
                    function(error){
                        deferred.reject(error);
                    }
                );
            return deferred.promise;
        }

        function getFieldForForm(formId, fieldId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/"+formId+"/field/"+fieldId)
                .then(
                    function(response){
                        deferred.resolve(response);
                    },
                    function(error){
                        deferred.reject(error);
                    }
                );
            return deferred.promise;
        }

        function deleteFieldFromForm(formId,fieldId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId)
                .success(
                    function(response){
                        deferred.resolve(response);
                    }
                );
            return deferred.promise;
        }

        function updateField(formId, fieldId, newField) {
            var deferred = $q.defer();
            $http.put(" /api/assignment/form/"+formId+"/field/"+fieldId, newField)
                .success(
                    function(response){
                        deferred.resolve(response);
                    }
                );
            return deferred.promise;
        }

        // reference:https://github.com/dev92/WebDevSpring2016/
        /*function reorderFields(formId,fields){
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field";
            $http.put(url, fields).success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        }*/
    }
})();
