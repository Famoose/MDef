import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Questions = new Mongo.Collection('questions');

var QuestionsSchema = new SimpleSchema({
    question: {
        type: String,
        label: "Frage",
        min: 0,
        max: 100
    },
    questionIndex: {
        type: Number,
        label: "Frageposition",
        min:0
    },
    categoryId:{
        type: String,
        label: "Fragekataloge",
    }
});

Questions.attachSchema(QuestionsSchema);

Questions.allow({
    insert(userId, question) {
        return true;
    },
    update(userId, step, fields, modifier) {
        return true;
    },
    remove(userId, step) {
        return true;
    }
});