---
layout: default
title: BukGet Infrastructure Expansion
---

In the past we have run into issues with the API simply keeping up the demand, causing us to expand out to a second server some years ago to help distribute the load.  More recently however, the architecture that we have been priding ourselves in being simple and efficient bit us in the butt when the US server went off-line for an extended period of time.  Unfortunately for us, this was beyond our control, as the hosting provider that was donating us the gear ran into problems and their entire facility went off-line.  We scrambled to being up a temporary master so that generations could continue as normal, however we had to develop a better model for handling this.

Our initial thought was to try to take advantage of the situation and get the community to help us raise the capitol to run our own gear, our way.  Unfortunately reality set in pretty quickly when our rally cries were either deleted on Reddit, or generally ignored.  A few companies however did respond to offer us some more donated gear and gratis hosting in order to keep us up and running.  As it seems that this model is the only model that the community wants to support, we eventually conceited defeat on trying to get our own gear and started communicating with some of the various hosting providers that had contacted us.

With this in mind, we started to engage several companies and then quickly narrowed the list down from there.  We wanted to still keep the overall environment small so that it's manageable by our 2-man (lets be honest, David does most of the ops stuff now) operations team.  We also made some small, but fundamental changes to how we will be handling the data, generations, etc. as well.  As a result, we went from 2 servers to 6, and we will also be looking into making some other changes down the road to help us react quickly and effectively to any future changes.

The first change we did was make the decision to have dedicated generation servers.  In the past, all generation was done on the Dallas API server, and while this never cause any issues, we were putting too many eggs in one basket.  We also figured that is 1 generation server is good, it might make sense to have a backup server in-case the first one goes down for any reason (like in-case, you know, our provider goes down).

The second change is that we now will have 2 servers in each geographic region.  Each server will also be hosted by a different provider.  This means if something goes down, that whole region wont be be (hopefully) significantly impacted.

Thirdly, we decided to expand out the MongoDB instances a touch, making sure that the API servers are all identical (and now slaved) to the current active master generator.

Lastly, while the city-based naming convention worked well for us, it often created some confusion.  So we are switching up to a state/country model with each region also rolled up into it's respective regional record.  This means that to a large degree, we have added some more granularity to how we are referencing the our systems, and also help developers when troubleshooting issues with their code.

In general our goal here is to try to make the BukGet platform generally more stable for everyone and provide the needed resources to grow.  We have already talked internally about starting to support more servers than just Bukkit, however some of these changes were needed first to really bring everything up to speed before we could start working down those paths.