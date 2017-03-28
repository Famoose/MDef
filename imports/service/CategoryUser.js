import {Meteor} from 'meteor/meteor';
import {Answers} from '../api/answer/index.js';
import {Questions} from '../api/question/index.js';



export function CategoryUser(){
    return {
        get: function(category,userId,dataHolder){
            if(category !== undefined && category) {
                var characteristics = Characteristics.find({},{sort:{characteristic: 1}}).fetch();
                var questions = Questions.find({categoryId: category._id}).fetch();
                for (var i = 0; i < questions.length; i++) {
                    var question = questions[i];
                    var answers = Answers.find({questionId: question._id, userId: userId}).fetch();


                    for (var u = 0; u < answers.length; u++) {
                        var answer = answers[u];
                        for (var x = 0; x < characteristics.length; x++) {
                            var questionCharacteristic = QuestionsCharacteristics.findOne({
                                questionId: question._id,
                                characteristicId: characteristics[x]._id
                            });
                            dataHolder[questionCharacteristic.characteristicId].factor += questionCharacteristic.influence / 100;
                            dataHolder[questionCharacteristic.characteristicId].value += (answer.answer * questionCharacteristic.influence) / 100;
                        }
                    }
                }
            }
        },
        generateDataholder:function(){
            var dataHolder = {};
            var characteristics = Characteristics.find({},{sort:{characteristic: 1}}).fetch();
            for (var x = 0; x < characteristics.length; x++) {
                dataHolder[characteristics[x]._id] = {factor: 0, value: 0};
            }
            return dataHolder;
        }
    }
}