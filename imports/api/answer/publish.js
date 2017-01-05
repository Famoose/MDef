
import { Meteor } from 'meteor/meteor';

import { Answers } from './collection';

if (Meteor.isServer) {
    Meteor.publish('answers', function() {
        if(Roles.userIsInRole(this.userId, ["admin"], "default-group"))
        {
            return Answers.find();
        }
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