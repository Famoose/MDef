import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Characteristics = new Mongo.Collection('characteristics');

var CharacteristicsSchema = new SimpleSchema({
    characteristic: {
        type: String,
    }
});

Characteristics.attachSchema(CharacteristicsSchema);

Characteristics.allow({
    insert(userId, characteristic) {
         return true;
    },
    update(userId, characteristic, fields, modifier) {
         return true;
    },
    remove(userId, characteristic) {
         return true;
    }
});