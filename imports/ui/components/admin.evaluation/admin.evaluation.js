import {Meteor} from 'meteor/meteor';

import templateUrl from './admin.evaluation.html';
import {Categories} from '../../../api/categories/index.js';

class AdminEvaluation {
    constructor($scope,$state) {
        $scope.viewModel(this);

        Meteor.subscribe('categories');
        Meteor.subscribe('users');
        this.$state = $state;

        var self=this;

        this.helpers({
            categories() {
                return Categories.find({}, {
                    sort: {
                        category: 1
                    }
                });
            },
            user(){
                return Meteor.users.findOne({_id: self.$state.params.uid}, {fields: {emails: 1, profile: 1}})
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
                    }  else if (!Roles.userIsInRole(Meteor.userId(), ["admin"], "default-group")) {
                        return $q.reject('ADMIN_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }]
            }
        });
}