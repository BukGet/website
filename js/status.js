var Status = {
  messages: {
    warning: 'Systems are experiencing slight turbulance.',
    down: 'Majority of the system is down.',
    ok: 'All systems are GO.',
    pending: 'DDOSing the system, please hold.'
  },

  codes: {
    "pl": "Listing",
    "plb": "Listing (Bukkit)",
    "pd": "Detail (Full)",
    "pdl": "Detail (Latest Only)",
    "pdr": "Detail (Latest Release)",
    "pdb": "Detail (Latest Beta)",
    "pda": "Detail (Latest Alpha)",
    "cl": "Category List",
    "cpl": "Category Plugin List",
    "al": "Author List",
    "apl": "Author Plugin List",
    "upd": "Updates",
    "se": "Search"
  }
};

Status.call = function (callback) {
  $.ajax({
    url: 'http://bukget-monitor.herokuapp.com',
    success: function (data) { callback(data); },
    error: function (xml, status, error) { callback(null, error); }
  });
};

Status.check = function () {
  Status.call(function (data, error) {
    if (error) {
      return;
    }
    
    $('.links .radial').removeClass('pending').addClass(data.message);
  });
};

Status.checkAll = function () {
  var $overall = $('.overall');
  $overall.empty().addClass('pending').html('<p>' + Status.messages.pending + '</p>');
  Status.call(function (data, error) {
    if (error) {
      return;
    }
    
    $('.links .radial').removeClass('pending').addClass(data.status);

    for (var server in data.servers) {
      var the_server = data.servers[server];
      for (var version in data.servers[server]) {
        var the_version = the_server[version];
        var $blocks = $('.system.' + server.split('.')[0] + '.' + version + ' .blocks');
        var length = Object.keys(the_version).length;
        $blocks.empty();
        for (var section in the_version) {
          var code = Status.codes[section];
          var $template = $('[data-template="block"] span').clone();

          //$template.addClass('pending');
          $template.addClass(the_version[section]);
          $template.attr('title', code);
          $blocks.append($template);

          $overall.empty().removeClass('pending').addClass(status).html('<p>' + Status.messages[data.status] + '</p>');
        }
      }
    }
  }); 
};

var formatter = function() {
  var s = '<span style="font-size: 10px">'+ Highcharts.dateFormat('%A, %b %e, %H:%M', this.x) +'</span><br/>';

  var sortedPoints = this.points.sort(function(a, b){
    return ((a.y > b.y) ? -1 : ((a.y < b.y) ? 1 : 0));
  });
  $.each(sortedPoints , function(i, point) {
    s += '<span style="color:' + point.series.color + '">' + point.series.name + '</span>: <b>' + Highcharts.numberFormat(point.y, -1) +'</b><br/>';
  });

  return s;
}

Status.drawGraphs = function () {
  $.getJSON('http://api.bukget.org/stats/trend/30', function(data){
    var dset = [{name: 'api1', data: []},
      {name: 'api2', data: []},
      {name: 'api3', data: []},
      {name: 'total', data: []}];
    var uadata = [{name: 'Other', data: []}];
    var uamax = 0;
    $.each(data, function(key, item){
      for (var i = 0; i < dset.length; i++){
        dset[i]["data"].push([item["timestamp"] * 1000, item[dset[i].name]]);
      };
      if ("user_agents" in item){
          var total = 0;
          $.each(item["user_agents"], function(ua, value){
              var in_ua = false;
              var idex = null;
              for (var i = 0; i < uadata.length; i++){
                  if (uadata[i].name == ua) {
                      in_ua = true;
                      idex = i;
                  };
              };
              if (!in_ua & value > 10) {
                in_ua = true;
                uadata.push({ name: ua, data: []});
                idex = uadata.length - 1;
              }
              if (in_ua) {
                uadata[idex].data.push([item["timestamp"] * 1000, value]);
              }
              total += value;
              if (value > uamax) { 
                uamax = value;
              }
          });
          uadata[0].data.push([item["timestamp"] * 1000, (item['total'] - total)]);
      };
    });
    for (var i = 0; i < dset.length; i++){
      dset[i]["data"].reverse();
    }
    for (var i = 0; i < uadata.length; i++){
      uadata[i]["data"].reverse();
    }
    $('#requests').highcharts({
      chart: {
        type: 'line',
        zoomType: 'x',
        spacingRight: 20
      },
      colors: [
         '#2f7ed8', 
         '#8bbc21', 
         '#c42525', 
         '#f28f43'
      ], 
      plotOptions: {
            series: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
      },
      title: {
        text: 'Requests per day'
      },
      xAxis: {
        type: 'datetime',
        title: {
            text: null
        }
      },
      tooltip: {
        shared: true,
        followPointer: true,
        formatter: formatter
      },
      legend: {
        enabled: false
      },
      yAxis: {
        title: {
            text: null
        },
        min: 0
      },
      series: dset,
      credits: {
        enabled: false
      },
    });
    $('#useragents').highcharts({
      chart: {
        type: 'line',
        zoomType: 'x',
        spacingRight: 20
      },
      plotOptions: {
            series: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
      },
      title: {
        text: 'Requests per user-agent per day'
      },
      xAxis: {
        type: 'datetime',
        title: {
            text: null
        }
      },
      tooltip: {
        shared: true,
        followPointer: true,
        formatter: formatter
      },
      legend: {
        enabled: false
      },
      yAxis: {
        title: {
            text: null
        },
        min: 0,
        max: (uamax + uamax * 0.1)
      },
      series: uadata,
      credits: {
        enabled: false
      },
    });
  });
}


Status.naughty_list = function (){
    $('#naughty').append('<table><thead>' +
                         '<tr><th style="width: 400px;">Plugin Name</th><th style="width: 100px">Authors</th><th style="width: 100px">Version</th><th>Last Updated</th></tr><tr style="height: 5px"><td></td><td></td><td></td><td></td></tr></thead><tbody><tr class="spacer"><td></td><td></td><td></td><td></td></tr>');
    $.getJSON('http://api.bukget.org/3/search/_use_dbo/exists/true?fields=plugin_name,slug,versions.date,authors&sort=-versions.date', function(data){
        $.each(data, function(key, plugin){
            $("#naughty tbody").append('<tr><td><strong>' + plugin.plugin_name + '</strong> (' + plugin.slug + ')</td>' +
                                 '<td>' + plugin.authors.join(', ') + '</td>' +
                                 '<td>' + plugin.versions.length + '</td>' +
                                 '<td>' + Highcharts.dateFormat('%a, %b %e, %H:%M, %Y', plugin.versions[0].date * 1000) + '</td></tr>'
            );
        });
    });
    $("#naughty").append('</tbody></table>');
    $('.show_hide').click(function () {
        var toggleClick = $(this);
        var toggleDiv = $(this).attr('rel');
        $(toggleDiv).slideToggle(200, '', function() {});
        return false;
    });
};