!function(t){var i=null;new Vue({el:"#vocabulary",data:{correctAmount:0,errorAmount:0,question:"",answer:"",answerColl:[],showValidation:!1,isValid:!1},created:function(){var n=this;t.utils.ajax.get("data/data.json").done((function(t){i=t.ja,n.initQuestion()}))},methods:{initQuestion:function(){var t=this.generateQuestion();this.showValidation=!1,this.question=t[0],this.answer="",this.answerColl=t.slice().splice(1,t.length-1),this.$nextTick((function(){this.$refs.answer.focus()}))},generateQuestion:function(){var n=t.utils.number.randomIntFromInterval(0,i.length-1);return i[n].split(";")},validate:function(){var t=this.answer,i=!1;return-1!==this.answerColl.indexOf(t)&&(i=!0),this.isValid=i,this.showValidation=!0,i},showData:function(){},onQuestFormSubmit:function(){this.validate()?(this.correctAmount=this.correctAmount+1,this.$nextTick((function(){this.$refs.next.focus()}))):(this.errorAmount=this.errorAmount+1,this.answer="")},onSkipFormSubmit:function(){this.initQuestion()},onResultFormSubmit:function(){this.initQuestion()}}})}(app);