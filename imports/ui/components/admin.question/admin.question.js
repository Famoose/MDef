import {Meteor} from 'meteor/meteor';

import templateUrl from './admin.question.html';
import {Cluster} from '../../../api/cluster/index.js';
import {Energietyp} from '../../../api/energietyp/index.js';
import {Fokus} from '../../../api/fokus/index.js';
import {Question} from '../../../api/question/index.js';

class AdminQuestion {

    constructor($scope,$timeout) {
        $scope.viewModel(this);

        Meteor.subscribe('question');
        Meteor.subscribe('energietyp', this.onClusterReady);
        Meteor.subscribe('fokus', this.onClusterReady);
        Meteor.subscribe('cluster', this.onClusterReady);

        self.$timeout=$timeout;

        this.helpers({
            questions(){
                return Question.find({},{
                    sort: {
                        question: 1
                    }
                })
            },
            energietyps() {
                return Energietyp.find({}, {
                    sort: {
                        energietyp: 1
                    }
                });
            },
            clusters(){
                return Cluster.find({}, {
                    sort: {
                        cluster: 1
                    }
                });
            },
            fokus(){
                return Fokus.find({}, {
                    sort: {
                        fokus: 1
                    }
                });
            }
        });

    }

    update(question)
    {
        Question.update({"_id":question._id},{$set:{
            "question":question.question,
            "energietypId":question.energietypId,
            "fokusId":question.fokusId,
            "clusterId":question.clusterId}}, this.onClusterReady());
    }
    remove(question) {
        Question.remove(question._id);
    }
    add(question) {
        Question.insert(question, this.onClusterReady());
        this.newFokus = null;
        this.newEnergietyp = null;
        this.newQuestion = null;
        this.newCluster = null;
    }
    onClusterReady(){
        self.$timeout(function () {
            $('select').material_select();
            $('.collapsible').collapsible();
        });
    }

}
const name = 'adminQuestion';

// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope','$timeout', AdminQuestion]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('admin-question', {
            url: '/admin/question',
            template: '<admin-question></admin-question>',
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