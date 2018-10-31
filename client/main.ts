import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
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

        if (!AutoForm.validateForm("epicEntryForm")) {
            console.log('Form validation failed');
            return;
        }

        let key = AutoForm.getFieldValue("key", "epicEntryForm");
        let title = AutoForm.getFieldValue("title", "epicEntryForm");
        let effort = AutoForm.getFieldValue("effort", "epicEntryForm");

        let color;
        if (activeEpic.get()) {
            let epic = findEpic(activeEpic.get());
            color = epic.color;
        } else
            color = randomColor();
        console.log(color);

        if (Meteor.userId()) {
            // Only store if user logged in
            if (activeEpic.get() == undefined)
                createEpic(key, title, effort, color, function (id) {
                    activeEpic.set(id);
                });
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

function randomColor(): string {
    return rgbToHtml(randomRGB());
}

function rgbToHtml(rgb: number[]): string {
    let [r, g, b] = rgb
    return "#" + r.toString(16) + g.toString(16) + b.toString(16);
}

function randomRGB() {
    return hslToRgb(Math.random(),
        (25 + 70 * Math.random()) / 100,
        (85 + 10 * Math.random()) / 100);
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 * 
 * Copied from https://stackoverflow.com/a/9493060/204658
 */
function hslToRgb(h, s, l): number[] {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}