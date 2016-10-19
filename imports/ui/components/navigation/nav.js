import templateUrl from './nav.html';

class Nav {
    constructor($scope) {
        (function($){
            $(function(){

                $('.button-collapse').sideNav();
                $('.parallax').parallax();

            }); // end of document ready
        })(jQuery); // end of jQuery name space
    }
}

// create a module
export default angular.module('nav', [
])
    .component('navigation', {
        templateUrl,
        controller: ['$scope', Nav]
    });