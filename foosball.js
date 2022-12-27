// import * from "//cdn.jsdelivr.net/npm/phaser@3.11.0/dist/phaser.js"

// import Phaser;

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        //update: update
    }
};
var game = new Phaser.Game(config);

function preload() {
    this.load.image('playground', 'assets/playground.jpeg');
    this.load.image('player_blue', 'assets/player_blue.png');
    this.load.image('player_red', 'assets/player_red.png');
    // this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}
    function create ()
    {   // playground
        var playground = this.add.image(400, 300, 'playground');
        playground.displayWidth=800;
        playground.displayHeight=600;
        //playground.width=800;
        //playground.height=600;

        //blue players
        blue_players = this.physics.add.group();
        blue_players_placements = [[40,300], [240, 200], [240, 400]]
        for (var i=0; i<3; i++) {
            var player_blue = this.add.sprite(blue_players_placements[i][0], blue_players_placements[i][1], 'player_blue');
            player_blue.displayHeight = player_blue.height/5
            player_blue.displayWidth = player_blue.width/5
            player_blue.angle += 90;
            blue_players.add(player_blue);
        }
        //red players
        red_players = this.physics.add.group();
        red_players_placements = [[760,300], [560, 200], [560, 400]]
        for (var i=0; i<3; i++) {
            var player_red = this.add.sprite(red_players_placements[i][0], red_players_placements[i][1], 'player_red');
            player_red.displayHeight = player_red.height/5
            player_red.displayWidth = player_red.width/5
            player_red.angle -= 90;
            red_players.add(player_red);
        }
    }

