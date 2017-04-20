import {Meteor} from 'meteor/meteor';

import {Answers} from '../../../api/answer/index.js';
import {Institut} from '../../../api/institut/index.js';
import {Energietyp} from '../../../api/energietyp/index.js';
import {Fokus} from '../../../api/fokus/index.js';
import {Cluster} from '../../../api/cluster/index.js';
import {Bubble} from '../../../api/bubble/index.js';
import {Question} from '../../../api/question/index.js';

import Highcharts from 'highcharts';
import 'highcharts/modules/exporting';

import templateUrl from './profile.html';

class Profile {
    constructor($scope, $state) {
        $scope.viewModel(this);
        this.$state = $state;
        Meteor.subscribe('userWithGroup');
        Meteor.subscribe('answerWithQuestion');
        Meteor.subscribe('questionWithForeign');
        var self = this;
        Meteor.call('answer.getAll', (err, res) => {
            if (err) {
                alert(err);
            } else {
                this.res = res;
            }
        });
        this.helpers({
            currentUser() {
                return Meteor.user();
            },
            group(){
                return Institut.find();
            },
            answers(){
                return Answers.find();
            },
            clusters(){
                return Cluster.find();
            },
            bubbles(){
                return Bubble.find();
            },
            energietyp(){
                return Energietyp.find();
            },
            fokus(){
                return Fokus.find();
            },
            questions(){
                return Question.find();
            }
        });
    }

    getQuestion(questionId){
        Meteor.call('question.get',{questionId}, (err, res) => {
            if (err) {
                alert(err);
            } else {
                console.log(res);
            }
        })
    }

    generateChart(){
        var chart = Highcharts.chart('chart-container', {

            chart: {
                type: 'column'
            },

            title: {
                text: 'Highcharts responsive chart'
            },

            subtitle: {
                text: 'Resize the frame or click buttons to change appearance'
            },

            legend: {
                align: 'right',
                verticalAlign: 'middle',
                layout: 'vertical'
            },

            xAxis: {
                categories: ['Apples', 'Oranges', 'Bananas'],
                labels: {
                    x: -10
                }
            },

            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'Amount'
                }
            },

            series: [{
                name: 'Christmas Eve',
                data: [1, 4, 3]
            }, {
                name: 'Christmas Day before dinner',
                data: [6, 4, 2]
            }, {
                name: 'Christmas Day after dinner',
                data: [8, 4, 3]
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom',
                            layout: 'horizontal'
                        },
                        yAxis: {
                            labels: {
                                align: 'left',
                                x: 0,
                                y: -5
                            },
                            title: {
                                text: null
                            }
                        },
                        subtitle: {
                            text: null
                        },
                        credits: {
                            enabled: false
                        }
                    }
                }]
            }
        });

        $('#small').click(function () {
            chart.setSize(400, 300);
        });

        $('#large').click(function () {
            chart.setSize(600, 300);
        });
    }
}
const name = 'profile';
// create a module
export default angular.module(name, [])
    .component(name, {
        templateUrl,
        controller: ['$scope', '$state', Profile]
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