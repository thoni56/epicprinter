import { jsPDF } from 'jspdf';

import { Epics } from '../imports/api/epics';

import './main.css';
import './main.html';

Template.body.helpers({
    epics: function() {
        return Epics;
    }
})

Template.body.events({
    'clicka #print': function (event) {
        let doc = new jsPDF({ orientation: 'landscape', units: 'mm' });
        const [r, g, b] = randomRGB();
        doc.setFillColor(r, g, b);
        const offsetX = 10;
        const offsetY = 10;
        const startX = offsetX + 0;
        const startY = offsetY + 0;
        const length = 200;
        const height = 50;
        doc.rect(startX, startY, length, height, 'F');
        doc.save('epic.pdf');
    }
});

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
function hslToRgb(h, s, l) {
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