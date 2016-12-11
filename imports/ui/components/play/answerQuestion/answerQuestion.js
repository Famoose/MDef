import {Meteor} from 'meteor/meteor';

import noUiSlider from "nouislider";
import templateUrl from './answerQuestion.html';
import {Game} from '../../../../api/game/index.js';
import {Questions} from '../../../../api/questions/index.js';
import {Answers} from '../../../../api/answer/index.js';

class AnswerQuestion {
    constructor($scope,$state,$timeout) {
        $scope.viewModel(this);
        var self=this;

        var gameSubHandler=Meteor.subscribe('game',init);
        var questionSubHandler=Meteor.subscribe('questions',init);
        Meteor.subscribe('answers',init);

        function init(){
            if(gameSubHandler.ready() && questionSubHandler.ready())
            {
                var game=Game.findOne({'userId': Meteor.userId(), 'isPlaying': true});
                var question =Questions.findOne({'categoryId':game.categoryId, 'questionIndex':game.questionIndex});

                self.initSlider(question.question,function (value)
                {
                    var sumOfQuestions=Questions.find({categoryId:game.categoryId}).fetch().length;

                    Answers.insert({userId:Meteor.userId(),questionId: question._id,answer:parseInt(value)});
                    if(game.questionIndex==sumOfQuestions)
                    {
                        Game.update({_id:game._id},{$set:{isPlaying: false}});
                        $state.go("profile");
                    }
                    else {
                        Game.update({_id:game._id},{$set:{questionIndex: game.questionIndex+1}});
                        init();
                    }
                });
            }
        }

        this.$state=$state;
    }
    initSlider(question,callback)
    {
        var slider = document.getElementById("slider");
        if(slider.noUiSlider===undefined) {
            noUiSlider.create(slider, {
                start: 0,
                direction: 'rtl',
                connect: [false, true],
                orientation: 'vertical',
                range: {
                    'min': 0,
                    'max': 10
                }
            });
        }
        else
        {
            slider.noUiSlider.reset();
        }
        slider.noUiSlider.on('change', function(){
            callback(slider.noUiSlider.get());
        });
        $(slider).css("height",window.screen.height - window.screen.height/12 - $("nav").height() -100);
        window.addEventListener('resize', function() {
            $(slider).css("height", window.screen.height -window.screen.height/12 - $("nav").height() -100);
        }, true);
        var title=$('#slider').find('.noUi-connect').find("h5");
        if(title===undefined || !title.length)
        {
            $('#slider').find('.noUi-connect').append("<h5 style='padding:10px'>"+question+"</h5>");
        }
        else
        {
            title.text(question);
        }
    }
}
const name = 'playAnswerQuestion';

// create a module
export default angular.module(name, [
    ])
    .component(name, {
        templateUrl,
        controller: ['$scope','$state','$timeout', AnswerQuestion]
    })
    .config(['$stateProvider', config]);

function config($stateProvider) {
    $stateProvider
        .state('answer-question', {
            url: '/answer-question',
            template: '<play-answer-question></play-answer-question>',
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