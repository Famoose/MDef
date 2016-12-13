
import { Meteor } from 'meteor/meteor';

import { Answers } from './collection';

if (Meteor.isServer) {
    Meteor.publish('answers', function() {
        const selector = {
            $or: [{
                // when logged in user is the owner
                $and: [{
                    userId: this.userId
                }, {
                    userId: {
                        $exists: true
                    }
                }]
            }]
        };

        return Answers.find(selector);
    });
}