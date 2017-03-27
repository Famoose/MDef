import {Meteor} from 'meteor/meteor';

import templateUrl from './select.html';

class Select {
    constructor($scope) {
        $scope.viewModel(this);
    }

}
const name = 'material-select';

// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope', Select],
        bindings: {
            model: '=',
            options: '<',
            change: '<'
        }
    })