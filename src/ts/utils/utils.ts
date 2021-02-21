export default new class Utils {
    /**
     * generate a random number between min and max
     *
     * @param min
     * @param max
     */
    getRandom = function (min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * make ajax get request
     * 
     * @param url 
     */
    ajaxGet = function(url:string){
        return $.get(url);
    }

    /**
     * get an url-param
     * @param sParam 
     */
    getUrlParameter(sParam:string) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    };
}
