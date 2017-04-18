import {Meteor} from 'meteor/meteor';

import {Answers} from '../../../api/answer/index.js';
import {Institut} from '../../../api/institut/index.js';
import {Energietyp} from '../../../api/energietyp/index.js';
import {Fokus} from '../../../api/fokus/index.js';
import {Cluster} from '../../../api/cluster/index.js';
import {Bubble} from '../../../api/bubble/index.js';
import {Question} from '../../../api/question/index.js';

import {Highcharts} from 'highcharts';
import 'highcharts/modules/exporting';

import templateUrl from './profile.html';

class Profile {
    constructor($scope, $state) {
        $scope.viewModel(this);
        this.$state = $state;
        Meteor.subscribe('userWithGroup');
        Meteor.subscribe('answerWithQuestion');
        Meteor.subscribe('questionWithForeign');
        var self = this;
        Meteor.call('answer.getAll', (err, res) => {
            if (err) {
                alert(err);
            } else {
                console.log(res);
            }
        });
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
            bubbles(){
                return Bubble.find();
            },
            energietyp(){
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

    getQuestion(questionId){
        Meteor.call('question.get',{questionId}, (err, res) => {
            if (err) {
                alert(err);
            } else {
                console.log(res);
            }
        })
    }
}
const name = 'profile';
// create a module
export default angular.module(name, [])
    .component(name, {
        templateUrl,
        controller: ['$scope', '$state', Profile]
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