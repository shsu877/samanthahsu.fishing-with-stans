class SceneGameWin extends Phaser.Scene {
  constructor() {
    super({ key: "SceneGameWin" });
  }

  create() {
    console.log("YOU WIN!");
    this.scene.start("SceneMainMenu");     
  }
}