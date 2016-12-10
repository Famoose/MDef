import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Answers = new Mongo.Collection('answers');

var AnswersSchema = new SimpleSchema({
        userId: {
            type: String,
            label: "User Id"
        },
        questionId: {
            type: String,
            label: "Frage Id"
        },
        answer: {
            type: Number,
            label: "Antwort",
            min: 0,
            max: 10
        }
    });

Answers.attachSchema(AnswersSchema);

Answers.allow({
    insert(userId, answer) {
        return true;
    },
    update(userId, answer) {
        return true;
    },
    remove(userId, answer) {
        return true;
    }
});