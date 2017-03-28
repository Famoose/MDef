import {Meteor} from 'meteor/meteor';
import {Answers} from '../../../api/answer/index.js';
import {Questions} from '../../../api/question/index.js';

import Chart from "chart.js";
import templateUrl from './profile.html';

class Profile {
    constructor($scope, $state, CategoryUser) {
    }
}
const name = 'profile';
// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope','$state','CategoryUser',Profile]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('profile', {
            url: '/profile/:catId',
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