import {Accounts} from 'meteor/accounts-base';
import templateUrl from './nav.html';
import {Meteor} from 'meteor/meteor';
import '../../../../public/js/backstretch';


class Nav {
    constructor($scope, $state, $rootScope) {
        $scope.viewModel(this);
        this.$state = $state;
        (function ($) {
            $(function () {
                $('.button-collapse').sideNav();
            }); // end of document ready
        })(jQuery); // end of jQuery name space
        $(function () {
            $.backstretch("images/background-login.jpg");
        });

        this.helpers({
            isLoggedIn() {
                return !!Meteor.userId();
            },
            currentUser() {
                return Meteor.user();
            }

        });
        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
            $('.side-nav').sideNav('hide');
        });

    }

    logout() {
        Accounts.logout(function () {
            this.$state.go('login')
        }.bind(this));
    }

    hasRoleAdmin() {
        if (!!Meteor.userId()) {
            return Roles.userIsInRole(Meteor.userId(), ["admin"], "default-group");
        }
        return false;

    }

}
const name = 'navigation';
// create a module
export default angular.module(name, [])
    .component(name, {
        templateUrl,
        controller: ['$scope', '$state', '$rootScope', Nav]
    });