import {Steps} from '../../../api/steps.js';

import templateUrl from './home.html';

class Home {
    constructor($scope) {
        $scope.viewModel(this);

        this.helpers({
            steps() {
                return Steps.find({});
            }
        });
    }
}

// create a module
export default angular.module('home', [
])
    .component('home', {
        templateUrl,
        controller: ['$scope', Home]
    })
    .config(config);

function config($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            template: '<home></home>'
        });
}