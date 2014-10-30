#Skypebuff
##About - Purpose
Skypebuff is a web application I created in my spare time a couple of months ago ago over a week or two while working on my Javascript. Skypebuff allows users in my Skype chat group to prepend a message (a quote) with a certain command and then the message will be uploaded to the site via a program running on my desktop. 

The Skypebuff site has 2 main functions. Skypebuff retrieves stored messages from a MongoDB database and exposes a REST API to add messages to this database.

The messages that are sent are specific and are sent by a very hastily put together client program written in C# which I am currently rewriting in C++.

##About - Technologies
I wrote Skypebuff in Javascript using node.js as I wanted something more than browser Javascript to work on as I read through Javascript: The Definitive Guide.

The main technologies of note that are used:

- Javascript
- node.js
- express
- mongodb
- vash views

I hosted the application on IBM's Bluemix and used MongoLab as a data host.
