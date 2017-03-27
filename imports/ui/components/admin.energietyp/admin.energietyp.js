import {Meteor} from 'meteor/meteor';

import templateUrl from './admin.energietyp.html';
import {Energietyp} from '../../../api/energietyp/index.js';

class AdminEnergietyp {
    constructor($scope) {
        $scope.viewModel(this);

        Meteor.subscribe('energietyp');

        this.helpers({
            energietyp() {
                return Energietyp.find();
            }
        });
    }

    update(energietyp)
    {
        Energietyp.update({"_id":energietyp._id},{$set:{"energietyp":energietyp.energietyp}});
    }
    remove(energietyp) {
        Energietyp.remove(energietyp._id);
    }
    add(energietyp) {
        Energietyp.insert(energietyp);
        this.newEnergietyp = null;
    }
}
const name = 'adminEnergietyp';

// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope', AdminEnergietyp]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('admin-energietyp', {
            url: '/admin/energietyp',
            template: '<admin-energietyp></admin-energietyp>',
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