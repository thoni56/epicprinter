import { Template } from 'meteor/templating';
import { allEpics } from '../../api/epics';

import './epicItem';
import './epicList.html';

Template.epicList.helpers({
    epics: function() {
        return allEpics();
    }
})