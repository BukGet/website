slug: docs/API2
title: Deprecated api2 Documentation
status: hidden

### Document Format

This document uses the following conventions:

* Variables are denoted as {VARIABLE}
* All example output is mono-spaced
* Query variables are placed after a question mark at the end of a URL.  Example: "/2/?size=2"
* Fields are represented based on how deep into the document they are with dot notation.  This mimics how the queries are called.
* The hostname used by all calls is: dev.bukget.org


## API2 Reference

### Generation Information

__Description:__

Contains various information about the last several generations in the API.  Includes things like when, what server, parsing type, how long it took, and what changes had occurred.  Optionally the user can specify how many generations back they would like to look.

__URLs:__

* /2/
* /2/geninfo

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

The plug-in listing is simply a list of plug-ins in the API.  The information can be represented however the user wishes by modifying the query attributes and pagination directly from the API is also supported.  Optionally the information can further be narrowed down based on the server platform the plug-ins are written for (e.g. bukkit).

__URLs:__

* /2/plugins

__Query Variables:__

* _fields:_ Lists the fields that are to be returned.  This can be either inclusive or exclusive, however not both.  For an inclusive example, you could specify "fields=slug,description" to only return those fields, or you can specify "fields=-versions" to return everything except for the versions information.  Keep in mind the more you ask for, the more data that will come back and it may take longer to process.
* _start:_ how many documents in do you want to do before starting to display content.  This variable is used with size specifically for pagination.  The default is 0
* _size:_ How many documents do you want to return.  This variable is used with start specifically for pagination.  The default behavior is to return all documents.
* _sort:_ How do you want your data sorted?  Simply specify a field here to sort by that field.  Optionally using a "-" before the field name (denoting a negative value) the API will perform an inverse sort.

__Field Descriptions:__

For Field Descriptions, Please see the Plug-in Details entry.

__Example Output:__

	:::json
	[
	    {
	        "description": "",
	        "plugin_name": "abag",
	        "slug": "abag"
	    },
	    {
	        "description": "Get who used the vehicle as last and who placed it.",
	        "plugin_name": "AbandonedCarts",
	        "slug": "abandonedcarts"
	    }
	]


### Plug-in Details

__Description:__

The plugin details listing all of the information we know about a given plugin.  Optionally a specific plugin version can be specified, only displaying that version in the versions list.

__URLs:__

* /2/{SERVER}/plugin/{SLUG}
* /2/{SERVER}/plugin/{SLUG}/{VERSION}

__Query Variables:__

* _fields:_ Lists the fields that are to be returned.  This can be either inclusive or exclusive, however not both.  For an inclusive example, you could specify "fields=slug,description" to only return those fields, or you can specify "fields=-versions" to return everything except for the versions information.  Keep in mind the more you ask for, the more data that will come back and it may take longer to process.  By default will use "slug,plugin_name,description".
* _size:_ How many versions do you want to return back in the versions list?  User input can only be an integer.  By default this is set to "all"

__Field Descriptions:__

* _name:_ The canonical name (example, BukkitDev slug name).  This name is exclusive and cannot be changed.
* _plugname:_ The name of the plug-ins.  This is non-exclusive and multiple plugins could have the same name.
* _repo:_ The server binary that this plugin is compatible with.  For example, 'bukkit' would denote a bukkit plug-in.
* _categories:_ List of categories that this plug-in falls under.
* _authors:_ List of authors that wrote this plug-in.
* _link:_ The BukkitDev URL for this plug-in (Bukkit Only).
* _description:_ A short description of the plug-in.
* _versions:_ A list of version dictionaries.
* _versions.version:_ The version number.
* _versions.md5:_ The MD5Sum of the version download.
* _versions.filename:_ Version download filename.
* _versions.link:_ URL for version specific page.
* _versions.download:_ The download URL for this version.
* _versions.type:_ The version type.
* _versions.status:_ The BukkitDev version status (Bukkit Only).
* _versions.game_versions:_ List of server versions that this specific plug-in version supports.
* _versions.date:_ Date Released
* _versions.hard_dependencies:_ List of plug-ins that are required for this plug-in to run.
* _versions.soft_dependencies:_ List of plug-ins that this plug-ins can optionally depend on.
* _versions.commands:_ List of command dictionaries detailing what commands this plug-ins has (if parsable).
* _versions.permissions:_ List of permission dictionaries details what permissions this plug-in has (if parseable).
* _versions.commands.usage:_ Usage Description to be displayed to the user.
* _versions.commands.alias:_ List of aliases for this command.
* _versions.commands.command:_ The command name.
* _versions.commands.permission:_ The permission this command relies on.
* _versions.commands.permission_message:_ The message displayed if a user tries to run the command without permissions to.
* _versions.permissions.role:_ Role name.
* _versions.permissions.default:_ Default permission for this role.  Example, in Bukkit, there are 4 possibilities ("op", "not op", true, false).

__Example Output:__

	:::json
	{
	    "website": "http://dev.bukkit.org/server-mods/abacus/",
	    "dbo_page": "http://dev.bukkit.org/server-mods/abacus",
	    "description": "Offers ability to perform calculations while in Minecraft",
	    "logo_full": "",
	    "versions": [
	        {
	            "status": "Semi-normal",
	            "commands": [
	                {
	                    "usage": "",
	                    "aliases": [],
	                    "command": "abacus",
	                    "permission-message": "§cYou do not have access to that command.",
	                    "permission": "abacus.abacus"
	                }
	            ],
	            "changelog": "LONG STRING OF STUFF!!!!!",
	            "game_versions": [
	                "CB 1.4.5-R0.2"
	            ],
	            "filename": "Abacus.jar",
	            "hard_dependencies": [],
	            "date": 1353964798,
	            "version": "0.9.3",
	            "link": "http://dev.bukkit.org/server-mods/abacus/files/4-abacus-v0-9-2-cb-1-4-5-r0-2-compatible-w-1-3-2/",
	            "download": "http://dev.bukkit.org/media/files/650/288/Abacus.jar",
	            "md5": "1e1b6b6e131c617248f98c53bf650874",
	            "type": "Beta",
	            "slug": "4-abacus-v0-9-2-cb-1-4-5-r0-2-compatible-w-1-3-2",
	            "soft_dependencies": [],
	            "permissions": [
	                {
	                    "default": "op",
	                    "role": "abacus.*"
	                },
	                {
	                    "default": true,
	                    "role": "abacus.abacus"
	                }
	            ]
	        },

	    ],
	    "plugin_name": "Abacus",
	    "server": "bukkit",
	    "authors": [
	        "Feaelin <iain@ruhlendavis.org>"
	    ],
	    "logo": "",
	    "slug": "abacus",
	    "categories": [
	        "Informational"
	    ],
	    "stage": "Beta"
	}


### Plug-in Download

__Description:__

This URL is a convenience function to redirect to the download page of the plug-in version specified.  Optionally the latest version can always be selected by using the "latest" word in place of a specific version.

__URLs:__

* /2/{SERVER}/plugin/{SLUG}/{VERSION}/download
* /2/{SERVER}/plugin/{SLUG}/latest/download


### Category Listing

A list of categories in the database.

__URLs:__

* /2/categories

__Example Output:__

	:::json
	[
	    "Admin Tools",
	    "Anti-Griefing Tools",
	    "Chat Related"
	]


### Category Plugin List

__Description:__

A plug-in listing based on the category referenced.  Behaves the same as the main plugin listing.

__URLs:__

* /2/{SERVER}/category/<CATEGORY NAME>

__Query Variables:__

See Plug-in Listing for reference.

__Field Description:__

See Plug-in Listing for reference.

__Example Output:__

See Plug-in Listing for reference.


### Author Listing

A list of plug-in authors in the database.

__URLs:__

* /2/authors

__Example Output:__

	:::json
	[
	    "0xfffc69",
	    "14nicholasse",
	    "15kingben",
	    "1am3r"
	]


### Author Plugin List

__Description:__

A plug-in listing based on the author referenced.  Behaves the same as the main plugin listing.

__URLs:__

* /2/{SERVER}/author/<AUTHOR NAME>

__Query Variables:__

See Plug-in Listing for reference.

__Field Description:__

See Plug-in Listing for reference.

__Example Output:__

See Plug-in Listing for reference.


### Plugin Searching

__Description:__

A generalized search function to allow users to look for specific content.  Any field can be used for searching as long as you use dot notation to tell the engine where to look.

__URLs:__

* /2/search [POST]
* /2/search/{FIELD}/{ACTION}/{VALUE}


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