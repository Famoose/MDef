import {Meteor} from 'meteor/meteor';

import templateUrl from './admin.cluster.html';
import {Cluster} from '../../../api/cluster/index.js';

class AdminCluster {
    constructor($scope) {
        $scope.viewModel(this);

        Meteor.subscribe('cluster');

        this.helpers({
            clusters() {
                return Cluster.find();
            }
        });
    }

    update(cluster)
    {
        Cluster.update({"_id":cluster._id},{$set:{"cluster":cluster.cluster}});
    }
    remove(cluster) {
        Cluster.remove(cluster._id);
    }
    add(cluster) {
        Cluster.insert(cluster);
        this.newCluster = null;
    }
}
const name = 'adminCluster';

// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope', AdminCluster]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('admin-cluster', {
            url: '/admin/cluster',
            template: '<admin-cluster></admin-cluster>',
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