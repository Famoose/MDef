import {Meteor} from 'meteor/meteor';
import {Characteristics} from '../../../api/characteristics/index.js';
import {Categories} from '../../../api/categories/index.js';
import Chart from "chart.js";
import templateUrl from './profile.html';

class Profile {
    constructor($scope) {
        $scope.viewModel(this);

        var self=this;

        this.helpers({
            characteristics() {
                return Characteristics.find({}, {
                    sort: {
                        characteristic: 1
                    }
                });
            },
            categories(){
                return Categories.find({},{
                    sort:{
                        category:1
                    }
                })
            }
        });

        Meteor.subscribe('categories');
        Meteor.subscribe('characteristics', function(){
            self.generateRadar();
        });

    }

    generateRadar(){
        var labels=[];
        var characteristics=this.characteristics;
        for(var i=0; i<characteristics.length; i++)
        {
            labels.push(characteristics[i].characteristic);
        }
        (function ($) {
            $(function () {
                Chart.defaults.global.legend.display = false;
                Chart.defaults.global.defaultFontSize=10;
                var ctx = $("#chart");
                var chart=new Chart(ctx,{
                    type: 'radar',
                    data: {
                        labels: labels,
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
                                stepSize:1
                            }
                        },
                        showXAxisLabel:false,
                        showYAxisLabel:false
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