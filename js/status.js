var Status = {
  servers: [
    "dallas.api.bukget.org", 
    "paris.api.bukget.org"
  ],

  messages: {
    warning: 'Systems are experiencing slight turbulance.',
    error: 'Insurgence of errors, problems may occur.',
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
  },

  versions: {
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
  }
};

Status.call = function (server, uri, callback) {
  var url = "http://" + server + uri;

  $.ajax({
    url: url,
    timeout: 20000,
    success: function (data) { callback(true) },
    error: function (xml, status, error) { callback(false, error); }
  });
};

Status.check = function () {
  Status.call(Status.servers[0], "/3/", function (status) {
    $('.links .radial').removeClass('pending').addClass(status ? 'ok' : 'down');
  });
};

Status.checkAll = function () {
  var server = Status.servers[0];
  var $overall = $('.overall');

  $overall.empty().addClass('pending').html('<p>' + Status.messages.pending + '</p>');

  for (var version in Status.versions) {
    (function request (version) {
      var sections = Status.versions[version];
      var $blocks = $('.system.' + version + ' .blocks');
      var errors = 0;
      var called = 0;
      var length = Object.keys(sections).length;

      $blocks.empty();

      for (var section in sections) {
        (function request (section) {
          var code = Status.codes[section];
          var path = sections[section];
          var $template = $('[data-template="block"] span').clone();

          $template.addClass('pending');
          $template.attr('title', code);
          $blocks.append($template);

          return Status.call(server, path, function (status, error) {
            called++;
            errors += (error == 'timeout' || !status ? 1 : 0);
            $template.removeClass('pending').addClass(error == 'timeout' ? 'warning' : (status ? 'ok' : 'down'));

            if (called === length && version === 'v3') {
              var status = "ok";

              if (errors > 3) {
                status = "error";
              } else if (errors) {
                status = "warning";
              }

              $overall.empty().removeClass('pending').addClass(status).html('<p>' + Status.messages[status] + '</p>');
            }

            return;
          });
        })(section);
      }
    })(version);
  }

  return;
};

Status.check();