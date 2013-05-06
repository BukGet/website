slug: stats
title: Stats

### Invalid Versioning List <small><a class="show_hide" href="#" rel="#naughty">View</a></small>

The invalid version list is a list of plugins that have had to be switched over to using the BukkitDev versioning instead of the plugin.yml versioning.  This happens when it is detected that there are 3 or more plugins with only 1 unique version between them (e.g. All of the plugin versions are considered v0.1 in the plugin.yml).  This generally indicates that the plugin developer hasn't been updating their plugin.yml to reflect new versions of their code and you should not trust the versioning indicated by the server for these plugins.

<div id="naughty" style="display: none;"></div>
----

### API Status

<div id="svccheck"></div>

<script type="text/javascript">
    $(document).ready(function(){
        naughty_list();
        check_service();
    });
</script>