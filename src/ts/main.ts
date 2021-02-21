import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import './../css/styles.css';

import DataDropdownController from './controller/datadropdown';
import FormController from './controller/form';

var dd = new DataDropdownController();
var form = new FormController();

// dd.init();
form.init();