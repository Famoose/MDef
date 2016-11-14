import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Steps = new Mongo.Collection('steps');

var StepSchema = new SimpleSchema({
    strength: {
        type: Number,
        label: "Strength",
        min:0,
        max:100
    },
    date: {
        type: Date
    },
    owner:{
        type: String
    }
});

Steps.attachSchema(StepSchema);

Steps.allow({
    insert(userId, step) {
        return userId && step.owner === userId;
    },
    update(userId, step, fields, modifier) {
        return userId && step.owner === userId;
    },
    remove(userId, step) {
        return userId && step.owner === userId;
    }
});