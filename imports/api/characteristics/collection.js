import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Characteristics = new Mongo.Collection('characteristics');

var CharacteristicsSchema = new SimpleSchema({
    strength: {
        type: String,
    }
});

Characteristics.attachSchema(CharacteristicsSchema);

Characteristics.allow({
    // insert(userId, step) {
    //     return userId && step.owner === userId;
    // },
    // update(userId, step, fields, modifier) {
    //     return userId && step.owner === userId;
    // },
    // remove(userId, step) {
    //     return userId && step.owner === userId;
    // }
});