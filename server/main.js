import { Meteor } from 'meteor/meteor';
import '../imports/api/steps/index.js';

Meteor.startup(() => {
    process.env.MAIL_URL = "smtp://personal.finder.app%40gmail.com:$Welcome16@smtp.gmail.com";
});
