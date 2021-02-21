

import Utils from './../utils/utils';

export default class AbstractController{
    tmplName:string = '';

    init(){
        var _me = this,
            _tmpl = Utils.ajaxGet('api/view?viewname=' + _me.tmplName);
        _tmpl.done(function(pTmpl){
            $('body').append(pTmpl);

            _me.initView();
        });
    }

    initView(){

    }
}