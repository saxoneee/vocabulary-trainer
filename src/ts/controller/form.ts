import Vue from 'vue';
import * as VueOnsen from 'vue-onsenui';
Vue.use(VueOnsen);

import Utils from './../utils/utils';
import AbstractController from './abstractController';


export default class Form extends AbstractController{
    tmplName = 'form';

    instance:any = null;

    initOptions(){
        const _me = this,
            _dataPromise = Utils.ajaxGet('/api/datalist');

        _dataPromise.done(function(pListData){
            const _options:any = {};
            const _urlParamDataname:any = Utils.getUrlParameter('dataname');
            $.each(pListData, function(index, item){
                _options[item.id] = {
                    name: item.name,
                    selected: (_urlParamDataname === item.id) ? 1 : 0
                };
            });

            

                _me.instance.options = _options;

                setTimeout(function(){
                    console.log('FUCGH');
                    _me.instance.$forceUpdate();
                },1000);
            
            
        })
    }

    initView(){
        var _ctrl = this;
        var data:any = null;

        this.instance = new Vue({
            el: '#form',
        
            data: {
                options: [],

                correctAmount: 0,
                errorAmount: 0,
        
                question: '',
                answer: '',
                answerColl: Array(),
        
                showValidation: false,
                isValid: false,
            },
        
            /**
             * vue is ready
             */
            created: function(){
                var _me = this,
                    _dataName = Utils.getUrlParameter('dataname');

                    _ctrl.initOptions();

                if(!_dataName){
                    $('#form').find('button,input').attr('disabled', 'disabled');
                    return;
                }

                var _promise:any = Utils.ajaxGet('api/data?dataname=' + _dataName);
        
                _promise.done(function(pData:any){
                    data = pData;
                    _me.initQuestion();
                });
            },
        
            methods: {
                /**
                 * show a new question
                 */
                initQuestion: function(){
                    var _q = this.generateQuestion();
                    this.showValidation = false;
                    
                    this.question = _q[0];
                    this.answer = '';
                    this.answerColl = _q.slice().splice(1, _q.length -1);
                    this.$nextTick(function(){
                        var _el:any = this.$refs.answer;
                        _el.focus();
                    });
                },
        
                /**
                 * get a random q/a-pair from data
                 */
                generateQuestion: function(){
                    var index = Utils.getRandom(0, data.length -1);
                    
                    return data[index].split(';');
                },
        
                /**
                 * validate input
                 */
                validate: function(){
                    var _answerVal = this.answer,
                        _answerColl = this.answerColl,
                        _isValid = false;
                    
                    if(_answerColl.indexOf(_answerVal) !== -1){
                        _isValid = true;
                    }
            
                    this.isValid = _isValid;
                    this.showValidation = true;
            
                    return _isValid;
                },
        
                showData: function(){
        
                },
        
                /**
                 * submit answer
                 */
                onQuestFormSubmit: function(){
                    var _valid = this.validate();
                    if(_valid){
                        this.correctAmount = this.correctAmount + 1;
                        this.$nextTick(function(){
                            var _el:any = this.$refs.next;
                            _el.focus();
                        });
                    }else{
                        this.errorAmount = this.errorAmount + 1;
                        this.answer = '';
                    }
                },
        
                /**
                 * meh, another!
                 */
                onSkipFormSubmit: function(){
                    this.initQuestion();
                },
        
                /**
                 * solved, another!
                 */
                onResultFormSubmit: function(){
                    this.initQuestion();
                }
            }
        });

        
    }
}