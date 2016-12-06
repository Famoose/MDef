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
        return true
    },
    update(userId, category) {
        return true;
    },
    remove(userId, category) {
        return true;
    }
});