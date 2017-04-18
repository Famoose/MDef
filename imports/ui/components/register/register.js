import {Meteor} from 'meteor/meteor';

import templateUrl from './register.html';
import {Institut} from '../../../api/institut/index.js';


class Register {

    constructor($scope, $state, $timeout) {
        $scope.viewModel(this);
        this.$state = $state;
        this.genders = ['Weiblich', 'Männlich'];
        this.isCordova = Meteor.isCordova;
        this.credentials = {
            email: '',
            password: '',
            personal: {
                firstname: '',
                lastname: '',
                institutId: '',
                leader: '',
                birth: '',
                job: ''
            }
        };
        self.$timeout=$timeout;
        Meteor.subscribe('institut', this.initSelect);

        this.helpers({
            instituts() {
                return Institut.find();
            }
        });




        $('.datepicker').pickadate({
            monthsFull: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            monthsShort: ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            weekdaysFull: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnertag', 'Freitag', 'Samstag'],
            weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            selectMonths: true,
            selectYears: 120,
            max: new Date(),
            today: "Heute",
            clear: "Löschen",
            close: "Ok"
        });

        $(document).ready(function(){
            $('.modal').modal();
        });

        this.error = '';
        this.initSelect();
    }
    initSelect(){
        self.$timeout(function () {
            $('select').material_select();
        });
    }

    register() {
        Accounts.createUser(this.credentials,
            this.$bindToContext((err) => {
                if (err) {
                    this.error = err;
                    console.log(this.error.error);
                    if (this.error.error === 400) {
                        Materialize.toast("Sie müssen eine gültige Email angeben", 4000);
                    } else if (this.error.error === 403) {
                        Materialize.toast("Email ist bereits vergeben", 4000);
                    } else {
                        Materialize.toast(this.error.reason, 4000);
                    }

                } else {
                    this.$state.go('profile');
                }
            })
        );
    }

    addInstitut(institut){
        this.credentials.personal.institutId = Institut.insert(institut, this.initSelect());
        $('#modal1').modal('close');
        Materialize.toast(institut.institut + " wurde hinzugefügt", 4000);

    }

}
const name = 'register';
// create a module
export default angular.module(name, [])
    .component(name, {
        templateUrl,
        controller: ['$scope', '$state', '$timeout', Register]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('register', {
            url: '/register',
            template: '<register></register>',
            resolve: {
                error: ['$q', function currentUser($q) {
                    if (Meteor.userId() !== null) {
                        return $q.reject('LOGGED_IN');
                    } else {
                        return $q.resolve();
                    }
                }]
            }
        });
}