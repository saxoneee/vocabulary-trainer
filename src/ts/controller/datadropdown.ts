import Vue from 'vue';
import * as VueOnsen from 'vue-onsenui';
Vue.use(VueOnsen);

import Utils from './../utils/utils';
import AbstractController from './abstractController';


export default class DataDropDown extends AbstractController{
    tmplName = 'datadropdown';  

    initView(){
        new Vue({
            el: '#datadropdown'
        })
    }
}