import {Meteor} from 'meteor/meteor';
import templateUrl from './home.html';
import {Steps} from '../../../api/steps/index.js';

class Home {
    constructor($scope) {
        $scope.viewModel(this);
        (function ($) {
            $(function () {
                $('.parallax').parallax();
            }); // end of document ready
        })(jQuery); // end of jQuery name space
        this.helpers({
            steps() {
                return Steps.find({},{
                    sort: {
                        date: -1
                    }
                });
            }
        });
        $scope.authenticated = Meteor.userId() !== null;
    }
    removeLog(log) {
        Steps.remove(log._id);
    }
}

// create a module
export default angular.module('home', [
])
    .component('home', {
        templateUrl,
        controller: ['$scope', Home]
    })
    .config(config);

function config($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            template: '<home></home>'
        });
}