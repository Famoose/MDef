import {Meteor} from 'meteor/meteor';
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import login from '../imports/ui/components/login/login';
import impressum from '../imports/ui/components/impressum/impressum';
import nav from '../imports/ui/components/navigation/nav';
import question from '../imports/ui/components/question/question';
import profile from '../imports/ui/components/profile/profile';
import register from '../imports/ui/components/register/register';
import forgotpw from '../imports/ui/components/forgotpw/forgotpw';

import adminQuestion from '../imports/ui/components/admin.question/admin.question';
import adminUsers from '../imports/ui/components/admin.users/admin.users.js';
import adminEvaluation from '../imports/ui/components/admin.evaluation/admin.evaluation.js';

import adminBubble from '../imports/ui/components/admin.bubble/admin.bubble.js';
import adminCluster from '../imports/ui/components/admin.cluster/admin.cluster.js';
import adminFokus from '../imports/ui/components/admin.fokus/admin.fokus.js';
import adminEnergieTyp from '../imports/ui/components/admin.energietyp/admin.energietyp.js';

import answer from "../imports/ui/components/answer/answer.js";

import select from "../imports/ui/components/directive/select.js";

angular.module('pfinder', [
    angularMeteor,
    uiRouter,
    login.name,
    nav.name,
    question.name,
    profile.name,
    register.name,
    forgotpw.name,
    adminQuestion.name,
    adminUsers.name,
    adminEvaluation.name,
    adminBubble.name,
    adminCluster.name,
    adminFokus.name,
    adminEnergieTyp.name,
    answer.name,
    impressum.name,
    select.name

])
function onReady() {
    angular.bootstrap(document, [
        'pfinder'
    ], {
        strictDi: true
    });
}

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
    document.isCordova = true;
} else {
    angular.element(document).ready(onReady);
    document.isCordova = false;
}

function config($locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/login');
}

function run($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
        $('.side-nav').sideNav('hide');
    });
    $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => {
            if (error === 'AUTH_REQUIRED') {
                $state.go('login');
            }
            if(error === 'LOGGED_IN'){
                $state.go('profile');
            }
            if(error === 'ADMIN_REQUIRED'){
                $state.go('profile');
            }
        }
    );
}