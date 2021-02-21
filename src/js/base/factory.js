import abstractController from './../controller/abstractController';

(function(app, name){
    var _factory = {
        createController: function(pController){
            console.log(abstractController);
            console.log(pController);

            pController.__proto__ = {
                callParent: function(){
                    console.log(arguments.callee());
                }
            };
            

            return pController;
        }
    };

    app.base[name] = _factory;
})(app, 'factory');