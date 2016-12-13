import {Meteor} from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import login from '../imports/ui/components/login/login';
import nav from '../imports/ui/components/navigation/nav';
import question from '../imports/ui/components/question/question';
import profile from '../imports/ui/components/profile/profile';
import register from '../imports/ui/components/register/register';
import forgotpw from '../imports/ui/components/forgotpw/forgotpw';
import adminCharacteristic from '../imports/ui/components/admin.characteristic/admin.characteristic';
import adminCategory from '../imports/ui/components/admin.category/admin.category';
import adminQuestion from '../imports/ui/components/admin.question/admin.question';
import adminQuestionDetails from '../imports/ui/components/admin.question.details/admin.question.details';
import adminUsers from '../imports/ui/components/admin.users/admin.users.js';
import adminEvaluation from '../imports/ui/components/admin.evaluation/admin.evaluation.js';
import play from "../imports/ui/components/play/play.js";
import playChooseCategory from "../imports/ui/components/play/chooseCategory/chooseCategory.js";
import playAnswerQuestion from "../imports/ui/components/play/answerQuestion/answerQuestion.js";

import {CategoryUser} from "../imports/service/CategoryUser.js";

angular.module('pfinder', [
    angularMeteor,
    uiRouter,
    login.name,
    nav.name,
    question.name,
    profile.name,
    register.name,
    forgotpw.name,
    adminCharacteristic.name,
    adminCategory.name,
    adminQuestion.name,
    adminQuestionDetails.name,
    adminUsers.name,
    adminEvaluation.name,
    play.name,
    playChooseCategory.name,
    playAnswerQuestion.name

]).service("CategoryUser",CategoryUser)
    .config(['$locationProvider', '$urlRouterProvider',config]).run(['$rootScope', '$state',run]);

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
                $state.go('profile');
            }
        }
    );
}