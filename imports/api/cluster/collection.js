import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Cluster = new Mongo.Collection('cluster');

var ClusterSchema = new SimpleSchema({
    cluster: {
        type: String,
        label: "Cluster",
        min: 0,
        max: 100
    }
});

Cluster.attachSchema(ClusterSchema);

Cluster.allow({
    insert(userId, cluster) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    },
    update(userId, step, fields, modifier) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    },
    remove(userId, step) {
        return Roles.userIsInRole(userId, ["admin"], "default-group");
    }
});