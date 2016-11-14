import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import home from '../imports/ui/components/home/home';
import login from '../imports/ui/components/login/login';
import nav from '../imports/ui/components/navigation/nav';
import log from '../imports/ui/components/log/log';
import question from '../imports/ui/components/question/question';


angular.module('mDef', [
    angularMeteor,
    uiRouter,
    home.name,
    login.name,
    nav.name,
    log.name,
    question.name
]).config(config).run(run);

function config($locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');
}

function run($rootScope, $state) {

    $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => {
            if (error === 'AUTH_REQUIRED') {
                $state.go('home');
            }
        }
    );
}