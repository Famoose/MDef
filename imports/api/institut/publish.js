
import { Meteor } from 'meteor/meteor';

import { Institut } from './collection';

if (Meteor.isServer) {
    Meteor.publish('institut', function() {
        return Institut.find();
    });
}