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
            {$project: {
                question: 1,
                answers: {
                    $filter: {
                        input: "$answers",
                        as: "answer",
                        cond: { $eq: [ "$$answer.userId", user ] }
                    }
                },
                fokus: 1,
                bubble: 1,
                cluster: 1,
                energietyp: 1,
                subtract: 1,
                questionPosition: 1,

            }}

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

Meteor.methods({
    'answer.getInstitut'(institutId) {
        var user = Meteor.userId();
        if(Roles.userIsInRole(user, ["admin"], "default-group")){
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
                {$project: {
                    question: 1,
                    answers: {
                        $filter: {
                            input: "$answers",
                            as: "answer",
                            cond: { $eq: [ "$$answer.institutId", institutId.institutId ] }
                        }
                    },
                    fokus: 1,
                    bubble: 1,
                    cluster: 1,
                    energietyp: 1,
                    subtract: 1,
                    questionPosition: 1,

                }}

            ]);
        }
    }
});


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
