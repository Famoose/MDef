import {Meteor} from 'meteor/meteor';

import templateUrl from './admin.question.details.html';
import noUiSlider from 'nouislider';
import {Characteristics} from  '../../../api/characteristics/index.js';
import {QuestionsCharacteristics} from '../../../api/questions-characteristcs/index.js';
import {Questions} from '../../../api/questions/index.js';
import {Template} from 'meteor/templating';

class AdminQuestionDetails {
    constructor($scope, $state, $timeout) {
        $scope.viewModel(this);

        Meteor.subscribe('characteristics');
        Meteor.subscribe('questions');
        Meteor.subscribe('questionsCharacteristics');

        this.$state = $state;
        this.$timeout = $timeout;

        this.helpers({
            questionsCharacteristics(){
                return QuestionsCharacteristics.find({questionId: this.$state.params.questionId}, {
                    sort: {
                        characteristicId: 1
                    }
                });
            }
        });

    }

    getCharacteristic(characteristicId) {
        return Characteristics.findOne({_id: characteristicId}).characteristic;
    }

    updateInfluenceValue(questionsCharacteristic) {
        QuestionsCharacteristics.update({_id: questionsCharacteristic._id}, {$set: {"influence": questionsCharacteristic.influence}});
    }

    back() {
        var question = Questions.findOne({_id: this.$state.params.questionId});

        this.$state.go('admin-question', {catId: question.categoryId});
    }
}
const name = 'adminQuestionDetails';

// create a module
export default angular.module(name, [])
    .component(name, {
        templateUrl,
        controller: ['$scope', '$state', '$timeout', AdminQuestionDetails]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('admin-question-details', {
            url: '/admin/question/details/:questionId',
            template: '<admin-question-details></admin-question-details>',
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