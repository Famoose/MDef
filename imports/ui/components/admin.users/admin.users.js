import {Meteor} from 'meteor/meteor';

import templateUrl from './admin.users.html';

import {Answers} from '../../../api/answer/index.js';
import {Institut} from '../../../api/institut/index.js';
import {Energietyp} from '../../../api/energietyp/index.js';
import {Fokus} from '../../../api/fokus/index.js';
import {Cluster} from '../../../api/cluster/index.js';
import {Bubble} from '../../../api/bubble/index.js';
import {Question} from '../../../api/question/index.js';

class AdminUsers {
    constructor($scope,$state,$timeout) {
        $scope.viewModel(this);
        self = this;
        self.$timeout = $timeout;
        Meteor.subscribe('institut');
        Meteor.subscribe('answers');
        Meteor.subscribe('fokus');
        Meteor.subscribe('energietyp');
        Meteor.subscribe('cluster');
        Meteor.subscribe('bubble', self.onClusterReady());
        this.$state = $state;
        this.helpers({
            currentUser() {
                return Meteor.user();
            },
            group(){
                return Institut.find();
            },
            answers(){
                return Answers.find();
            },
            clusters(){
                return Cluster.find();
            },
            bubble(){
                return Bubble.find();
            },
            energietyps(){
                return Energietyp.find();
            },
            fokus(){
                return Fokus.find();
            },
            questions(){
                return Question.find();
            },
            institut(){
                return Institut.find();
            }
        });
        $(document).ready(function () {
            $('.collapsible').collapsible();
        });
    }

    filter(settings) {
        var resAnswer = self.answerAll;
        if (this.newFokus !== undefined) {
            resAnswer = resAnswer.filter(function (elm) {
                return elm.fokus[0]._id === settings.newFokus
            })
        }
        if (this.newCluster !== undefined) {
            resAnswer = resAnswer.filter(function (elm) {
                return elm.cluster[0]._id === settings.newCluster
            })
        }
        self.resAnswer = resAnswer;
        self.calcAnswers()
    }

    getInstitut(institutId) {
        Meteor.call('answer.getInstitut', {institutId}, (err, res) => {
            if (err) {
                alert(err);
            } else {
                console.log(res);
                self.answerAll = res;
                self.resAnswer = res;
                self.calcAnswers();
            }
        })
    }

    calcAnswers() {
        var energietyps = Energietyp.find().fetch();
        self.dataField = [];
        var countsField = [];
        var categoriesField = [];
        for (i = 0; i < energietyps.length; i++) {
            self.dataField[i] = 0;
            countsField[i] = 0;
            categoriesField[i] = energietyps[i].energietyp;
            self.resAnswer.forEach(function (question) {
                if (energietyps[i]._id === question.energietyp[0]._id) {
                    question.answers.forEach(function (answer) {
                        self.dataField[i] = answer.answer + self.dataField[i];
                        countsField[i] += 1;
                    });
                }
            });
            self.dataField[i] = self.dataField[i]/countsField[i];
        }
        self.categoriesField = categoriesField;
        console.log(self.dataField);
        self.onClusterReady();
    }

    onClusterReady() {
        self.$timeout(function () {
            $('select').material_select();
        });
    }
}
const name = 'adminUsers';

// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope','$state','$timeout', AdminUsers]
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
                    }  else if (!Roles.userIsInRole(Meteor.userId(), ["admin"], "default-group")) {
                        return $q.reject('ADMIN_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }]
            }
        });
}