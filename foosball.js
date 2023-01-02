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
    scale: {
        mode: Phaser.Scale.FIT,
        // Center vertically and horizontally
        autoCenter: Phaser.Scale.CENTER_BOTH
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
var ball;
const playerShift = 40;
const worldPlayerBoundaryDistance = 30;
const playerVelocity = 160;
const playerReductionRatio = 1 / 5;
const gateBarWidth = 9;
var scoreTextBlue;
var scoreTextRed;
var scoreBlue = 0;
var scoreRed = 0;
var gateBarBlue;
var gateBarRed;

function preload() {
    this.load.image('playground', 'assets/playground.jpeg');
    this.load.image('player_blue', 'assets/player_blue.png');
    this.load.image('player_red', 'assets/player_red.png');
    this.load.image('ball', 'assets/ball.png')
    this.load.image('gate_bar', 'assets/gate_bar.jpeg')

}
function create() {   // playground
    var playground = this.add.image(config.width / 2, config.height / 2, 'playground');
    playground.displayWidth = config.width;
    playground.displayHeight = config.height;

    gateBarBlue = this.physics.add.image(gateBarWidth, config.height / 2, 'gate_bar');
    gateBarRed = this.physics.add.image(config.width - gateBarWidth, config.height / 2, 'gate_bar');
    gateBarBlue.displayHeight = config.height * 140 / 550;
    gateBarRed.displayHeight = config.height * 140 / 550;
    //gateBarRed.displayWidth = config.width;

    bluePlayers = createPlayers('player_blue',
        [[playerShift, config.height / 2],
        [config.width / 4 + playerShift, config.height / 3],
        [config.width / 4 + playerShift, config.height * 2 / 3]],
        90, this);
    redPlayers = createPlayers('player_red',
        [[config.width - playerShift, config.height / 2],
        [config.width * 3 / 4 - playerShift, config.height / 3],
        [config.width * 3 / 4 - playerShift, config.height * 2 / 3]],
        -90, this);
    // redPlayers.setImmovable();
    // bluePlayers.setImmovable();

    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    ball = this.physics.add.sprite(config.width / 2, config.height / 2, 'ball');
    ball.displayHeight = ball.height / 100;
    ball.displayWidth = ball.width / 100;
    ball.setBounce(1);
    ball.setCollideWorldBounds(true);
    // ball.setVelocity(Phaser.Math.Between(-200, 200), 20);
    ball.setVelocity(150, 0);
    this.physics.add.collider(bluePlayers, ball);
    this.physics.add.collider(redPlayers, ball);

    scoreTextBlue = this.add.text(8, 8, 'score blue: 0', { fontSize: '16px', fill: '#000' });
    scoreTextRed = this.add.text(8, 24, 'score red: 0', { fontSize: '16px', fill: '#000' });
    gateBarBlue.setImmovable();
    gateBarRed.setImmovable();
    this.physics.add.collider(gateBarRed, ball, goalBlue, null, this);
    this.physics.add.collider(gateBarBlue, ball, goalRed, null, this);
}
function update() {

    if (gameOver) {
        return;
    }
    resetDistanceFrontPlayers(bluePlayers);
    resetDistanceFrontPlayers(redPlayers);
    resetBallVelocity();
    cursors = this.input.keyboard.createCursorKeys();
    handleKeyboardInput(cursors.up, cursors.down, redPlayers);
    handleKeyboardInput(keyW, keyS, bluePlayers);
}

function createPlayers(imageName, positions, rotation, object) {

    var players = object.physics.add.group();
    for (var i = 0; i < positions.length; ++i) {
        var player = object.physics.add.sprite(positions[i][0], positions[i][1], imageName);
        player.displayHeight = player.height * playerReductionRatio;
        player.displayWidth = player.width * playerReductionRatio;
        player.angle = player.angle + rotation;
        players.add(player);
        player.setImmovable();
        //players.setCollideWorldBounds(true);
    }
    players.onWorldBounds = false;
    return players;
}

function handleKeyboardInput(cursorsUp, cursorsDown, players) {
    if (cursorsUp.isDown
        // https://phaser.discourse.group/t/how-do-i-make-a-group-collide-with-world-bounds/2448
        // I tried to set boundaries by //player.body.setCollideWorldBounds(true);
        // but it does set bonds to individual members of group - i.e. first player hits edge, but others
        // are still moving until they hit edge too
        // additional note: setColliderWorldBounds need to be set AFTER player is added to group
        && players.getChildren()[1].y > worldPlayerBoundaryDistance
    ) {
        players.setVelocityY(-playerVelocity);
    }
    else if (cursorsDown.isDown
        && players.getChildren()[2].y < config.height - worldPlayerBoundaryDistance
    ) {
        players.setVelocityY(playerVelocity);
    }
    else if (cursorsUp.isUp) {
        players.setVelocityY(0);
    }
    else if (cursorsDown.isUp) {
        players.setVelocityY(0);
    }

}

function resetBallVelocity() {
    var vec = new Phaser.Math.Vector2();
    vec.x = ball.body.velocity.x;
    vec.y = ball.body.velocity.y;
    vec.setLength(213);
    ball.body.velocity.x = vec.x;
    ball.body.velocity.y = vec.y;
}

function resetDistanceFrontPlayers(players) {
    if (players.getChildren()[2].y - players.getChildren()[1].y < (config.height / 3)) {
        players.getChildren()[1].y = players.getChildren()[2].y - (config.height / 3)
    }
}

function goalBlue() {
    scoreBlue += 10;
    scoreTextBlue.setText('score blue: ' + scoreBlue);
    ball.x=400;
    ball.y = 300;
    ball.setVelocity(-150,0)
}

function goalRed() {
    scoreRed += 10;
    scoreTextRed.setText('score red: ' + scoreRed);
    ball.x=400;
    ball.y = 300;
    ball.setVelocity(150,0)
}