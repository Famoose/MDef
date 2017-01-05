import {Meteor} from 'meteor/meteor';

import noUiSlider from "nouislider";
import templateUrl from './answerQuestion.html';
import {Game} from '../../../../api/game/index.js';
import {Questions} from '../../../../api/questions/index.js';
import {Answers} from '../../../../api/answer/index.js';

class AnswerQuestion {
    constructor($scope,$state) {
        $scope.viewModel(this);
        var self=this;

        var gameSubHandler=Meteor.subscribe('game',init);
        var questionSubHandler=Meteor.subscribe('questions',init);
        var answersSubHandler=Meteor.subscribe('answers',init);

        function init(){
            if(gameSubHandler.ready() && questionSubHandler.ready() && answersSubHandler.ready())
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
                        $state.go("profile",{catId:game.categoryId});
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
        slider.innerHTML="";
        slider.noUiSlider=undefined;

        if(slider.noUiSlider===undefined) {
            noUiSlider.create(slider, {
                start: 5,
                direction: 'rtl',
                connect: [false, true],
                orientation: 'vertical',
                behaviour: 'drag',
                range: {
                    'min': 0,
                    'max': 10
                }
            });
            slider.noUiSlider.on('change', function(){
                callback(slider.noUiSlider.get());
            });
            slider.noUiSlider.on('start',function(){
                $(".arrow-up").remove();
                $('.arrow-down').remove();
                changeQuestionValue();
            });
            slider.noUiSlider.on('slide',function(){
                changeQuestionValue();
            });
            $(slider).css("height",window.screen.height - window.screen.height/12 - $("nav").height() -100);
            window.addEventListener('resize', function() {
                $(slider).css("height", window.screen.height -window.screen.height/12 - $("nav").height() -100);
            }, true);
        }
        var title=$('#slider').find('.noUi-connect').find("h5");
        if(title===undefined || !title.length)
        {
            $("#slider").find('.noUi-base').append("<h5 class='question-value'></h5>")
            $('#slider').find('.noUi-connect').append("<h5 style='padding:10px' class='questionHeader'>"+question+"</h5>");

        }
        else
        {
            title.text(question);
        }
        $('#slider').find('.noUi-base').append("<i class='arrow-up material-icons'>keyboard_arrow_up</i>");
        $('#slider').find('.noUi-base').append("<i class='arrow-down material-icons'>keyboard_arrow_down</i>");

        function changeQuestionValue(){
            var slider=document.getElementById("slider");
            var value=slider.noUiSlider.get();

            if(value <= 2)
            {
                $(".question-value").text("Trifft nicht zu");
            }
            else if(value <=4)
            {
                $(".question-value").text("Trifft weniger zu");
            }
            else if(value <= 6)
            {
                $(".question-value").text("Trifft manchmal zu");
            }
            else if(value <=8){
                $(".question-value").text("Trifft zu");
            }
            else if(value <=10)
            {
                $(".question-value").text("Trifft genau zu");
            }
            if(value >=5)
            {
                $(".question-value").css("color","#fff");
            }
            else
            {
                $(".question-value").css("color","#000");
            }
        }
    }
}
const name = 'playAnswerQuestion';

// create a module
export default angular.module(name, [
    ])
    .component(name, {
        templateUrl,
        controller: ['$scope','$state', AnswerQuestion]
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