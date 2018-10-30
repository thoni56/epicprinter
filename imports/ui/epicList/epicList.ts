import { Template } from 'meteor/templating';
import { Epics } from '../../api/epics';

import './epicItem';
import './epicList.html';

Template.epicList.helpers({
    epics: function() {
        return Epics.find();
    }
})