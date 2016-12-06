import {Meteor} from 'meteor/meteor';
import Chart from "chart.js";

import templateUrl from './profile.html';

class Profile {
    constructor($scope) {
        $scope.viewModel(this);

        (function ($) {
            $(function () {
                Chart.defaults.global.defaultFontSize=16;
                var ctx = $("#chart");
                var chart=new Chart(ctx,{
                    type: 'radar',
                    data: {
                        labels: ["Durchsetzungsstark", "Zuverlässig", "Kooperativ", "Eigeninitiativ", "Sensitiv", "Zurückhaltend"],
                        datasets: [
                            {
                                label: "Gesamt",
                                backgroundColor: "rgba(179,181,198,0.2)",
                                borderColor: "rgba(179,181,198,1)",
                                pointBackgroundColor: "rgba(179,181,198,1)",
                                pointBorderColor: "#fff",
                                pointHoverBackgroundColor: "#fff",
                                pointHoverBorderColor: "rgba(179,181,198,1)",
                                data: [0, 1, 2, 3, 4, 5]
                            },
                        ]
                    },
                    options:{
                        maintainAspectRatio: false,
                        scale: {
                            ticks: {
                                beginAtZero: true,
                                suggestedMax:10,
                                suggestedMin:0,
                                stepSize:1,
                            }
                        }
                    }
                });
            }); // end of document ready
        })(jQuery); // end of jQuery name space
    }
}
const name = 'profile';
// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope', Profile]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('profile', {
            url: '/profile',
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