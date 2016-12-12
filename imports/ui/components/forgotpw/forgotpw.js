import {Meteor} from 'meteor/meteor';
import templateUrl from './forgotpw.html';


class Forgotpw {

    constructor($scope, $state) {
        $scope.viewModel(this);
        this.$state = $state;

        this.credentials = {
            email: ''
        };

        this.error = '';

    }
    reset() {
        Accounts.forgotPassword(this.credentials, this.$bindToContext((err) => {
            if (err) {
                this.error = err;
               if (this.error.error === 403) {
                    Materialize.toast("Keine gültige Email", 4000);
                }else{
                    Materialize.toast(this.error.reason, 4000);
                }
            } else {
                this.$state.go('login');
            }
        }));
    }
}
const name = 'forgotpw';
// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope', '$state', Forgotpw]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('forgotpw', {
            url: '/forgotpw',
            template: '<forgotpw></forgotpw>',
            resolve: {
                error: ['$q', function currentUser($q) {
                    if (Meteor.userId()!== null) {
                        return $q.reject('LOGGED_IN');
                    } else {
                        return $q.resolve();
                    }
                }]
            }
        });
}