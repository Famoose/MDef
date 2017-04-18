import {Meteor} from 'meteor/meteor';

import {Answers} from './collection';
import {Question} from '../question/collection';
import {Fokus} from '../fokus/collection';
import {Energietyp} from '../energietyp/collection';
import {Cluster} from '../cluster/collection';
import {Bubble} from '../bubble/collection';

import {publishComposite} from 'meteor/reywood:publish-composite';


if (Meteor.isServer) {
    Meteor.publish('answers', function () {
        if (Roles.userIsInRole(this.userId, ["admin"], "default-group")) {
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

    publishComposite('answerWithQuestion', {

        find() {
            if (Roles.userIsInRole(this.userId, ["admin"], "default-group")) {
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
        },
        children: [
            {
                find(answer) {
                    return Question.find({_id: answer.questionId}, {});
                }
            }
        ]
    });
}