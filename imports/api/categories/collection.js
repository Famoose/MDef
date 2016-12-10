import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Categories = new Mongo.Collection('categories');

var CategoriesSchema = new SimpleSchema({
    category: {
        type: String,
        label: "Kategorie",
        min: 0,
        max: 100
    }
});

Categories.attachSchema(CategoriesSchema);

Categories.allow({
    insert(userId, category) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    },
    update(userId, category) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    },
    remove(userId, category) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    }
});