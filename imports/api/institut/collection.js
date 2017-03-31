import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Institut = new Mongo.Collection('institut');

var InstitutSchema = new SimpleSchema({
        institut: {
            type: String,
            label: "Name",
            min: 0,
            max: 300
        },
        branche: {
            type: String,
            label: "Branche",
            min: 0,
            max: 300
        },
        region: {
            type: String,
            label: "Region",
            min: 0,
            max: 300
        }
    });

Institut.attachSchema(InstitutSchema);

Institut.allow({
    insert(userId, answer) {
        return true;
    },
    update(userId, answer) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    },
    remove(userId, answer) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    }
});