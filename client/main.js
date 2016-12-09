import {Meteor} from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import home from '../imports/ui/components/home/home';
import login from '../imports/ui/components/login/login';
import nav from '../imports/ui/components/navigation/nav';
import log from '../imports/ui/components/log/log';
import question from '../imports/ui/components/question/question';
import profile from '../imports/ui/components/profile/profile';
import register from '../imports/ui/components/register/register';
import adminCategory from '../imports/ui/components/admin.category/admin.category';
import adminQuestion from '../imports/ui/components/admin.question/admin.question';

angular.module('pfinder', [
    angularMeteor,
    uiRouter,
    home.name,
    login.name,
    nav.name,
    log.name,
    question.name,
    profile.name,
    register.name,
    adminCategory.name,
    adminQuestion.name
]).config(['$locationProvider', '$urlRouterProvider',config]).run(['$rootScope', '$state',run]);

function onReady() {
    angular.bootstrap(document, [
        'pfinder'
    ], {
        strictDi: true
    });
}

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}

function config($locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/login');
}

function run($rootScope, $state) {
    $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => {
            if (error === 'AUTH_REQUIRED') {
                $state.go('login');
            }
            if(error === 'LOGGED_IN'){
                $state.go('home');
            }
        }
    );
}