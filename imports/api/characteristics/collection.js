import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const Characteristics = new Mongo.Collection('characteristics');

var CharacteristicsSchema = new SimpleSchema({
    characteristic: {
        type: String,
    },
    description:{
        type:String
    }
});

Characteristics.attachSchema(CharacteristicsSchema);

Characteristics.allow({
    insert(userId, characteristic) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    },
    update(userId, characteristic, fields, modifier) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    },
    remove(userId, characteristic) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    }
});