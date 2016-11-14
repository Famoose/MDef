import {Meteor} from 'meteor/meteor';
import noUiSlider from 'nouislider';
import '../../../../node_modules/nouislider/distribute/nouislider.min.css'


import templateUrl from './question.html';

class Question {
    constructor($scope) {
        $scope.viewModel(this);

        (function ($) {
            $(function () {
                var slider = document.getElementById("slider");

                noUiSlider.create(slider, {
                    start: 0,
                    direction: 'rtl',
                    connect: [false, true],
                    orientation: 'vertical',
                    range: {
                        'min': 0,
                        'max': 100
                    }
                });
            }); // end of document ready
        })(jQuery); // end of jQuery name space
    }
}

// create a module
export default angular.module('question', [])
    .component('question', {
        templateUrl,
        controller: ['$scope', Question]
    })
    .config(config);

function config($stateProvider) {
    $stateProvider
        .state('question', {
            url: '/question',
            template: '<question style="height: 100%;"></question>',
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