import {Meteor} from 'meteor/meteor';
import {Categories} from '../../../api/categories/index.js';
import {Answers} from '../../../api/answer/index.js';
import {QuestionsCharacteristics} from '../../../api/questions-characteristcs/index.js';
import {Questions} from '../../../api/questions/index.js';
import {Characteristics} from '../../../api/characteristics/index.js';

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

        self.characteristicsSubHandler=Meteor.subscribe('characteristics',generate);
        self.categoriesSubHandler=Meteor.subscribe('categories',generate);
        self.answersSubHandler=Meteor.subscribe('answers',generate);
        self.questionsSubHandler=Meteor.subscribe('questions',generate);
        self.questionsCharacteristicsSubHandler=Meteor.subscribe('questionsCharacteristics',generate);

        function generate()
        {
            self.generateRadar(self);
        }
    }

    generateRadar(self,category) {
        if (self.categoriesSubHandler.ready() && self.answersSubHandler.ready() && self.questionsSubHandler.ready()
            && self.questionsCharacteristicsSubHandler.ready() && self.characteristicsSubHandler.ready()) {

            var labels = [];
            var characteristics = this.characteristics;

            var dataHolder={};

            if (category === undefined || !category) {
                category = Categories.findOne();
            }
            if (category !== undefined || !category) {
                for (var x = 0; x < characteristics.length; x++) {
                    labels.push(characteristics[x].characteristic);
                    dataHolder[characteristics[x]._id] = {factor: 0, value: 0};
                }
                var questions = Questions.find({categoryId: category._id}).fetch();
                for (var i = 0; i < questions.length; i++) {
                    var question = questions[i];

                    var answers = Answers.find({questionId: question._id, userId: Meteor.userId()}).fetch();


                    for (var u = 0; u < answers.length; u++) {
                        var answer = answers[u];
                        for (var x = 0; x < characteristics.length; x++) {
                            var questionCharacteristic = QuestionsCharacteristics.findOne({questionId: question._id, characteristicId: characteristics[x]._id});
                            console.log("Characteristic:" + characteristics[x].characteristic + " -> Question:" + question.question + " -> Einfluss " + questionCharacteristic.influence +
                                " -> Answer: " + answer.answer);
                            dataHolder[questionCharacteristic.characteristicId].factor += questionCharacteristic.influence / 100;
                            dataHolder[questionCharacteristic.characteristicId].value += (answer.answer * questionCharacteristic.influence) / 100;
                        }
                    }
                }
                var datasets = [];
                var dataset = {
                    label: category.category,
                    backgroundColor: "rgba(179,181,198,0.2)",
                    borderColor: "rgba(179,181,198,1)",
                    pointBackgroundColor: "rgba(179,181,198,1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(179,181,198,1)",
                };
                dataset.data = [];
                for (var i = 0; i < characteristics.length; i++) {
                    dataset.data.push(dataHolder[characteristics[i]._id].value / dataHolder[characteristics[i]._id].factor);
                }
                datasets.push(dataset);
                (function ($) {
                    $(function () {
                        Chart.defaults.global.legend.display = false;
                        Chart.defaults.global.defaultFontSize = 10;
                        var ctx = $("#chart");
                        var chart = new Chart(ctx, {
                            type: 'radar',
                            data: {
                                labels: labels,
                                datasets: datasets
                            },
                            options: {
                                maintainAspectRatio: false,
                                scale: {
                                    ticks: {
                                        beginAtZero: true,
                                        suggestedMax: 10,
                                        suggestedMin: 0,
                                        stepSize: 1
                                    }
                                },
                                showXAxisLabel: false,
                                showYAxisLabel: false
                            }
                        });
                    }); // end of document ready
                })(jQuery); // end of jQuery name space
            }
        }
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