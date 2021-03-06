import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Schemas } from './schemas';

export const Epics = new Mongo.Collection('Epics');

export function allEpics() {
    return Epics.find({ owner: Meteor.userId()}, { sort: { timestamp: -1}});
}

export function findEpic(id) {
    return Epics.findOne({ _id: id, owner: Meteor.userId()});
}
export function createEpic(key, title, effort, color, callback) {
    Epics.insert({ key: key, title: title, effort: effort, color: color, owner: Meteor.userId(), timestamp: new Date() }, function (err, id) {
        if (err)
            console.warn(err.message);
        else if (callback) {
            callback(id);
        }
    });
}

export function updateEpic(id, key, title, effort) {
    Epics.update({ _id: id }, { $set: { key: key, title: title, effort: effort, owner: Meteor.userId(), timestamp: new Date() } });
}

SimpleSchema.extendOptions(['autoform']);

Schemas.Epics = new SimpleSchema({
    key: {
        type: String,
        label: "Key",
        max: 50,
        optional: false,
        autoform: {
            placeholder: "Identifying key"
        }
    },
    title: {
        type: String,
        label: "Title",
        max: 200,
        optional: false,
        autoform: {
            placeholder: "Title of the epic"
        }
    },
    effort: {
        type: Number,
        label: "Effort",
        optional: false,
        autoform: {
            placeholder: "Estimated relative effort"
        }
    },
    color: {
        type: String,
        optional: true,
        label: false,
        autoform: {
            omit: true
        }
    },
    owner: {
        type: String,
        optional: true,
        autoform: {
            omit: true
        }
    },
    timestamp: {
        type: Date,
        optional: true,
        autoform: {
            omit: true
        }
    }
});

Epics.attachSchema(Schemas.Epics);
