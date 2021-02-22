import Vue from 'vue';
import * as VueOnsen from 'vue-onsenui';
Vue.use(VueOnsen);

import Utils from './../utils/utils';
import AbstractController from './abstractController';


export default class DataDropDown extends AbstractController{
    tmplName = 'datadropdown';  

    initView(){
        const _dataPromise = Utils.ajaxGet('/api/datalist');

        _dataPromise.done(function(pListData){
            const _options:any = {};
            const _urlParamDataname:any = Utils.getUrlParameter('dataname');
            $.each(pListData, function(index, item){
                _options[item.id] = {
                    name: item.name,
                    selected: (_urlParamDataname === item.id) ? 1 : 0
                };
            });

            new Vue({
                data: {
                    options:_options,
                },
                el: '#datadropdown'
            })
        })
    }
}