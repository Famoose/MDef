import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const QuestionsCharacteristics = new Mongo.Collection('questionsCharacteristics');

var QuestionsCharacteristicsSchema = new SimpleSchema({
    questionId: {
        type: String,
        label: "Frage ID"
    },
    characteristicId: {
        type: String,
        label: "Charakteristik ID"
    },
    influence:{
        type: Number,
        label: "Einflusswert",
        min:0,
        max:100
    }
});

QuestionsCharacteristics.attachSchema(QuestionsCharacteristicsSchema);

QuestionsCharacteristics.allow({
    insert(userId, questionCharacteristic) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    },
    update(userId, questionCharacteristic, fields, modifier) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    },
    remove(userId, questionCharacteristic) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    }
});