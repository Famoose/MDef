import {Meteor} from 'meteor/meteor';

import templateUrl from './admin.category.html';
import {Categories} from '../../../api/categories/index.js';

class AdminCategory {
    constructor($scope,$state) {
        $scope.viewModel(this);

        this.subscribe('categories');
        this.$state = $state;
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
    view(category){
        this.$state.go('admin-question',{catId:category._id});
    }
}
const name = 'adminCategory';

// create a module
export default angular.module(name, [
])
    .component(name, {
        templateUrl,
        controller: ['$scope','$state', AdminCategory]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('admin-category', {
            url: '/admin/category',
            template: '<admin-category></admin-category>',
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