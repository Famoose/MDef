import {Meteor} from 'meteor/meteor';

import templateUrl from './admin.evaluation.html';
import {Categories} from '../../../api/categories/index.js';

class AdminEvaluation {
    constructor($scope,$state,CategoryUser) {
        $scope.viewModel(this);

        this.$state = $state;

        var self=this;

        var categoriesHandler=self.Meteor.subscribe('categories',generate());
        var usersHandler=self.Meteor.subscribe('users',generate());

        this.helpers({
            categories() {
                return Categories.find({}, {
                    sort: {
                        category: 1
                    }
                });
            },
            user(){
                return Meteor.users.findOne({_id: self.$state.params.uid}, {fields: {emails: 1, profile: 1}})
            }
        });


        function generate()
        {
            if(categoriesHandler.ready() && usersHandler.ready())
            {
                var data = {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [
                        {
                            label: "My First dataset",
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1,
                            data: [65, 59, 80, 81, 56, 55, 40],
                        }
                    ]
                };
                var ctx=
                var myBarChart = new Chart(ctx, {
                    type: 'bar',
                    data: data,
                    options: []
                });
            }
        }
    }
}
const name = 'adminEvaluation';

// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope','$state','CategoryUser', AdminEvaluation]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('admin-evaluation', {
            url: '/admin/users/evaluation/:uid',
            template: '<admin-evaluation></admin-evaluation>',
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