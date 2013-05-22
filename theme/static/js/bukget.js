function pvtotals() {
	$.getJSON('http://api.bukget.org/stats/todays_trends', function(data){
		$("#hometotals").append('<p class="centerme">Total Plugins: ' + data.plugin_count + 
			'&nbsp;&nbsp;|&nbsp;&nbsp;Total Versions: ' + data.version_count + '</p><br />');
	});
};


function top10plugs() {
	$.getJSON('http://api.bukget.org/3/plugins/bukkit?size=10&start=0&sort=-popularity.daily&fields=plugin_name,slug,popularity', function(data){
		$('#homestats').append('<h2>Todays Most Popular</h2><hr />');
		$.each(data, function(key, item){
			$("#homestats").append('<li><strong>' + item.plugin_name + 
				'&nbsp;<i>(' + item.slug + ')</i></strong>&nbsp;&nbsp;&nbsp;' +
				'<em>' + item.popularity.daily + '</em></li>');
		});
	});
};


function naughty_list() {
	$.getJSON('http://api.bukget.org/stats/naughty_list', function(data){
		$("#naughty").append("<ul>")
		$.each(data, function(key, item) {
			$("#naughty").append('<li><em><strong>' + item.slug + '</strong></em>&nbsp;&nbsp;&nbsp;' + item.authors.join(', ') + '</li>');
		});
		$("#naughty").append("</ul>")
	});
};


function naughty_list(){
    $('#naughty').append('<table><tr><th colspan="5"><strong><center>Plugins With Bad Versioning</center></strong></th></tr>' +
                         '<tr bgcolor="#DEDEDE"><th style="width: 350px">Plugin Name</th><th style="width: 100px">Authors</th><th>Vers</th><th>Last Updated</th></tr>');
    $.getJSON('http://api.bukget.org/3/search/_use_dbo/exists/true?fields=plugin_name,slug,versions.date,authors&sort=-versions.date', function(data){
        $.each(data, function(key, plugin){
            $("#naughty tbody").append('<tr><td><strong>' + plugin.plugin_name + '</strong> (' + plugin.slug + ')</td>' +
                                 '<td>' + plugin.authors.join(', ') + '</td>' +
                                 '<td>' + plugin.versions.length + '</td>' +
                                 '<td>' + new Date(plugin.versions[0].date * 1000).toDateString() + '</td></tr>'
            );
        });
    });
    $("#naughty").append('</table>');
};


function check_service(){
    function checkCall(server, uri, adjust) {
        var url = "http://" + server + uri;
        $.ajax({
            url: url,
            timeout: 10000,
            success: function(data){console.log(url + ": OK");$(adjust).attr("class", "status-ok");},
            error: function(xml, status, error){console.log(url + ": FAIL");$(adjust).attr("class", "status-error");}
        });
    };

    var servers = ["dallas.api.bukget.org", "paris.api.bukget.org", "dev.api.bukget.org"];

    var apiCalls = {
        "v3": {
            "pl": "/3/plugins",
            "plb": "/3/plugins/bukkit",
            "pd": "/3/plugins/bukkit/pvp-arena",
            "pdl": "/3/plugins/bukkit/pvp-arena/latest",
            "pdr": "/3/plugins/bukkit/pvp-arena/release",
            "pdb": "/3/plugins/bukkit/pvp-arena/beta",
            "pda": "/3/plugins/bukkit/pvp-arena/alpha",
            "cl": "/3/categories",
            "cpl": "/3/categories/Admin Tools",
            "al": "/3/authors",
            "apl": "/3/authors/NuclearW",
            "se": "/3/search/versions.type/=/Alpha?sort=-popularity"
        },
        "v2": {
            "plb": "/2/bukkit/plugins",
            "pd": "/2/bukkit/plugin/pvp-arena",
            "pdl": "/2/bukkit/plugin/pvp-arena/latest",
            "cl": "/2/categories",
            "cpl": "/2/bukkit/category/Admin Tools",
            "al": "/2/authors",
            "apl": "/2/bukkit/author/NuclearW",
            "se": "/2/search/version/type/=/Alpha?sort=-popularity"
        },
        "v1": {
            "pl": "/1/plugins",
            "pd": "/1/plugin/pvp-arena",
            "pdl": "/1/plugin/pvp-arena/latest",
            "cl": "/1/categories",
            "cpl": "/1/categories/Admin Tools",
            "al": "/1/authors",
            "apl": "/1/author/NuclearW",
            "se": "/1/search/slug/like/pvp-arena"
        }
    };
    var apiTable = [
        "<table class='apitable' cellpadding='5'>",
        "<tr><th colspan='4' class='apiserver'>Server Status: </th></tr>",
        "<tr><th>API Call</th><th>v3</th><th>v2</th><th>v1</th>",
        "<tr><th>Plugin Listing</th><td id='v3pl' class='status-unknown'></td><td id='v2pl' class='status-unknown'></td><td id='v1pl' class='status-unknown'></tr>",
        "<tr><th>Plugin Listing (Bukkit Specific)</td><td id='v3plb' class='status-unknown'></td><td id='v2plb' class='status-unknown'></td><td id='v1plb' class='status-unknown'></td></tr>",
        "<tr><th>Plugin Detail (Full)</th><td id='v3pd' class='status-unknown'></td><td id='v2pd' class='status-unknown'></td><td id='v1pd' class='status-unknown'></td></tr>",
        "<tr><th>Plugin Detail (Latest Only)</th><td id='v3pdl' class='status-unknown'></td><td id='v2pdl' class='status-unknown'></td><td id='v1pdl' class='status-unknown'></td></tr>",
        "<tr><th>Plugin Detail (Latest Release)</th><td id='v3pdr' class='status-unknown'></td><td id='v2pdr' class='status-unknown'></td><td id='v1pdr' class='status-unknown'></td></tr>",
        "<tr><th>Plugin Detail (Latest Beta)</th><td id='v3pdb' class='status-unknown'></td><td id='v2pdb' class='status-unknown'></td><td id='v1pdb' class='status-unknown'></td></tr>",
        "<tr><th>Plugin Detail (Latest Alpha)</th><td id='v3pda' class='status-unknown'></td><td id='v2pda' class='status-unknown'></td><td id='v1pda' class='status-unknown'></td></tr>",
        "<tr><th>Category Listing</th><td id='v3cl' class='status-unknown'></td><td id='v2cl' class='status-unknown'></td><td id='v1cl' class='status-unknown'></td></tr>",
        "<tr><th>Category Plugin Listing</th><td id='v3cpl' class='status-unknown'></td><td id='v2cpl' class='status-unknown'></td><td id='v1cpl' class='status-unknown'></td></tr>",
        "<tr><th>Author Listing</th><td id='v3al' class='status-unknown'></td><td id='v2al' class='status-unknown'></td><td id='v1al' class='status-unknown'></td></tr>",
        "<tr><th>Author Plugin Listing</th><td id='v3apl' class='status-unknown'></td><td id='v2apl' class='status-unknown'></td><td id='v1apl' class='status-unknown'></td></tr>",
        "<tr><th>Search</th><td id='v3se' class='status-unknown'></td><td id='v2se' class='status-unknown'></td><td id='v1se' class='status-unknown'></td></tr>",
        "</table>"
    ].join('\n')

    for (var sid in servers) {
        var server = servers[sid];
        var sdiv = server.replace(/\./g, '')
        var sname = "#svccheck #" + server.replace(/\./g, '')
        $("#svccheck").append("<div id=\"" + sdiv + "\">" + apiTable + "</div>")
        $(sname + " .apiserver").append("<span class='status-unknown'>" + server + "</span>")
        checkCall(server, "/3/", sname + " .apiserver span");
        for (var apiver in apiCalls) {
            var verCalls = apiCalls[apiver];
            for (var call in verCalls) {
                checkCall(server, verCalls[call], sname + " #" + apiver + call);
            };
        };
    };
};



//Copied from somwhere, I forget where ;)
(function ($) {
    $.fn.showHide = function (options) {
 
    //default vars for the plugin
        var defaults = {
            speed: 1000,
            easing: '',
            changeText: 0,
            showText: 'Show',
            hideText: 'Hide'
 
        };
        var options = $.extend(defaults, options);
 
        $(this).click(function () {
			// optionally add the class .toggleDiv to each div you want to automatically close
        	//$('.toggleDiv').slideUp(options.speed, options.easing);
            // this var stores which button you've clicked
            var toggleClick = $(this);
            // this reads the rel attribute of the button to determine which div id to toggle
            var toggleDiv = $(this).attr('rel');
            // here we toggle show/hide the correct div at the right speed and using which easing effect
            $(toggleDiv).slideToggle(options.speed, options.easing, function() {
            // this only fires once the animation is completed
            if(options.changeText==1){
            $(toggleDiv).is(":visible") ? toggleClick.text(options.hideText) : toggleClick.text(options.showText);
            }
        });
 
        return false;
 
        });
 
    };
})(jQuery);

$(document).ready(function(){
 
   $('.show_hide').showHide({
        speed: 1000,  // speed you want the toggle to happen
        easing: '',  // the animation effect you want. Remove this line if you dont want an effect and if you haven't included jQuery UI
        changeText: 1, // if you dont want the button text to change, set this to 0
        showText: 'View',// the button text to show when a div is closed
        hideText: 'Close' // the button text to show when a div is open
 
    });
 
});