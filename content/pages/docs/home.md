slug: docs/index
title: Docs

## General Information

NOTE: API3 is currently still in active development and is not stable yet.

BukGet is an API into the [BukkitDev][] data, more specifically the Server-Mods section of the site.  The system parses the data every 3 hours and looks for new changes in the data to update.  All of this is automatic and happens without any developer intervention.  Furthermore if you notice any issues, we encourage you to click the [issues][] menu item above and open a ticket with us.  This is the only way we can know about parser errors or issues and make any needed corrections.  Below is the schedule that BukGet uses for generating the data.  Keep in mind that if you update a plugin, it can take just over 3 hours for your plugin to hit the index.

|Type		    		|Times (GMT)													|
|----------------------:|:--------------------------------------------------------------|
|__Normal/Speedy:__		| Every 3 hours (0000, 0300, 0600, 0900, 1200, 1500, 1800, 2100)|
|__Status Update:__  	| Weekly (0000 Saturday)										|
|__Full Generation:__	| As Needed 													|
|__Ad-Hoc Updates:__	| As Needed/Ticket Request										|

## API Documentation

As backwards compatibility is currently supported from the first API version forward, there are 3 major APIs into the database.  The recommended API is called "api3" or "current".  API3 is also going to be the quickest to respond, as there is no need for data translation into the older API formats.  APIs 1 & 2, while still maintained for compatibility reasons, are slower due to the data translation needed, do not support all of the fields API3 supports, and does not support multi-field searching via HTTP POSTs.

* [API3 Documentation][api3]
* [API2 Documentation][api2]
* [API1 Documentation][api1]

## Exposed Internal Flags

The following items may be exposed via the API, however are used internally by the parser and/or the APIs and are not intended for general use.

* *_use_dbo:* This is an internal flag that is set on a plug-in to denote that the plug-in parser will use the version parsed from the DBO page over the plugin.yml version.  This is pragmatically set when 3 or more plug-in versions exist when there is only one unique plug-in version pulled from the plugin.yml.

## Recommended Usage Guidelines

Nothing here just yet.



[BukkitDev]: http://dev.bukkit.org
[issues]: https://github.com/SteveMcGrath/bukget/issues?state=open
[api3]: API3.html
[api2]: API2.html
[api1]: API1.html