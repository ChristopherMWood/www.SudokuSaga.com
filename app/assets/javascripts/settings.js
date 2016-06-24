var settings = (function () {
	var settings = {};
	var iterationSpeed = 250;
	var algorithmVisualization = true;

	settings.loadAllSettingsFromCookie = function () {
		if (navigator.cookieEnabled)
		{
            // var iteration = settings.getCookie("iterationSpeed");
            // if (iteration != null && iteration != 250)
            //     iterationSpeed = iteration;
            //
            // var visualization = settings.getCookie("algorithmVisualization");
            // if (visualization != null && visualization != algorithmVisualization)
            //     algorithmVisualization = visualization;
            //
            // var code = settings.getCookie("javascriptCode");
            // if (code != null && code.length > 0)
            //     editor.setValue(code, -1);
		}
		else
		{
            $.ambiance({
                message: "To save your code, please enable cookies!",
                type: "error",
                timeout: 10
            });
		}
	};

    settings.algorithmVisualizationEnabled = function () {
        return algorithmVisualization;
    }

	settings.enableAlgorithmVisualization = function (enable) {
        algorithmVisualization = enable;
	};

	settings.setIterationFrequency = function (milliseconds) {
	    loopWaitTime = milliseconds;
	    $("#frequency-display").text(milliseconds + "ms");
	};

	settings.setEditorFontSize = function (size) {
    	$("#editor").css("font-size", size);
	};

	settings.setEditorTheme = function (theme) {
		editor.setTheme("ace/theme/" + theme);
	};

	settings.saveAllSettingsToCookie = function () {
		if (navigator.cookieEnabled)
		{
            // settings.setCookie("iterationSpeed", iterationSpeed, 999);
            // settings.setCookie("algorithmVisualization", algorithmVisualization, 999);
            // settings.setCookie("javascriptCode", editor.getSession().getValue(), 999);
		}
		else
		{
			//Output no cookies enabled message
		}
	};

	settings.getCookie = function (cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	    }
	    return "";
	};

	settings.setCookie = function (cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "max-age="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	};

	return settings;
}());