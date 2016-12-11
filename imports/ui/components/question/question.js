import {Meteor} from 'meteor/meteor';
import noUiSlider from 'nouislider';
import '../../../../node_modules/nouislider/distribute/nouislider.min.css'
import templateUrl from './question.html';

class Question {
    constructor($scope) {
        $scope.viewModel(this);
    }
}
const name = 'question';
// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope',Question]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('question', {
            url: '/question',
            template: '<question ng-class="container"></question>',
            resolve: {
                error: ['$q', function currentUser($q) {
                    if (Meteor.userId() === null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }]
            }
        });
}