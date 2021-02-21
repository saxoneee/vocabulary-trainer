(function(app, name){
    var _controller = {
        init: function(){
            console.log('formcontroller', this.callParent());
            
        }
    };
    

    app.controller[name] = app.base.factory.createController(_controller);

    app.controller.form.init();
})(app, 'form');