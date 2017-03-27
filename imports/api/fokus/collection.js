import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Fokus = new Mongo.Collection('fokus');

var FokusSchema = new SimpleSchema({
    fokus: {
        type: String,
        label: "Fokus",
        min: 0,
        max: 100
    }

});

Fokus.attachSchema(FokusSchema);

Fokus.allow({
    insert(userId, fokus) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    },
    update(userId, step, fields, modifier) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    },
    remove(userId, step) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    }
});