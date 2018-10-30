import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './epicItem.html';

export const activeEpic = new ReactiveVar(undefined);

Template.epicItem.helpers({
    active() {
        if (this._id == activeEpic.get())
            return "active";
        else
            return "";
    }
})

Template.epicItem.events({
    'click .list-group-item'() {
        activeEpic.set(this._id);
    }
})