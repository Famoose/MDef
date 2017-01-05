import {Meteor} from 'meteor/meteor';
import templateUrl from './impressum.html';


class Impressum {

    constructor($scope, $state) {
        $scope.viewModel(this);
        this.$state = $state;
    }
}
const name = 'impressum';
// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope', '$state', Impressum]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('impressum', {
            url: '/impressum',
            template: '<impressum></impressum>'
        });
}