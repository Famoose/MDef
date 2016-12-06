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
        type: Number,
        label: "Fragekataloge",
        min:0
    }
});

Questions.attachSchema(QuestionsSchema);

/*Questions.allow({
    /*insert(userId, step) {
        return userId === userId;
    },
    update(userId, step, fields, modifier) {
        return userId && step.owner === userId;
    },
    remove(userId, step) {
        return userId && step.owner === userId;
    }
});*/