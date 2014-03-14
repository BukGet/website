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