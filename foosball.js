var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
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
var keyW;
let keyS;

function preload() {
    this.load.image('playground', 'assets/playground.jpeg');
    this.load.image('player_blue', 'assets/player_blue.png');
    this.load.image('player_red', 'assets/player_red.png');


    
}
function create() {   // playground
    var playground = this.add.image(400, 300, 'playground');
    playground.displayWidth = 800;
    playground.displayHeight = 600;

    bluePlayers = createPlayers('player_blue', [[40, 300], [240, 200], [240, 400]], 90, this);
    redPlayers = createPlayers('player_red', [[760, 300], [560, 200], [560, 400]], -90, this);
    
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
}
function update() {


    if (gameOver) {
        return;
    }
    cursors = this.input.keyboard.createCursorKeys();
    handleKeyboardInput(cursors.up, cursors.down, redPlayers);
    handleKeyboardInput(keyW, keyS, bluePlayers);
}

function createPlayers(imageName, positions, rotation, object) {

    var players = object.physics.add.group();
    for (var i = 0; i < positions.length; ++i) {
        var player = object.physics.add.sprite(positions[i][0], positions[i][1], imageName);
        player.displayHeight = player.height / 5
        player.displayWidth = player.width / 5
        player.angle = player.angle + rotation;
        players.add(player);

    }
    console.log(players.getChildren()[0].y);
    return players;
}

function handleKeyboardInput(cursorsUp, cursorsDown, players) {
    if (cursorsUp.isDown 
        // https://phaser.discourse.group/t/how-do-i-make-a-group-collide-with-world-bounds/2448
        // I tried to set boundaries by //player.body.setCollideWorldBounds(true);
        // but it does set bonds to individual members of group - i.e. first player hits edge, but others
        // are still moving until they hit edge too
        // additional note: setColliderWorldBounds need to be set AFTER player is added to group
        && players.getChildren()[1].y > 30
        ) 
        {
        players.setVelocityY(-160);
    }
    else if (cursorsDown.isDown
        && players.getChildren()[2].y < 570
        ) {
        players.setVelocityY(160);
    }
    else if (cursorsUp.isUp) {
        players.setVelocityY(0);
    }
    else if (cursorsDown.isUp) {
        players.setVelocityY(0);
    }

}
