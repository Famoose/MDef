import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Energietyp = new Mongo.Collection('energietyp');

var EnergietypSchema = new SimpleSchema({
    energietyp: {
        type: String,
        label: "Energietyp",
        min: 0,
        max: 100
    }

});

Energietyp.attachSchema(EnergietypSchema);

Energietyp.allow({
    insert(userId, energietyp) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    },
    update(userId, step, fields, modifier) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    },
    remove(userId, step) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    }
});