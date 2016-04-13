'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("AdminController",AdminController);

    function AdminController(UserService){
        console.log("in admincontroller");
        var vm = this;

        function init() {
            console.log("in init");
            UserService.findAllUsers()
                .then(
                    function(doc) {
                        vm.users = doc.data;
                        console.log("users");
                        console.log(vm.users);
                    },
                    function(err) {
                        console.log("in err"+err.data);
                        vm.error = err;
                    }
                )
        }
        init();
    }
})();