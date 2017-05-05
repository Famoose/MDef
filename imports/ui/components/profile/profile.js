import {Meteor} from 'meteor/meteor';

import {Answers} from '../../../api/answer/index.js';
import {Institut} from '../../../api/institut/index.js';
import {Energietyp} from '../../../api/energietyp/index.js';
import {Fokus} from '../../../api/fokus/index.js';
import {Cluster} from '../../../api/cluster/index.js';
import {Bubble} from '../../../api/bubble/index.js';
import {Question} from '../../../api/question/index.js';

import templateUrl from './profile.html';

class Profile {
    constructor($scope, $state, $timeout) {
        $scope.viewModel(this);
        self = this;
        this.$state = $state;
        Meteor.subscribe('userWithGroup');
        Meteor.subscribe('answers');
        Meteor.subscribe('fokus');
        var handlerEnergietyp = Meteor.subscribe('energietyp', calcAnswersCheck);
        Meteor.subscribe('cluster');
        Meteor.subscribe('bubble', this.onClusterReady);
        self.$timeout = $timeout;

        Meteor.call('answer.getAll', (err, res) => {
            if (err) {
                alert(err);
            } else {
                self.answerAll = res;
                self.resAnswer = res;
                calcAnswersCheck();
            }
        });
        $(document).ready(function () {
            $('.collapsible').collapsible();
        });
        function calcAnswersCheck() {
            if (handlerEnergietyp.ready() && self.answerAll !== undefined) {
                self.calcAnswers()
            }
        }

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
            }
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

    getQuestion(questionId) {
        Meteor.call('question.get', {questionId}, (err, res) => {
            if (err) {
                alert(err);
            } else {
                console.log(res);
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
        this.onClusterReady();
    }

    onClusterReady() {
        self.$timeout(function () {
            $('select').material_select();
        });
    }

}
const name = 'profile';
// create a module
export default angular.module(name, [])
    .component(name, {
        templateUrl,
        controller: ['$scope', '$state', '$timeout', Profile]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('profile', {
            url: '/profile',
            template: '<profile></profile>',
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