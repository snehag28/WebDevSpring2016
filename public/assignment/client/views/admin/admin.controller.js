'use strict';

(function (){
    angular
        .module("FormBuilderApp")
        .controller("AdminController",AdminController);

    function AdminController(UserService){
        var vm = this;
        vm.sortType = 'username';
        vm.sortReverse = false;

        function init() {
            console.log("in init");
            UserService.findAllUsers()
                .then(
                    function(doc) {
                        vm.users = doc.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                )
        }
        init();
    }
})();