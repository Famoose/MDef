import {Meteor} from 'meteor/meteor';

import templateUrl from './admin.html';
import {Categories} from '../../../api/categories/index.js';

class Admin {
    constructor($scope) {
        $scope.viewModel(this);

        this.subscribe('categories');

        this.helpers({
            categories() {
                return Categories.find({}, {
                    sort: {
                        category: 1
                    }
                });
            }
        });
    }

    update(category)
    {
        Categories.update({"_id":category._id},{$set:{"category":category.category}});
    }
    remove(category) {
        Categories.remove(category._id);
    }
    add(category) {
        Categories.insert(category);
    }
}
const name = 'admin';

// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope', Admin]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('admin', {
            url: '/admin',
            template: '<admin></admin>',
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