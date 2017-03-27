import {Meteor} from 'meteor/meteor';

import templateUrl from './admin.fokus.html';
import {Fokus} from '../../../api/fokus/index.js';

class AdminFokus {
    constructor($scope) {
        $scope.viewModel(this);

        Meteor.subscribe('fokus');

        this.helpers({
            fokus() {
                return Fokus.find();
            }
        });
    }

    update(fokus)
    {
        Fokus.update({"_id":fokus._id},{$set:{"fokus":fokus.fokus}});
    }
    remove(fokus) {
        Fokus.remove(fokus._id);
    }
    add(fokus) {
        Fokus.insert(fokus);
        this.newFokus = null;
    }
}
const name = 'adminFokus';

// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope', AdminFokus]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('admin-fokus', {
            url: '/admin/fokus',
            template: '<admin-fokus></admin-fokus>',
            resolve: {
                error: ['$q', function currentUser($q) {
                    if (Meteor.userId() === null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else if (!Roles.userIsInRole(Meteor.userId(), ["admin"], "default-group")) {
                        return $q.reject('ADMIN_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }]
            }
        });
}