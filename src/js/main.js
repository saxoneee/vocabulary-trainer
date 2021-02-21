import './base/ns';
import './base/factory';
import './utils/ajax';
import './utils/number';
import './controller/form';

import './../css/styles.css';

import Vue from 'vue/dist/vue';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import VueOnsen from 'vue-onsenui';

Vue.use(VueOnsen);

(function(app){

    function loadView(){

    }

    loadView('form');


    // new Vue({
    //     el: '#vocabulary',
    
    //     /**
    //      * vue is ready
    //      */
    //     created: function(){
    //         var _me = this,
    //             _promise = app.utils.ajax.get('api/data');

    //         _promise.done(function(pData){
    //             data = pData[language];
    //             _me.initQuestion();
    //         });
    //     },
    // });
})(app);
