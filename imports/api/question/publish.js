/**
 * Created by lukas on 21.10.2016.
 */
import {Meteor} from 'meteor/meteor';

import {Question} from './collection';
import {Fokus} from '../fokus/collection';
import {Energietyp} from '../energietyp/collection';
import {Cluster} from '../cluster/collection';
import {Bubble} from '../bubble/collection';

if (Meteor.isServer) {
    Meteor.publish('question', function () {
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
    publishComposite('questionWithForeign',{

            find() {
                return Question.find();
            },
            children: [{
                find(question){
                    return Fokus.find({_id: question.fokusId}, {});
                },
                find(question){
                    return Energietyp.find({_id: question.energietypId}, {});
                },
                find(question){
                    return Cluster.find({_id: question.clusterId}, {});
                },
                find(question){
                    return Bubble.find({_id: question.clusterId}, {});
                }
            }]

    });
}