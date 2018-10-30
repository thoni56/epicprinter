import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Schemas } from './schemas';

export const Epics = new Mongo.Collection('Epics');

SimpleSchema.extendOptions(['autoform']);

Schemas.Epics = new SimpleSchema({
    key: {
        type: String,
        label: "Key",
        max: 50,
        optional: false,
        autoform: {
            placeholder:"Identifying key"
        }
    },
    title: {
        type: String,
        label: "Title",
        max: 200,
        optional: false,
        autoform:{
            placeholder:"Title of the epic"
        }
    },
    effort: {
        type: Number,
        label: "Effort",
        optional: false,
        autoform:{
            placeholder:"Estimated relative effort"
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
            afFieldInput: {
                type: "hidden"
            }
        }
    }
});

Epics.attachSchema(Schemas.Epics);
