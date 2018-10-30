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

        const target = event.target;
        printEpicToPdf(target.key.value, target.title.value, target.effort.value);
    }
});