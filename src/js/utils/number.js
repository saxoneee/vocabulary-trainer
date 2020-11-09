(function(app){
    app.utils.number = {
        randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min);
          }
    };
})(app);