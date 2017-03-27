import {Meteor} from 'meteor/meteor';

import templateUrl from './chooseCategory.html';
import {Game} from '../../../../api/game/index.js';

class ChooseCategory {
    constructor($scope,$state) {
        $scope.viewModel(this);

        this.subscribe('game');
        this.subscribe('categories');

        this.$state=$state;
        this.helpers({
            categories() {
                return Categories.find({}, {
                    sort: {
                        category: 1
                    }
                });
            }
        });
    }
    setCategory(category)
    {
        Game.insert({userId:Meteor.userId(),categoryId: category._id,questionIndex:1,isPlaying:true});
        this.$state.go("answer-question");
    }
}
const name = 'playChooseCategory';

// create a module
export default angular.module(name, [
    ])
    .component(name, {
        templateUrl,
        controller: ['$scope','$state', ChooseCategory]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('choose-category', {
            url: '/choose-category',
            template: '<play-choose-category></play-choose-category>',
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