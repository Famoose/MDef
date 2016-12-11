import {Meteor} from 'meteor/meteor';

import {Game} from '../../../api/game/index.js';

class Play {
    constructor($state) {
        var self=this;
        this.$state=$state;

        if(Game.findOne({},{}) === undefined)
        {
            Meteor.subscribe('game', init);
        }
        else {
            init();
        }

        function init()
        {
            var uid=Meteor.userId();
            var game = Game.findOne({isPlaying:true, userId: uid});

            if(game === undefined)
            {
                self.$state.go("choose-category");
            }
            else
            {
                self.$state.go("answer-question");
            }
        }
    }
}
const name = 'play';
// create a module
export default angular.module(name, [
    ]).component(name,{
        controller: ['$state', Play]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('play', {
            url: '/play',
            template: '<play></play>',
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