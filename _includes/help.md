## FAQ

#### What is BukGet?

BukGet is an API for getting data about bukkit plugins.  Developed to help plugin developers and
system administrators alike to make plugin installation, upgrades, and
searching with applications (even the server itself) easy and painless.

Originally BukGet was an independent repository system that used a similar
mechanism to python's cheeseshop to allow developers to maintain the content
in BukGet's repository on their own, however it was largly unsuccessful.  When
BukkitDev was released, the API was recoded to fit into the gap that Curse had
created by not releasing a publicly exposed API into the data.

Currently BukGet is a constantly evolving codebase thats trying to dig deeper
and pull ever more information out of BukkitDev and the plugins themselves in
order to provide a feature-rich API for everyone to use.

#### Q: Hey, can you add X, Y, or Z?

The best way to get that on our radar is to file an issue ticket with what you would like.  From there it can be evaluated and determined if and when it could be added into the API. You can file a ticket at our [issue tracker](https://github.com/BukGet/api/issues).

#### Q: How do I talk to BukGet with language X?

The [API documentation](/documentation) and the API itself is fairly straightforward. All responses are returned in JSON format so as long as you can send a HTTP GET/POST and parse JSON coming back, you should be good.

### IRC Chat

* Server: irc.esper.net
* Channel: #bukget

<iframe 
	width="100%" 
	height="550" 
	scrolling="no" 
	frameBorder="0"
	src="http://widget.mibbit.com/?settings=c2337b120d65cd77035a6aedf974607b&server=irc.esper.net&channel=%23bukget">
</iframe>