import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Bubble = new Mongo.Collection('bubble');

var BubbleSchema = new SimpleSchema({
    bubble: {
        type: String,
        label: "Bubble",
        min: 0,
        max: 100
    },
    clusterId: {
        type: String,
        label: "Cluster",
        min:0
    }

});

Bubble.attachSchema(BubbleSchema);

Bubble.allow({
    insert(userId, bubble) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    },
    update(userId, step, fields, modifier) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    },
    remove(userId, step) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    }
});