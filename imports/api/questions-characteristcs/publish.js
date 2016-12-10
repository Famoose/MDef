/**
 * Created by lukas on 21.10.2016.
 */
import { Meteor } from 'meteor/meteor';

import { QuestionsCharacteristics } from './collection';

if (Meteor.isServer) {
    Meteor.publish('questionsCharacteristics', function() {
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

        return QuestionsCharacteristics.find(/*selector*/);
    });
}