var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [
        SceneMainMenu,
        SceneMain,
        SceneGameOver
    ]
};

var game = new Phaser.Game(config);