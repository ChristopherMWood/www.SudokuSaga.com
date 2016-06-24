var settings = (function () {
	var settings = {};
	var iterationSpeed = 250;
	var algorithmVisualization = true;

	settings.loadAllSettingsFromCookie = function () {
		if (navigator.cookieEnabled)
		{

		}
		else
		{
			//Output no cookies enabled message
		}
	};

    settings.algorithmVisualizationEnabled = function () {
        return algorithmVisualization;
    }

	settings.enableAlgorithmVisualization = function (enable) {
    	algorithmVisualizationEnabled = enable;
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