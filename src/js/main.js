import './base/ns';
import './utils/ajax';
import './utils/number';

import './../css/styles.css';

import Vue from 'vue/dist/vue';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import VueOnsen from 'vue-onsenui';

(function(app){
    var data = null,
        language = 'ja';

    Vue.use(VueOnsen);

    new Vue({
        el: '#vocabulary',
    
        data: {
            correctAmount: 0,
            errorAmount: 0,
    
            question: '',
            answer: '',
            answerColl: [],

            showValidation: false,
            isValid: false,
        },

        /**
         * vue is ready
         */
        created: function(){
            var _me = this,
                _promise = app.utils.ajax.get('api/data');

            _promise.done(function(pData){
                data = pData[language];
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
                    this.$refs.answer.focus();
                });
            },

            /**
             * get a random q/a-pair from data
             */
            generateQuestion: function(){
                var index = app.utils.number.randomIntFromInterval(0, data.length -1);
                
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
                        this.$refs.next.focus();
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
})(app);
