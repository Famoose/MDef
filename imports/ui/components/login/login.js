import {Meteor} from 'meteor/meteor';
import angular from 'angular';
import templateUrl from './login.html';



class Login {
    constructor($scope, $state) {
        $scope.viewModel(this);
        this.$state = $state;
        $(function () {
            $.backstretch("images/background-login.jpg");
        });
        this.credentials = {
            email: '',
            password: ''
        };

        this.error = '';
    }

    login() {
        Meteor.loginWithPassword(this.credentials.email, this.credentials.password,
            this.$bindToContext((err) => {
                if (err) {
                    this.error = err;
                    Materialize.toast(this.error, 4000);
                } else {
                    this.$state.go('profile');
                }
            })
        );
    }
}
const name = 'login';
// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope', '$state', Login]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            template: '<login></login>',
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