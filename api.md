§FORMAT: 1A
HOST: https://api.bukget.org

# BukGet API Documentation
## About
BukGet is an API for getting data about bukkit plugins. The system parses [BukkitDev](http://dev.bukkit.org) every 6 hours and looks for new changes in the data to update. All of this is automatic and happens without any developer intervention. If you notice any issues, we encourage you to open a ticket with us over at the [issue tracker](https://github.com/Bukget/api/issues). This is the only way we can know about parser errors or issues and make any needed corrections. Below is the schedule that BukGet uses for generating the data. Keep in mind that if you update a plugin, it can take just over 6 hours for your plugin to hit the index.
The API is served over both HTTP and HTTPS.

|Type                   |Times (CST)                            |
|----------------------:|:--------------------------------------|
|__Normal/Speedy:__     | Every 6 hours (0000, 0600, 1200, 1800)|
|__Status Update:__     | Weekly (0000 Saturday)                |
|__Full Generation:__   | As Needed                             |
|__Ad-Hoc Updates:__    | As Needed/Ticket Request              |

## Recommended usage guidelines
We recommend that when communicating to the API, that you use a custom User-Agent string (UA String) to identify your application. We are tracking these UA strings and are using these to determine what applications are utilizing the API. If you have any questions about User Agent strings, please contact us in the IRC channel.

## Exposed internal flags

The following items may be exposed via the API, however these are used internally by the parser and/or the APIs and are not intended for general use.

+ _use_dbo: This is an internal flag that is set on a plugin to denote that the plugin parser will use the version parsed from the DBO page over the plugin.yml version. This is pragmatically set when 3 or more plugin versions exist when there is only one unique plugin version pulled from the plugin.yml.

# Group General

## Generation Information [/3/geninfo{?size}]
Returns information about the last several generations in the API. Includes things like when, what server, parsing type, how long it took, and what changes had occurred. Optionally the user can specify how many generations back they would like to look.
+ Parameters

    + size (optional, Integer, `1`) ... How many generations you want info about.

+ Model

    + Headers

            Content-Type: application/json

    + Body

            [
                {
                    "timestamp": 1395680823, // The current UNIX timestamp that the Generation started at.
                    "parser": "bukkit", // The parser that this generation was run with.
                    "changes": [ // A list of the changes that had occurred in the API.
                        {
                            "version": "1.0.0", // The version of the plugin that was updated.
                            "plugin": "joincommands" // The plugin slug that was updated.
                        },
                        {
                            "version": "0.1",
                            "plugin": "cakegiver"
                        },
                        {
                            "version": "1.3.1",
                            "plugin": "emotionz"
                        },
                        {
                            "version": "2.3.1",
                            "plugin": "minecraftspells"
                        },
                        {
                            "version": "2.9.1",
                            "plugin": "safewgtool-swgt"
                        },
                        {
                            "version": "1.1.9",
                            "plugin": "archer"
                        },
                        {
                            "version": "1.1",
                            "plugin": "plugin-dispenser"
                        }
                    ],
                    "duration": 421, // The number of seconds it took to complete the generation.
                    "type": "speedy", // The type of generation that was run (speedy, full are some examples).
                    "id": "53306637a8f070843817cdfb" // The ID of the generation.
                }
            ]

### Generation Information [GET]
Examples:
```no-highlight
http://api.bukget.org/3/geninfo
http://api.bukget.org/3/geninfo?size=10
```

+ Response 200
    
    [Generation Information][]


## Specific Generation Information [/3/geninfo/{id}]
Returns information about a specific generation in the API. Includes things like when, what server, parsing type, how long it took, and what changes had occurred.
+ Model

    + Headers

            Content-Type: application/json

    + Body

            {
                "timestamp": 1395680823, // The current UNIX timestamp that the Generation started at.
                "parser": "bukkit", // The parser that this generation was run with.
                "changes": [ // A list of the changes that had occurred in the API.
                    {
                        "version": "1.0.0", // The version of the plugin that was updated.
                        "plugin": "joincommands" // The plugin slug that was updated.
                    },
                    {
                        "version": "0.1",
                        "plugin": "cakegiver"
                    },
                    {
                        "version": "1.3.1",
                        "plugin": "emotionz"
                    },
                    {
                        "version": "2.3.1",
                        "plugin": "minecraftspells"
                    },
                    {
                        "version": "2.9.1",
                        "plugin": "safewgtool-swgt"
                    },
                    {
                        "version": "1.1.9",
                        "plugin": "archer"
                    },
                    {
                        "version": "1.1",
                        "plugin": "plugin-dispenser"
                    }
                ],
                "duration": 421, // The number of seconds it took to complete the generation.
                "type": "speedy", // The type of generation that was run (speedy, full are some examples).
                "id": "53306637a8f070843817cdfb" // The ID of the generation.
            }

### Specific Generation Information [GET]
Example:
```no-highlight
http://api.bukget.org/3/geninfo/53306637a8f070843817cdfb
```
+ Response  200

    [Specific Generation Information][]

# Group Plugins

## Plugin Listing [/3/plugins/{server}{?size,start,fields,sort}]
The plugin listing is simply a list of plugins in the API. The information can be represented however the user wishes by modifying the query attributes and pagination directly from the API. Optionally the information can further be narrowed down based on the server platform the plugins are written for (e.g. bukkit).

+ Parameters

    + server (optional, String, `bukkit`) ... For what server binary the plugins should be.
    + size (optional, Integer, `10`) ... How many documents do you want to return.
    + start (optional, Integer, `5`) ... From where the query should start.
    + sort (optional, String, `plugin_name`) ... Which field to sort by. Use a - before the field name to perform an inverted sort.
    + fields (optional, String, `slug,plugin_name,description`) ... Which fields the request should return.
+ Model

    + Headers

            Content-Type: application/json

    + Body

            // For field descriptions, Please see the plugin details entry.
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

### Plugin Listing [GET]
Examples:
```no-highlight
http://api.bukget.org/3/plugins
http://api.bukget.org/3/plugins?size=10
http://api.bukget.org/3/plugins/bukkit?size=10&start=10
```

+ Response 200
    
    [Plugin Listing][]

## Plugin Details [/3/plugins/{server}/{slug}/{version}{?size,fields}]
The plugin details listing all of the information we know about a given plugin.

+ Parameters

    + server (required, String, `bukkit`) ... For what server binary the plugins should be.
    + slug (required, String, `abacus`) ... The slug of the plugin you want details for
    + version (optional, String, `latest`) ... The specific version that you want, can also be `latest` for the latest version, or `release`, `beta`, `alpha` for the latest version of that type.
    + size (optional, Integer, `10`) ... How many versions (if applicable) do you want to return.
    + fields (optional, String, `slug,plugin_name,description`) ... Which fields the request should return.
+ Model

    + Headers

            Content-Type: application/json

    + Body

            {
                "website": "http://dev.bukkit.org/server-mods/abacus/", // The web-site of the plugin
                "dbo_page": "http://dev.bukkit.org/server-mods/abacus", // The BukkitDev URL for this plugin (Bukkit Only).
                "description": "Offers ability to perform calculations while in Minecraft", // A short description of the plugin.
                "logo_full": "", // The full-size logo from the plugin’s BukkitDev page (Bukkit Only).
                "versions": [ // A list of version objects.
                    {
                        "status": "Semi-normal", // The BukkitDev version status (Bukkit Only).
                        "commands": [ // List of command objects detailing what commands this plugins has (if parsable).
                            {
                                "usage": "", // Usage Description to be displayed to the user.
                                "aliases": [], // List of aliases for this command.
                                "command": "abacus", // The command name.
                                "permission-message": "§cYou do not have access to that command.", // The message displayed if a user tried to run the command without permissions to.
                                "permission": "abacus.abacus" // The permission this command relies on.
                            }
                        ],
                        "changelog": "LONG STRING OF STUFF!!!!!", // Base64 Encoded string of the version changelog.
                        "game_versions": [ // List of server versions that this specific plug-in version supports.
                            "CB 1.4.5-R0.2"
                        ],
                        "filename": "Abacus.jar", // Version download filename.
                        "hard_dependencies": [], // List of plugins that are required for this plugin to run.
                        "date": 1353964798, // Date Released
                        "version": "0.9.3", // The version number.
                        "link": "http://dev.bukkit.org/server-mods/abacus/files/4-abacus-v0-9-2-cb-1-4-5-r0-2-compatible-w-1-3-2/", // URL for version specific page.
                        "download": "http://dev.bukkit.org/media/files/650/288/Abacus.jar", // The download URL for this version.
                        "md5": "1e1b6b6e131c617248f98c53bf650874", // The MD5Sum of the version download.
                        "type": "Beta", // The version type. 
                        "slug": "4-abacus-v0-9-2-cb-1-4-5-r0-2-compatible-w-1-3-2", // The canonical name of this version (example, BukkitDev version slug). This is exclusive to a plugin and cannot be changed.
                        "soft_dependencies": [], // List of plugins that this plugins can optionally depend on.
                        "permissions": [ // List of permission dictionaries details what permissions this plugin has (if parseable).
                            {
                                "default": "op", // Default permission for this role. Example, in Bukkit, there are 4 possibilities (“op”, “not op”, true, false).
                                "role": "abacus.*" // Role name.
                            },
                            {
                                "default": true,
                                "role": "abacus.abacus"
                            }
                        ]
                    },

                ],
                "plugin_name": "Abacus", // The name of the plugin. This is non-exclusive and multiple plugins could have the same name.
                "popularity": {
                    "monthly": 133, // The popularity score over the last 30 days.
                    "daily": 994, // The most current popularity score of the plugin.
                    "weekly": 238, // The popularity score over the last 7 days.
                    "total": 1500, // The popularity score since the API added the plugin.
                },
                "server": "bukkit", // The server binary that this plugin is compatible with. For example, ‘bukkit’ would denote a bukkit plugin.
                "main": "org.ruhlendavis.mc.abacus.Abacus", // This is the main field in the plugin.yml. Bukkit uses this to identify the plugin internally. This is usually the main class.
                "authors": [ // List of authors that wrote this plug-in.
                    "Feaelin {iain@ruhlendavis.org}"
                ],
                "logo": "", // A thumb-nailed version of the logo from the plugin’s BukkitDev page (Bukkit Only).
                "slug": "abacus", // The canonical name (example, BukkitDev slug name). This name is exclusive and cannot be changed.
                "categories": [ // List of categories that this plugin falls under.
                    "Informational"
                ],
                "stage": "Beta" // What BukkitDev stage the plugin is in.
            }

### Plugin Details [GET]
Examples:
```no-highlight
http://api.bukget.org/3/plugins/bukkit/abacus
http://api.bukget.org/3/plugins/bukkit/abacus?size=1&fields=slug,plugin_name,versions
http://api.bukget.org/3/plugins/bukkit/abacus/latest
http://api.bukget.org/3/plugins/bukkit/abacus/0.9.3?size=1&fields=slug,plugin_name,versions
```

+ Response 200
    
    [Plugin Details][]

+ Response 404

    + Headers

            Content-Type: application/json

    + Body

            {
                "error": "Plugin Does Not Exist"
            }

## Plugin Download [/3/plugins/{server}/{slug}/{version}/download]
This URL is a convenience function to redirect to the download page of the plugin version specified. Optionally the latest version can always be selected by using the “latest” word in place of a specific version.

+ Parameters

    + server (required, String, `bukkit`) ... For what server binary the plugins should be.
    + slug (required, String, `abacus`) ... The slug of the plugin you want details for
    + version (required, String, `latest`) ... The specific version that you want, can also be `latest` for the latest version, or `release`, `beta`, `alpha` for the latest version of that type.
+ Model
    + Body
        http://dev.bukkit.org/media/files/650/288/Abacus.jar

### Plugin Download [GET]
Examples:
```no-highlight
http://api.bukget.org/3/plugins/bukkit/abacus/latest/download
http://api.bukget.org/3/plugins/bukkit/abacus/0.9.3/download
```

+ Response 302
    
    [Plugin Download][]

+ Response 404

    + Headers

            Content-Type: application/json

    + Body

            {
                "error": "could not find version"
            }

# Group Categories

## Category Listing [/3/categories]
    A list of categories in the database and the number of plugins that each category has.
+ Model

    + Headers

            Content-Type: application/json

    + Body

            [
                {
                    "count": 2732, // Number of plugins in this category.
                    "name": "Admin Tools" // Category name.
                },
                {
                    "count": 786,
                    "name": "Anti-Griefing Tools"
                },
                {
                    "count": 979,
                    "name": "Chat Related"
                },
            ]

### Category Listing [GET]
Examples:
```no-highlight
http://api.bukget.org/3/categories
```

+ Response 200
    
    [Category Listing][]

## Category Plugin Listing [/3/categories/{server}/{category}{?size,start,fields,sort}]
A plugin listing based on the category referenced. Behaves the same as the main plugin listing. Optionally you can restrict the view based on the server binary compatibility.

+ Parameters

    + server (optional, String, `bukkit`) ... For what server binary the plugins should be.
    + category (required, String, `bukkit`) ... The name of the category.
    + size (optional, Integer, `10`) ... How many documents do you want to return.
    + start (optional, Integer, `5`) ... From where the query should start.
    + sort (optional, String, `plugin_name`) ... Which field to sort by. Use a - before the field name to perform an inverted sort.
    + fields (optional, String, `slug,plugin_name,description`) ... Which fields the request should return.
+ Model

    + Headers

            Content-Type: application/json

    + Body

            // For field descriptions, Please see the plugin details entry.
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

### Category Plugin Listing [GET]
Examples:
```no-highlight
http://api.bukget.org/3/categories/Anti-Griefing%20Tools
http://api.bukget.org/3/categories/Anti-Griefing%20Tools?size=20
http://api.bukget.org/3/categories/bukkit/Anti-Griefing%20Tools?size=20
```

+ Response 200
    
    [Category Plugin Listing][]

# Group Authors

## Author Listing [/3/authors]
A list of plugin authors in the database and the number of plugins that each author has worked on.
+ Model

    + Headers

            Content-Type: application/json

    + Body

            [
                {
                    "count": 1, // Number of plugins in this category.
                    "name": "0xfffc69" // Author name.
                },
                {
                    "count": 2,
                    "name": "14nicholasse"
                },
                {
                    "count": 3,
                    "name": "15kingben"
                },
            ]

### Author Listing [GET]
Examples:
```no-highlight
http://api.bukget.org/3/authors
```

+ Response 200
    
    [Author Listing][]

## Author Plugin Listing [/3/authors/{server}/{author}{?size,start,fields,sort}]
A plugin listing based on the author referenced. Behaves the same as the main plugin listing. Optionally you can restrict the view based on the server binary compatibility.

+ Parameters

    + server (optional, String, `bukkit`) ... For what server binary the plugins should be.
    + author (required, String, `bukkit`) ... The name of the author.
    + size (optional, Integer, `10`) ... How many documents do you want to return.
    + start (optional, Integer, `5`) ... From where the query should start.
    + sort (optional, String, `plugin_name`) ... Which field to sort by. Use a - before the field name to perform an inverted sort.
    + fields (optional, String, `slug,plugin_name,description`) ... Which fields the request should return.
+ Model

    + Headers

            Content-Type: application/json

    + Body

            // For field descriptions, Please see the plugin details entry.
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

### Author Plugin Listing [GET]
Examples:
```no-highlight
http://api.bukget.org/3/authors/iAlexak
http://api.bukget.org/3/authors/iAlexak?size=1
http://api.bukget.org/3/authors/bukkit/iAlexak?size=1
```

+ Response 200
    
    [Author Plugin Listing][]

# Group Update
## Updates [/3/updates/{?slugs,hashes, filenames}]
Outputs the latest, latest release, beta, alpha, versions for each plugin found.

+ Parameters
    + slugs (optional, String, `worldedit,dynmap`) ... Which slug(s) to search for.
    + hashes (optional, String, `49ab15446ae1bfce8801433cd75f8fc9`) ... Which file md5(s) to search for.
    + filenames (optional, String, `dynmap-1.9.3.jar`) ... Which filename(s) to search for.

+ Model

    + Headers

            Content-Type: application/json

    + Body

            [
                {
                    "slug": "abitofrealism", // Plugin slug
                    "plugin_name": "AbitOfRealism", // Plugin name
                    "versions": { // List of version objects
                        "latest": { // Version type
                            "version": "0.3.1", // Version
                            "download": "http://dev.bukkit.org/media/files/599/604/AbitOfRealism.jar", // Download link
                            "md5": "236c18df1d15e149fe91675c08efa8b5" // File md5
                        },
                        "beta": {
                            "version": "0.3.1",
                            "download": "http://dev.bukkit.org/media/files/599/604/AbitOfRealism.jar",
                            "md5": "236c18df1d15e149fe91675c08efa8b5"
                        },
                        "alpha": {
                            "version": "0.1",
                            "download": "http://dev.bukkit.org/media/files/596/293/AbitOfRealism.jar",
                            "md5": "2458133b2813b66e2c162ce7bbdf5c18"
                        }
                    }
                }
            ]

### Updates [GET]
Examples:
```no-highlight
http://api.bukget.org/3/updates?slugs=dynmap,worldedit
http://api.bukget.org/3/updates?hashes=49ab15446ae1bfce8801433cd75f8fc9
http://api.bukget.org/3/updates?slugs=worldedit&hashes=49ab15446ae1bfce8801433cd75f8fc9&filenames=dynmap-1.9.3.jar
```

+ Response 200
    
    [Updates][]

### Updates [POST]

+ Response 200
    
    [Updates][]

# Group Search

## Plugin Search [/3/search/{field}/{action}/{value}{?size,start,fields,sort}]
A generalized search function to allow users to look for specific content. Any field can be used for searching as long as you use dot notation to tell the engine where to look.

Valid actions:
* _equals:_ Field equals value.
* _not-equals:_ Field is not Equal to value.
* _less:_ Field is less than value.
* _less-equal:_ Field is less than or equal to value.
* _more:_ Field is greater than value.
* _more-equal:_ Field is greater than or equal to value.
* _like:_ Field is like (partial match) to value.

+ Parameters

    + size (optional, Integer, `10`) ... How many documents do you want to return.
    + start (optional, Integer, `5`) ... From where the query should start.
    + sort (optional, String, `plugin_name`) ... Which field to sort by. Use a - before the field name to perform an inverted sort.
    + fields (optional, String, `slug,plugin_name,description`) ... Which fields the request should return.
+ Model

    + Headers

            Content-Type: application/json

    + Body

            // For field descriptions, Please see the plugin details entry.
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

### Plugin Search [GET]
Examples:
```no-highlight
http://api.bukget.org/3/search/slug/like/world
http://api.bukget.org/3/search/slug/like/world?size=10
```

+ Response 200
    
    [Plugin Search][]

## POST Plugin Search [/3/search]
A generalized search function to allow users to look for specific content. Any field can be used for searching as long as you use dot notation to tell the engine where to look.

Valid actions:
* _equals:_ Field equals value.
* _not-equals:_ Field is not Equal to value.
* _less:_ Field is less than value.
* _less-equal:_ Field is less than or equal to value.
* _more:_ Field is greater than value.
* _more-equal:_ Field is greater than or equal to value.
* _like:_ Field is like (partial match) to value.
* _in:_ Field is in the list of of values provided.
* _not in:_ Field is not in the list of values provided.
* _all:_ Field contains all of the values in the list provided.
* _exists:_ Field exists.
* _and:_ All values in list provided are matching. See example below.
* _or:_ Some values in the list of objects provided are matching. See example below.
* _nor:_ No values in the list of objects provided are matching. See example below.
* _not:_ Performs a logical NOT operation on the specified expressions. See example below.

Filters examples:
```
[
    {
        "field": "plugin_name",
        "action": "like",
        "value": "mc"
    },
    {
        "field": "versions.game_version",
        "action": "like",
        "value": "1.4.5"
    }
]
```
`AND` example:
```
[
    {
        "field": "",
        "action": "and",
        "value": [
            {
                "stage": "Release"
            },
            {
                "slug": "abitofrealism"
            }
        ]
    }
]
```
`OR` example:
```
[
    {
        "field": "",
        "action": "or",
        "value": [
            {
                "slug": "abitofrealism"
            },
            {
                "slug": "clearthechat"
            }
        ]
    }
]
```
`NOR` example:
```
[
    {
        "field": "",
        "action": "nor",
        "value": [
            {
                "slug": "abitofrealism"
            },
            {
                "slug": "clearthechat"
            }
        ]
    }
]
```
`NOT` example:
```
{
    "field": "curse_id",
    "action": "not",
    "value": { 
        "$lt": 48244 // Usually less than 48244, now where it's not less than 48244
    }
}
```

+ Parameters

    + filters (Required, String, ``) ... JSON encoded, refer to the example format for the filters field above.
    + size (optional, Integer, `10`) ... How many documents do you want to return.
    + start (optional, Integer, `5`) ... From where the query should start.
    + sort (optional, String, `plugin_name`) ... Which field to sort by. Use a - before the field name to perform an inverted sort.
    + fields (optional, String, `slug,plugin_name,description`) ... Which fields the request should return.
+ Model

    + Headers

            Content-Type: application/json

    + Body

            // For field descriptions, Please see the plugin details entry.
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

### POST Plugin Search [POST]
+ Response 200
    
    [POST Plugin Search][]

# Group Statistics

## Invalid versions list [/stats/naughty_list]
The invalid version list is a list of plugins that have had to be switched over to using the BukkitDev versioning instead of the plugin.yml versioning. This happens when it is detected that there are 3 or more plugins with only 1 unique version between them (e.g. All of the plugin versions are considered v0.1 in the plugin.yml). This generally indicates that the plugin developer hasn’t been updating their plugin.yml to reflect new versions of their code and you should not trust the versioning indicated by the server for these plugins.
+ Model

    + Headers

            Content-Type: application/json

    + Body

            [
                {
                    "plugin_name": "ClearTheChat",
                    "authors": [
                        "FlavourFlave"
                    ],
                    "slug": "youclearthechat"
                },
                {
                    "plugin_name": "Improved Jail",
                    "authors": [
                        "UntoldAdventures"
                    ],
                    "slug": "improvedjail"
                },
                {
                    "plugin_name": "EasySave",
                    "authors": [
                        "kamakarzy"
                    ],
                    "slug": "easysave"
                }
            ]

### Invalid versions list [GET]
Example:
```no-highlight
http://api.bukget.org/stats/naughty_list
```

+ Response 200
    
    [Invalid versions list][]



## Current statistics [/stats/todays_trends]
Returns amount of plugins and versions that is currently available in the API.
+ Model

    + Headers

            Content-Type: application/json

    + Body

            {
                "plugin_count": 14633,
                "version_count": 69861
            }

### Current statistics [GET]
Example:
```no-highlight
http://api.bukget.org/stats/todays_trends
```

+ Response 200
    
    [Current statistics][]

## Trends [/stats/trend/{days}]
Returns traffic info about the API.
+ Parameters

    + days (required, Integer, `5`) ... How many days of trends that should be returned
+ Model

    + Headers

            Content-Type: application/json

    + Body

            [
                {
                    "bukkitdev": 0,
                    "unique": 10792, // Unique IPs
                    "api3": 405927, // Total requests for API 3
                    "timestamp": 1395658808, // When these statistics were generated
                    "total": 646741, // Total requests
                    "user_agents": { // List of useragents with number of requests
                        "restler": 661,
                        "python-requests": 52,
                        "appengine-google;": 1,
                        "mcma2": 19703,
                        "tcadmin": 954,
                        "global7hosting": 14,
                        "bertware": 26925,
                        "adminium": 168,
                        "clanslots": 37,
                        "pluginupdater": 493,
                        "httpclient": 33
                    }
                },
                {
                    "bukkitdev": 0,
                    "unique": 12230,
                    "api3": 442621,
                    "timestamp": 1395572409,
                    "total": 646741,
                    "user_agents": {
                        "python-requests": 84,
                        "mcma2": 24268,
                        "tcadmin": 703,
                        "global7hosting": 16,
                        "bertware": 31411,
                        "adminium": 71,
                        "clanslots": 1,
                        "pluginupdater": 362
                    }
                }
            ]

### Trends [GET]
Example:
```no-highlight
http://api.bukget.org/stats/trend/10
```

+ Response 200
    
    [Trends][]