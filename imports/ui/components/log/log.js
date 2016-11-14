import {Meteor} from 'meteor/meteor';
import {Steps} from '../../../api/steps/index.js';


import templateUrl from './log.html';

class Log {
    constructor($scope) {
        $scope.viewModel(this);
        (function ($) {
            $(function () {
                $('.parallax').parallax();
            }); // end of document ready
        })(jQuery); // end of jQuery name space
    }

    addLog(log) {
        var owner = Meteor.userId();
        Steps.insert({
            strength: log,
            date: new Date,
            owner: owner

        // }, (error) => {
        //     if (error) {
        //         console.log('Oops, unable to insert...');
        //     } else {
        //         console.log('Done!');
        //     }
        });
        this.log = null;
    }


}

// create a module
export default angular.module('log', [])
    .component('log', {
        templateUrl,
        controller: ['$scope', Log]
    })
    .config(config);

function config($stateProvider) {
    $stateProvider
        .state('log', {
            url: '/log',
            template: '<log></log>',
            resolve: {
                currentUser($q) {
                    if (Meteor.userId() === null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        });
}