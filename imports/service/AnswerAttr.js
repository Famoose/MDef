import {Meteor} from 'meteor/meteor';
import {Answers} from '../api/answer/index.js';
import {Question} from '../api/question/index.js';

Meteor.methods({
    'answer.getAll'() {
        var user = Meteor.userId();
        return Question.aggregate([
            {
                $lookup: {
                    from: "answers",
                    localField: "_id",
                    foreignField: "questionId",
                    as: "answers"
                }
            }, {
                $lookup: {
                    from: "fokus",
                    localField: "fokusId",
                    foreignField: "_id",
                    as: "fokus"
                }
            }, {
                $lookup: {
                    from: "bubble",
                    localField: "clusterId",
                    foreignField: "clusterId",
                    as: "bubble"
                }
            }, {
                $lookup: {
                    from: "cluster",
                    localField: "clusterId",
                    foreignField: "_id",
                    as: "cluster"
                }
            }, {
                $lookup: {
                    from: "energietyp",
                    localField: "energietypId",
                    foreignField: "_id",
                    as: "energietyp"
                }
            },
            {$match: {"answers.userId": user}}

        ]);
    }
});

Meteor.methods({
    'question.get'(questionId) {
        return Question.aggregate([
            {
                $lookup: {
                    from: "fokus",
                    localField: "fokusId",
                    foreignField: "_id",
                    as: "fokus"
                }
            }, {
                $lookup: {
                    from: "bubble",
                    localField: "clusterId",
                    foreignField: "clusterId",
                    as: "bubble"
                }
            }, {
                $lookup: {
                    from: "cluster",
                    localField: "clusterId",
                    foreignField: "_id",
                    as: "cluster"
                }
            }, {
                $lookup: {
                    from: "energietyp",
                    localField: "energietypId",
                    foreignField: "_id",
                    as: "energietyp"
                }
            },
            {$match: {_id: questionId}}
        ]);
    }
});

/*export function CategoryUser(){
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
 }*/

export function AnswerAttr() {
    return {
        get: function () {
            return Answers.aggregate([
                {
                    $lookup: {
                        from: "question",
                        localField: "questionId",
                        foreignField: "_id",
                        as: "question"
                    }
                }
            ]);
        }
    }
}
