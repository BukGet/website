$(document).ready(function(){
	$.getJSON('http://dev.bukget.org/stats/naughty_list', function(data){
		$("#naughty").append("<ul>")
		$.each(data, function(key, item) {
			$("#naughty").append('<li><em><strong>' + item.slug + '</strong></em>&nbsp;&nbsp;&nbsp;' + item.authors.join(', ') + '</li>');
		});
		$("#naughty").append("</ul>")
	});
});