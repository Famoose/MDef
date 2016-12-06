import {Meteor} from 'meteor/meteor';
import templateUrl from './register.html';


class Register {

    constructor($scope, $state) {
        $scope.viewModel(this);
        this.$state = $state;

        this.credentials = {
            email: '',
            password: ''
        };

        this.error = '';
    }

    register() {
        Accounts.createUser(this.credentials,
            this.$bindToContext((err) => {
                if (err) {
                    this.error = err;
                    Materialize.toast(this.error, 4000);
                } else {
                    this.$state.go('home');
                }
            })
        );
    }
}
const name = 'register';
// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope', '$state', Register]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('register', {
            url: '/register',
            template: '<register></register>',
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