import { Template } from 'meteor/templating';
import { Epics } from '../imports/api/epics';
import { printEpicToPdf } from './printer';
import { AutoForm } from 'meteor/aldeed:autoform';

import '../imports/ui/epicList/epicList';

import './main.css';
import './main.html';

Template.body.helpers({
    epics: function () {
        return Epics;
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

        printEpicToPdf(key, title, effort);
    },
    'click #save': function (event) {
        event.preventDefault();

        if (!AutoForm.validateField("epicEntryForm"))
            return;

        let key = AutoForm.getFieldValue("key", "epicEntryForm");
        let title = AutoForm.getFieldValue("title", "epicEntryForm");
        let effort = AutoForm.getFieldValue("effort", "epicEntryForm");
        let color = AutoForm.getFieldValue("color", "epicEntryForm");

        Epics.insert({ key: key, title: title, effort: effort });
    }
});