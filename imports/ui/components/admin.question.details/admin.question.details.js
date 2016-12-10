import {Meteor} from 'meteor/meteor';

import templateUrl from './admin.question.details.html';
import {Questions} from '../../../api/questions/index.js';
import {Characteristics} from  '../../../api/characteristics/index.js';

class AdminQuestionDetails {
    constructor($scope,$state) {
        $scope.viewModel(this);

        this.subscribe('questions');
        this.$state=$state;
        this.helpers({
            question() {
                return Questions.find({ "_id":  this.$state.params.questionId}, {});
            },
            characteristics(){
                return Characteristics.find({},{
                    sort:{
                        characteristic: 1
                    }
                })
            }
        });
    }
}
const name = 'adminQuestionDetails';

// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope','$state', AdminQuestionDetails]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('admin-question-details', {
            url: '/admin/question/details/:questionId',
            template: '<admin-question></admin-question>',
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