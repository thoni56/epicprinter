import { Template } from 'meteor/templating';
import { Epics, createEpic, updateEpic, findEpic } from '../imports/api/epics';
import { printEpicToPdf } from './printer';
import { AutoForm } from 'meteor/aldeed:autoform';
import { activeEpic } from 'imports/ui/epicList/epicItem';

import '../imports/ui/epicList/epicList';

import './main.css';
import './main.html';

Template.body.helpers({
    epicsCollection() {
        return Epics;
    },
    epicToShow() {
        return findEpic(activeEpic.get());
    }
})

Template.body.events({
    'click #print': function (event) {
        event.preventDefault();

        if (!AutoForm.validateField("epicEntryForm"))
            return;

        let key = AutoForm.getFieldValue("key", "epicEntryForm");
        let title = AutoForm.getFieldValue("title", "epicEntryForm");
        let effort = AutoForm.getFieldValue("effort", "epicEntryForm");

        if (Meteor.userId()) {
            // Only store if user logged in
            if (activeEpic.get() == undefined)
                createEpic(key, title, effort);
            else
                updateEpic(activeEpic.get(), key, title, effort);
        }

        printEpicToPdf(key, title, effort);
    },
    'click #clear'(event) {
        event.preventDefault();
        activeEpic.set(undefined);
        AutoForm.resetForm("epicEntryForm");
    }
});

