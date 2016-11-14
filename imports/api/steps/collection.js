import { Mongo } from 'meteor/mongo';

export const Steps = new Mongo.Collection('steps');

Steps.allow({
    insert(userId, strength, date, owner) {
        return userId && owner === userId;
    },
    update(userId, strength, date, owner, fields, modifier) {
        return userId && owner === userId;
    },
    remove(userId, strength, date, owner,) {
        return userId && owner === userId;
    }
});