class SceneGameLose extends Phaser.Scene {
  constructor() {
    super({ key: "SceneGameLose" });
  }

  create() {
    console.log("YOU LOSE");
    this.scene.start("SceneMainMenu");     
  }
}