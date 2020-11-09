(function(app){
    app.utils.ajax = {
        get: function(url){
            // @todo: get rid of jquery
            return $.get(url);
        }
    };
})(app);