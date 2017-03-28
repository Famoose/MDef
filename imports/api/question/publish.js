/**
 * Created by lukas on 21.10.2016.
 */
import { Meteor } from 'meteor/meteor';

import { Question } from './collection';

if (Meteor.isServer) {
    Meteor.publish('question', function() {
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

        return Question.find(/*selector*/);
    });
}