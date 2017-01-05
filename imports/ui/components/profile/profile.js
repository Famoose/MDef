import {Meteor} from 'meteor/meteor';
import {Categories} from '../../../api/categories/index.js';
import {Answers} from '../../../api/answer/index.js';
import {QuestionsCharacteristics} from '../../../api/questions-characteristcs/index.js';
import {Questions} from '../../../api/questions/index.js';
import {Characteristics} from '../../../api/characteristics/index.js';

import Chart from "chart.js";
import templateUrl from './profile.html';

class Profile {
    constructor($scope, $state, CategoryUser) {

        $scope.viewModel(this);
        this.CategoryUser=CategoryUser;
        this.$state=$state;


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
        self.categoriesSubHandler=Meteor.subscribe('categories',setCategory);
        self.answersSubHandler=Meteor.subscribe('answers',generate);
        self.questionsSubHandler=Meteor.subscribe('questions',generate);
        self.questionsCharacteristicsSubHandler=Meteor.subscribe('questionsCharacteristics',generate);

        function setCategory()
        {
            if("" !== self.$state.params.catId){
                var category=Categories.findOne({"_id": self.$state.params.catId});
                $scope.$apply(function() {
                    self.activeCategory = category;
                });
            }else{
                $scope.$apply(function(){
                    self.activeCategory = self.categories[0];
                });
            }
            self.generateRadar(self);
        }
        function generate()
        {
            self.generateRadar(self);
        }
    }

    generateRadar(self,category) {
        if (self.categoriesSubHandler.ready() && self.answersSubHandler.ready() && self.questionsSubHandler.ready()
            && self.questionsCharacteristicsSubHandler.ready() && self.characteristicsSubHandler.ready()) {

            $('.collapsible').collapsible();
            var labels = [];
            var characteristics = this.characteristics;

            if (category === undefined || !category) {
                category = self.activeCategory;
            }
            if (category !== undefined || !category) {
                var dataHolder= self.CategoryUser.generateDataholder();
                self.CategoryUser.get(category,Meteor.userId(),dataHolder);
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
                    labels.push(characteristics[i].characteristic);
                    dataset.data.push((dataHolder[characteristics[i]._id].value / dataHolder[characteristics[i]._id].factor).toFixed(2));
                }
                datasets.push(dataset);

                Chart.defaults.global.legend.display = false;
                Chart.defaults.global.defaultFontSize = 10;

                var ctx = $("#chart");
                if(self.chart===undefined)
                {
                    create();
                }
                else
                {
                    self.chart.destroy();
                    create();
                }
                function create(){
                    self.chart = new Chart(ctx, {
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
                }
            }
        }
    }
    setCategory(category)
    {
        var self=this;
        self.generateRadar(self,category);
        self.activeCategory = category;
    }
    isActive(category)
    {
        var self=this;
        if(self.activeCategory!==undefined)
        {
            return self.activeCategory._id === category._id;
        }
        return false;
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