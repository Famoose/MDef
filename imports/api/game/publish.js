/**
 * Created by lukas on 21.10.2016.
 */
import { Meteor } from 'meteor/meteor';

import { Game } from './collection';

if (Meteor.isServer) {
    Meteor.publish('game', function() {
        const selector = {
            $or: [{
                $and: [{
                    userId: this.userId
                }, {
                    userId: {
                        $exists: true
                    }
                }]
            }]
        };

        return Game.find(selector);
    });
}