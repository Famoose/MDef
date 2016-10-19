import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import home from '../imports/ui/components/home/home';
import login from '../imports/ui/components/login/login';
import nav from '../imports/ui/components/navigation/nav';


angular.module('mDef', [
    angularMeteor,
    uiRouter,
    home.name,
    login.name,
    nav.name
]).config(config);

function config($locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');
}