slug: docs/API1
title: Legacy API1 Documentation
status: hidden

### Document Format

This document uses the following conventions:

* Variables are denoted as {VARIABLE}
* All example output is mono-spaced
* Query variables are placed after a question mark at the end of a URL.  Example: "/1/?size=2"
* Fields are represented based on how deep into the document they are with dot notation.  This mimics how the queries are called.
* The hostname used by all calls is: __api.bukget.org__


## API1 Reference

### Generation Information

__Description:__

Contains various information about the last several generations in the API.  Includes things like when, what server, parsing type, how long it took, and what changes had occurred.  Optionally the user can specify how many generations back they would like to look.

__URLs:__

* /1/
* /1/geninfo

__Query Variables:__

* _size:_ Denotes the number of generations back you want to look.  By default this is set to 1.

__Field Descriptions:__

* _timestamp:_ The current UNIX time-stamp that the Generation started at.
* _duration:_ The number of seconds it took to complete the generation.
* _parser:_ The parser that this generation was run with.
* _type:_ The type of generation that was run (speedy, full, status-update are some examples).
* _changes:_ A list of the changes that had occurred in the API.
* _changes.version:_ The version of the plug-in that was updated
* _changes.plugin:_ The plug-in slug that was updated.

__Example Output:__

	:::json
	[
	    {
	        "timestamp": 1355967522,
	        "parser": "bukkit",
	        "type": "speedy",
	        "duration": 943,
	        "changes": [
	            {
	                "version": "9.5.3",
	                "plugin": "preciousstones"
	            },
	            {
	                "version": "1.0",
	                "plugin": "bankit"
	            }
	        ],
	        "id": "50d26c2270164b5889ab6f67"
	    }
	]


### Plug-in Listing

__Description:__

The plugin listing is simply a list of plug-ins in the API.

__URLs:__

* /1/plugins

__Field Descriptions:__

For Field Descriptions, Please see the Plug-in Details entry.

__Example Output:__

	:::json
	[
		"a5h73y",
		"abacus",
		"abag",
		"abandonedcarts",
		"abilitytrader",
		"abitofrealism",
		"aboot",
		"absorbchests",
		"acc",
		"acceptdarules",
		"acceptrules",
		"accesscontrol",
		"accessories",
	]


### Plug-in Details

__Description:__

The plugin details listing all of the information we know about a given plug-in.  Optionally a specific plug-in version can be specified, only displaying that version in the versions list.

__URLs:__

* /1/plugin/{SLUG}
* /1/plugin/{SLUG/VERSION}
* /1/plugin/{SLUG}/latest

__Field Descriptions:__

* _name:_ The canonical name (example, BukkitDev slug name).  This name is exclusive and cannot be changed.
* _plugin_name:_ The name of the plug-ins.  This is non-exclusive and multiple plug-ins could have the same name.
* _categories:_ List of categories that this plug-in falls under.
* _authors:_ List of authors that wrote this plug-in.
* _bukkitdev_link:_ The BukkitDev URL for this plug-in.
* _desc:_ A short description of the plug-in.
* _versions:_ A list of version dictionaries.
* _versions.name:_ The version number.
* _versions.filename:_ Version download filename.
* _versions.link:_ URL for version specific page.
* _versions.dl_link:_ The download URL for this version.
* _versions.type:_ The version type.
* _versions.status:_ The BukkitDev version status.
* _versions.game_versions:_ List of server versions that this specific plug-in version supports.
* _versions.date:_ Date Released
* _versions.hard_dependencies:_ List of plug-ins that are required for this plug-in to run.
* _versions.soft_dependencies:_ List of plug-ins that this plug-ins can optionally depend on.

__Example Output:__

	:::json
	{
	    "versions": [
	        {
	            "status": "Semi-normal",
	            "name": "1.4",
	            "game_versions": [
	                "CB 1.3.2-R1.0"
	            ],
	            "dl_link": "http://dev.bukkit.org/media/files/599/576/EasyVanish.jar",
	            "filename": "EasyVanish.jar",
	            "hard_dependencies": [],
	            "date": 1340482973,
	            "version": "1.4",
	            "link": "http://dev.bukkit.org/server-mods/easyvanish/files/6-v1-4/",
	            "type": "Release",
	            "soft_dependencies": []
	        },
	    ],
	    "name": "easyvanish",
	    "plugin_name": "EasyVanish",
	    "authors": [
	        "mbaxter"
	    ],
	    "bukkitdev_link": "http://dev.bukkit.org/server-mods/easyvanish",
	    "desc": "Easy vanishing for simple solutions",
	    "categories": [
	        "Admin Tools"
	    ],
	    "stage": "Release"
	}

### Plug-in Version Checking

__Description:__

This URL is a convenience function to check the latest versions of multiple plug-ins. The call should be comma delimited.

__URLs:__

* /1/plugins/versioncheck/{slugs}

__Example Inputs:__

* /1/plugins/versioncheck/slug1,slug2,slug3

__Example Output:__

	:::json
	{
	    [
	        "name": "slug1",
	        "version": "1.0"
	    ],
	    [
	        "name": "slug2",
	        "version": "1.1"
	    ],
	    [
	        "name": "slug3",
	        "version": "1.0.1"
	    ]
	}


### Plug-in Download

__Description:__

This URL is a convenience function to redirect to the download page of the plug-in version specified.  Optionally the latest version can always be selected by using the "latest" word in place of a specific version.

__URLs:__

* /1/plugin/{SLUG}/{VERSION}/download
* /1/plugin/{SLUG}/latest/download


### Category Listing

A list of categories in the database.

__URLs:__

* /1/categories

__Example Output:__

	:::json
	[
	    "Admin Tools",
	    "Anti-Griefing Tools",
	    "Chat Related"
	]


### Category Plug-in List

__Description:__

A plug-in listing based on the category referenced.  Behaves the same as the main plugin listing.

__URLs:__

* /1/{SERVER}/categories/{CATEGORY NAME}

__Example Output:__

See Plug-in Listing for reference.


### Author Listing

A list of plug-in authors in the database.

__URLs:__

* /1/authors

__Example Output:__

	:::json
	[
	    "0xfffc69",
	    "14nicholasse",
	    "15kingben",
	    "1am3r"
	]


### Author Plug-in List

__Description:__

A plug-in listing based on the author referenced.  Behaves the same as the main plugin listing.

__URLs:__

* /1/author/{AUTHOR NAME}

__Example Output:__

See Plug-in Listing for reference.


### Plug-in Searching

__Description:__

A generalized search function to allow users to look for specific content.  Any field can be used for searching as long as you use dot notation to tell the engine where to look.

__URLs:__

* /1/search/{FIELD}/{ACTION}/{VALUE}

__Valid Actions:__

* _=:_ Field equals value.
* _!=:_ Field is not Equal to value.
* _<:_ Field is less than value.
* _<=:_ Field is less than or equal to value.
* _>:_ Field is greater than value.
* _>=:_ Field is greater than or equal to value.
* _like:_ Field is like (partial match) to value.

__Query Variables:__

See Plug-in Listing for reference.

__Field Description:__

See Plug-in Listing for reference.

__Example Output:__

See Plug-in Listing for reference.