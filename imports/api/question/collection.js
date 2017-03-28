import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Question = new Mongo.Collection('question');

var QuestionSchema = new SimpleSchema({
    question: {
        type: String,
        label: "Frage",
        min: 0,
        max: 1000
    },
    energietypId: {
        type: String,
        label: "Energietyp",
        min:0
    },
    fokusId:{
        type: String,
        label: "Fokus",
        min:0
    },
    clusterId:{
        type: String,
        label: "Cluster",
        min:0
    }

});

Question.attachSchema(QuestionSchema);

Question.allow({
    insert(userId, question) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    },
    update(userId, step, fields, modifier) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    },
    remove(userId, step) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    }
});