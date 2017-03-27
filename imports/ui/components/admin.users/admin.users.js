import {Meteor} from 'meteor/meteor';

import templateUrl from './admin.users.html';

import {Answers} from '../../../api/answer/index.js';
import {Questions} from '../../../api/questions/index.js';

class AdminUsers {
    constructor($scope,$state,CategoryUser) {
        $scope.viewModel(this);

        this.$state = $state;
        this.CategoryUser=CategoryUser;

        this.helpers({
            characteristics() {
                return Characteristics.find({}, {
                    sort: {
                        characteristic: 1
                    }
                });
            },
            categories() {
                return Categories.find({}, {
                    sort: {
                        category: 1
                    }
                });
            },
            users(){
                return Meteor.users.find({}, {fields: {emails: 1, profile: 1}})
            }
        });

        var self=this;

        self.colors=["#333","#1e5293","red","blue","yellow"];

        self.categoriesHandler=Meteor.subscribe('categories',generate);
        self.usersHandler=Meteor.subscribe('users',generate);
        self.characteristicsHandler=Meteor.subscribe('characteristics',generate);
        self.answersSubHandler=Meteor.subscribe('answers',generate);
        self.questionsSubHandler=Meteor.subscribe('questions',generate);
        self.questionsCharacteristicsSubHandler=Meteor.subscribe('questionsCharacteristics',generate);

        function generate()
        {
            if(self.categoriesHandler.ready() && self.usersHandler.ready() && self.characteristicsHandler.ready()
                && self.answersSubHandler.ready() && self.questionsSubHandler.ready() && self.questionsCharacteristicsSubHandler.ready())
            {
                var categories=self.categories;
                var characteristics=self.characteristics;
                var users= self.users;

                var labels=[];
                var data = {
                    labels: labels,
                    datasets: []
                };
                for (var i = 0; i < categories.length; i++) {
                    var category = categories[i];
                    var chartData = [];
                    var dataset = {};
                    var dataHolder = self.CategoryUser.generateDataholder();
                    dataset.label = category.category;
                    for (var j = 0; j < characteristics.length; j++) {
                        if (labels.length != characteristics.length) {
                            labels.push(characteristics[j].characteristic);
                        }
                        for (var n = 0; n < users.length; n++) {
                            var user = users[n];
                            self.CategoryUser.get(category, user._id, dataHolder);
                        }
                        if(dataHolder[characteristics[j]._id].factor == 0 && dataHolder[characteristics[j]._id].value ==0)
                        {
                            chartData.push(0);
                        }
                        else
                        {
                            chartData.push((dataHolder[characteristics[j]._id].value / dataHolder[characteristics[j]._id].factor).toFixed(2));
                        }
                    }
                    dataset.data = chartData;
                    dataset.borderWidth = 1;
                    dataset.backgroundColor = self.colors[i];
                    data.datasets.push(dataset);
                }
                new Chart($("#chart-average"), {
                    type: 'bar',
                    data: data,
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    suggestedMax: 10,
                                    suggestedMin: 0,
                                    stepSize: 1
                                }
                            }]
                        }
                    },
                });
            }
        }
    }
    view(user){
        this.$state.go("admin-evaluation",{uid: user._id});
    }
}
const name = 'adminUsers';

// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope','$state','CategoryUser', AdminUsers]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('admin-users', {
            url: '/admin/users',
            template: '<admin-users></admin-users>',
            resolve: {
                error: ['$q', function currentUser($q) {
                    if (Meteor.userId() === null) {
                        return $q.reject('AUTH_REQUIRED');
                    }  else if (!Roles.userIsInRole(Meteor.userId(), ["admin"], "default-group")) {
                        return $q.reject('ADMIN_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }]
            }
        });
}