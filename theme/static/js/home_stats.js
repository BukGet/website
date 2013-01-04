$(document).ready(function(){
	$.getJSON('http://dev.bukget.org/stats/todays_trends', function(data){
		$("#hometotals").append('<p class="centerme">Total Plugins: ' + data.plugin_count + '&nbsp;&nbsp;|&nbsp;&nbsp;Total Versions: ' + data.version_count + '</p><br />');
		$("#homestats").append('<h2>Todays Top 10 Plugins</h2><hr /><ul>')
		$.each(data.top_plugs, function(key, item) {
			for (i in item.counts){
				$("#homestats").append('<li><strong>' + item.slug + '</strong>&nbsp;&nbsp;&nbsp;<em>' + item.counts[i] + '</em></li>');
			};		
		});
		$("#homestats").append("</ul>")
	});
});