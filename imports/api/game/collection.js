import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Game = new Mongo.Collection('game');

var GameSchema = new SimpleSchema({
    isPlaying: {
        type: Boolean,
        label: "Im Spiel"
    },
    userId: {
        type: String,
        label: "User Id"
    },
    questionPosition:{
        type: Number,
        label: "Frageposition"
    }
});

Game.attachSchema(GameSchema);

Game.allow({
    insert(userId, game) {
        game.userId=userId;
        return true;
    },
    update(userId, game, fields, modifier) {
        game.userId=userId;
        return true;
    },
    remove(userId, game) {
        game.userId=userId;
        return true;
    }
});