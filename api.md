§FORMAT: 1A
HOST: http://api.bukget.org

# BukGet API Documentation
## About
BukGet is an API for getting data about bukkit plugins. The system parses [BukkitDev](http://dev.bukkit.org) every 6 hours and looks for new changes in the data to update. All of this is automatic and happens without any developer intervention. Furthermore if you notice any issues, we encourage you to click the issues menu item above and open a ticket with us. This is the only way we can know about parser errors or issues and make any needed corrections. Below is the schedule that BukGet uses for generating the data. Keep in mind that if you update a plugin, it can take just over 6 hours for your plugin to hit the index.

## Recommended usage guidelines
We recommend that when communicating to the API, that you use a custom User-Agent string (UA String) to identify your application. We are tracking these UA strings and are using these to determine what applications are utilizing the API. If you have any questions about User Agent strings, please contact us in the IRC channel.

## Exposed internal flags

The following items may be exposed via the API, however are used internally by the parser and/or the APIs and are not intended for general use.

+ _use_dbo: This is an internal flag that is set on a plugin to denote that the plugin parser will use the version parsed from the DBO page over the plugin.yml version. This is pragmatically set when 3 or more plugin versions exist when there is only one unique plugin version pulled from the plugin.yml.

# Group General

## Generation Information [/3?size={size} or /3/geninfo?size={size}]
Contains various information about the last several generations in the API. Includes things like when, what server, parsing type, how long it took, and what changes had occurred. Optionally the user can specify how many generations back they would like to look.

+ Parameters

    + size (optional, integer, `1`) ... How many generations you want info about.

+ Model

    + Headers

            Content-Type: application/json

    + Body

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

### Generation Information [GET]

+ Response 200
    
    [Generation Information][]

# Group Plugins

## Plugin Listing [/3/plugins{?size,start,fields,sort}]
The plugin listing is simply a list of plugins in the API. The information can be represented however the user wishes by modifying the query attributes and pagination directly from the API is also supported. Optionally the information can further be narrowed down based on the server platform the plugins are written for (e.g. bukkit).

+ Parameters

    + server (optional, String, `bukkit`) ... What server platform to grab plugins for.
    + size (optional, Integer, `10`) ... How many documents do you want to return.
    + start (optional, Integer, `5`) ... From where the query should start.
    + sort (optional, String, `plugin_name`) ... Which field to sort by. Use a - before the field name to perform an inverted sort.
    + fields (optional, String, `slug,plugin_name,description`) ... Which fields the request should return.
+ Model

    + Headers

            Content-Type: application/json

    + Body

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
Get a list of plugins. Example:

```no-highlight
http://api.bukget.org/3/plugins?size=10
```

+ Response 200
    
    [Plugin Listing][]