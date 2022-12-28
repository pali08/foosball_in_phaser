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
        update: update
    }
};
var game = new Phaser.Game(config);
var bluePlayers;
var redPlayers;
var player;
var gameOver = false;

function preload() {
    this.load.image('playground', 'assets/playground.jpeg');
    this.load.image('player_blue', 'assets/player_blue.png');
    this.load.image('player_red', 'assets/player_red.png');
    // this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}
function create() {   // playground
    var playground = this.add.image(400, 300, 'playground');
    playground.displayWidth = 800;
    playground.displayHeight = 600;
    //playground.width=800;
    //playground.height=600;

    bluePlayers = createPlayers('player_blue', [[40, 300], [240, 200], [240, 400]], 90, this);
    redPlayers = createPlayers('player_red', [[760, 300], [560, 200], [560, 400]], -90, this);
    //player = this.add.sprite(40, 300, 'player_blue');
}
function update() {
    if (gameOver) {
        return;
    }
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.up.isDown) {
        bluePlayers.setVelocityY(-160);
        //player.setVelocityX(-160);
        //bluePlayers.anims.play('left', true);
    }
    else if (cursors.down.isDown) {
        bluePlayers.setVelocityY(160);
        //player.anims.play('right', true);
    }
}

function createPlayers(imageName, positions, rotation, object) {

    players = object.physics.add.group();
    //players_placements = [[760, 300], [560, 200], [560, 400]]
    for (var i = 0; i < positions.length; ++i) {
        var player = object.add.sprite(positions[i][0], positions[i][1], imageName);
        player.displayHeight = player.height / 5
        player.displayWidth = player.width / 5
        player.angle = player.angle + rotation;
        players.add(player);
    }
    return players;
}
