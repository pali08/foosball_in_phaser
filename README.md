# foosball_in_phaser
Foosball game in javascript using phaser game framework

This is simple foosball/table football game for two players on one PC. Red players are controlled with up/down arrows, while blue players are controlled with WS keys. The goal is to score more goals than opponent.

The game needs to run on server, e.g. simple python http server. Execution is:
```
$ cd /path/to/foosball_in_phaser
$ python3 -m http.server 8081
```
There are other possible ways, but using python3 build in simple http server is the most simple option.

Then in browser go to
```
localhost:8081
# localhost can be replaced with ip address if browser runs on other PC
```
