import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Schemas } from './schemas';

export const Epics = new Mongo.Collection('Epics');


export function createEpic(key, title, effort) {
    Epics.insert({ key: key, title: title, effort: effort, owner: Meteor.userId() });
}

export function updateEpic(id, key, title, effort) {
    Epics.update({ _id: id }, { $set: { key: key, title: title, effort: effort, owner: Meteor.userId() }});
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
        label: false,
        autoValue: function () {
            return 'hsla(' +
                (360 * Math.random()) + ', ' +
                (25 + 70 * Math.random()) + '% ,' +
                (85 + 10 * Math.random()) + '%)';
        },
        autoform: {
            omit: true
        }
    },
    owner: {
        type: String,
        optional: true,
        autoform:{
            omit: true
        }
    }
});

Epics.attachSchema(Schemas.Epics);
