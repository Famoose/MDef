import { Meteor } from 'meteor/meteor';
import '../imports/api/bubble/index';
import '../imports/api/cluster/index';
import '../imports/api/energietyp/index';
import '../imports/api/question/index';
import '../imports/api/fokus/index';
import '../imports/api/game/index.js';
import '../imports/api/answer/index.js';
import '../imports/api/institut/index.js';
import '../imports/api/users/index.js';
import '../imports/api/users/onCreateUser.js';
import '../imports/service/AnswerAttr';

Meteor.startup(() => {
    process.env.MAIL_URL = "smtp://personal.finder.app%40gmail.com:"+process.env.MAILPW+"@smtp.gmail.com";
    Accounts.config({sendVerificationEmail: false});
    var user = Accounts.findUserByUsername(process.env.DUSERNAME);
    if(!user){
        var id = Accounts.createUser({username: process.env.DUSERNAME, email: process.env.DUSEREMAIL, password: process.env.PW});
        Roles.addUsersToRoles(id, ['admin'], 'default-group');
    }
});