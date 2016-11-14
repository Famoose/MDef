import templateUrl from './nav.html';

class Nav {
    constructor($scope) {

        (function ($) {
            $(function () {
                $('.button-collapse').sideNav();
            }); // end of document ready
        })(jQuery); // end of jQuery name space
    }
}

// create a module
export default angular.module('nav', [
    'accounts.ui'
])
    .component('navigation', {
        templateUrl,
        controller: ['$scope', Nav]
    });