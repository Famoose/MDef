
import { Meteor } from 'meteor/meteor';

import { Answers } from './collection';

if (Meteor.isServer) {
    Meteor.publish('answers', function() {
        const selector = {
            // $or: [{
            //     // when logged in user is the owner
            //     $and: [{
            //         owner: this.userId
            //     }, {
            //         owner: {
            //             $exists: true
            //         }
            //     }]
            // }]
        };

        return Answers.find(/*selector*/);
    });
}