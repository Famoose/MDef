import templateUrl from './login.html';

class Login {
    constructor($scope) {
        $scope.viewModel(this);

    }
}

// create a module
export default angular.module('login', [

])
    .component('login', {
        templateUrl,
        controller: ['$scope', Login]
    })
    .config(config);

function config($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            template: '<login></login>'
        });
}