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
                return Questions.find({}, {
                    sort: {
                        question: 1
                    }
                });
            },
            characteristics(){
                return Characteristics.find({},{
                    sort:{
                        characteristic:1
                    }
                })
            }
        });
    }

    update(question)
    {
        Questions.update({"_id":question._id},{$set:{"question":question.question}});
    }

    remove(question) {
        Questions.remove(question._id);
        this.sort();

    }
    add(question) {

        var questionId= Questions.insert(question);

        // for(var i=0; i<this.characteristics.length; i++)
        // {
        //     var characteristicId=this.characteristics[i]._id;
        //     QuestionsCharacteristics.insert({characteristicId: characteristicId, questionId: questionId, influence: 0});
        // }

        this.newQuestion = null;
    }
    view(question)
    {
        this.$state.go("admin-question-details",{questionId:question._id})
    }
    back()
    {
        this.$state.go("admin-category");
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
                    } else if (!Roles.userIsInRole(Meteor.userId(), ["admin"], "default-group")) {
                        return $q.reject('ADMIN_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }]
            }
        });
}