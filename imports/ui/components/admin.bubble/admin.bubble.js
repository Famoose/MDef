import {Meteor} from 'meteor/meteor';

import templateUrl from './admin.bubble.html';
import {Bubble} from '../../../api/bubble/index.js';
import {Cluster} from '../../../api/cluster/index.js';

class AdminBubble {

    constructor($scope,$timeout) {
        $scope.viewModel(this);

        Meteor.subscribe('bubble');
        Meteor.subscribe('cluster', this.onClusterReady);

        self.$timeout=$timeout;

        this.helpers({
            bubbles() {
                return Bubble.find({}, {
                    sort: {
                        bubble: 1
                    }
                });
            },
            clusters(){
                return Cluster.find({}, {
                    sort: {
                        cluster: 1
                    }
                });
            }
        });

    }

    update(bubble)
    {
        Bubble.update({"_id":bubble._id},{$set:{"bubble":bubble.bubble, "clusterId":bubble.clusterId}}, this.onClusterReady());
    }
    remove(bubble) {
        Bubble.remove(bubble._id);
    }
    add(bubble) {
        Bubble.insert(bubble, this.onClusterReady());
        this.newBubble = null;
        this.newCluster = null;
    }
    onClusterReady(){
        self.$timeout(function () {
            $('select').material_select();
        });
    }

}
const name = 'adminBubble';

// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope','$timeout', AdminBubble]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('admin-bubble', {
            url: '/admin/bubble',
            template: '<admin-bubble></admin-bubble>',
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