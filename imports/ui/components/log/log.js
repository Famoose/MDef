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
        Steps.insert({
            strength: log,
            date: new Date,
            owner: Meteor.userId()

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
const name = 'log';
// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope', Log]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('log', {
            url: '/log',
            template: '<log></log>',
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