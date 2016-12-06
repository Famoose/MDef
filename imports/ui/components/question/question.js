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

                slider.noUiSlider.on('change', function(){
                    console.log(slider.noUiSlider.get());
                });

                $(slider).css("height",window.screen.height - window.screen.height/12 - $("nav").height() -100);
                window.addEventListener('resize', function() {
                    $(slider).css("height", window.screen.height -window.screen.height/12 - $("nav").height() -100);
                }, true);
            }); // end of document ready
        })(jQuery); // end of jQuery name space
    }
}
const name = 'question';
// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope',Question]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('question', {
            url: '/question',
            template: '<question ng-class="container"></question>',
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