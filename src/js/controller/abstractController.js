(function(app, name){
    var _controller = function(){};

    _controller = {
        init: function(){
            console.log('abstract');
        }
    };

    module.exports = _controller;
})(app,'abstractController');