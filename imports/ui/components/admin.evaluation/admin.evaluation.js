import {Meteor} from 'meteor/meteor';

import templateUrl from './admin.evaluation.html';
import {Categories} from '../../../api/categories/index.js';

class AdminEvaluation {
    constructor($scope,$state) {
        $scope.viewModel(this);

        Meteor.subscribe('categories');
        Meteor.subscribe('users');
        this.$state = $state;

        this.helpers({
            categories() {
                return Categories.find({}, {
                    sort: {
                        category: 1
                    }
                });
            },
            users(){
                return Meteor.users.find({}, {fields: {emails: 1, profile: 1}})
            }
        });
    }
}
const name = 'adminEvaluation';

// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope','$state', AdminEvaluation]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('admin-evaluation', {
            url: '/admin/users/evaluation/:uid',
            template: '<admin-evaluation></admin-evaluation>',
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