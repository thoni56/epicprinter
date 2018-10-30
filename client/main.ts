import { Template } from 'meteor/templating';
import { Epics } from '../imports/api/epics';
import { printEpicToPdf } from './printer';

import './main.css';
import './main.html';

Template.body.helpers({
    epics: function () {
        return Epics;
    }
})

Template.body.events({
    'submit #print': function (event) {
        event.preventDefault();

        printEpicToPdf(event.target.key.value, event.target.title.value, event.target.effort.value);
    }
});