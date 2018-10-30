import { jsPDF } from 'jspdf';

import './main.css';
import './main.html';

Template.body.events({
    'click #print': function (event) {
        let doc = new jsPDF({orientation: 'landscape'});
        doc.save('epic.pdf');
    }
});