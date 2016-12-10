import {Meteor} from 'meteor/meteor';

import templateUrl from './admin.question.html';
import {Questions} from '../../../api/questions/index.js';

class AdminQuestion {
    constructor($scope,$state) {
        $scope.viewModel(this);

        this.subscribe('questions');
        this.$state=$state;
        this.helpers({
            questions() {
                return Questions.find({ "categoryId":  this.$state.params.catId}, {
                    sort: {
                        questionIndex: 1
                    }
                });
            }
        });
    }

    update(question)
    {
        Questions.update({"_id":question._id},question);
    }
    updateIndex(question)
    {
        Questions.update({"_id":question._id},{$set:{"questionIndex":question.questionIndex}})
        this.sort();
    }
    remove(question) {
        Questions.remove(question._id);
        this.sort();

    }
    add(question) {
        question.categoryId=this.$state.params.catId;
        Questions.insert(question);
        this.sort();
    }
    view(question)
    {
        this.$state.go("admin-question-details",{questionId:question._id})
    }
    sort()
    {
        for(var i=0; i<this.questions.length; i++)
        {
            var tmpQuestion= this.questions[i];
            tmpQuestion.questionIndex=i+1;
            Questions.update({"_id":tmpQuestion._id},{$set:{"questionIndex":tmpQuestion.questionIndex}});
        }
        function arrayMin(arr) {
            return arr.reduce(function (p, v) {
                return ( p.questionIndex < v.questionIndex ? p : v );
            });
        }
    }
}
const name = 'adminQuestion';

// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope','$state', AdminQuestion]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('admin-question', {
            url: '/admin/question/:catId',
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