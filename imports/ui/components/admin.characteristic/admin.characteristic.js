import {Meteor} from 'meteor/meteor';

import templateUrl from './admin.characteristic.html';
import {Characteristics} from '../../../api/characteristics/index.js';

class AdminCharacteristic {
    constructor($scope) {
        $scope.viewModel(this);

        Meteor.subscribe('characteristics');
        this.helpers({
            characteristics() {
                return Characteristics.find({}, {
                    sort: {
                        characteristic: 1
                    }
                });
            }
        });
    }

    update(characteristic)
    {
        Characteristics.update({"_id":characteristic._id},{$set:{"characteristic":characteristic.characteristic}});
    }
    remove(characteristic) {
        Characteristics.remove(characteristic._id);
    }
    add(characteristic) {
        Characteristics.insert(characteristic);
        this.newCharacteristic = null;
    }
}
const name = 'adminCharacteristic';

// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope', AdminCharacteristic]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('admin-characteristic', {
            url: '/admin/characteristic',
            template: '<admin-characteristic></admin-characteristic>',
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