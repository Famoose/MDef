import {Meteor} from 'meteor/meteor';

import templateUrl from './admin.users.html';

class AdminUsers {
    constructor($scope,$state) {
        $scope.viewModel(this);

        Meteor.subscribe('users');
        this.$state = $state;

        this.helpers({
            users(){
                return Meteor.users.find({}, {fields: {emails: 1, profile: 1}})
            }
        });
    }
    view(user){
        this.$state.go("admin-evaluation",{uid: user._id});
    }
}
const name = 'adminUsers';

// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope','$state', AdminUsers]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('admin-users', {
            url: '/admin/users',
            template: '<admin-users></admin-users>',
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