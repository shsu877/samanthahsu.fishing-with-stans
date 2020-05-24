
const TEXT_X = 140;
const TEXT_Y = 380;
const TEXT_WORD_WRAP = 400;
const PORTRAIT_X = 70;
const PORTRAIT_Y = 415;

const dialog_style = { font: 'bold 14pt Courier', fill: 'white', align: 'left', wordWrap: {width: TEXT_WORD_WRAP, useAdvancedWrap: true}};

class Dialog {
  constructor(scene) {
    this.scene = scene;

    this.rect = new Phaser.Geom.Rectangle(0, 370, GAMEWIDTH, 150);
  }

  setDialog(speaker, text) {
    // set image of speaker
    if (this.dialogBox != undefined) this.removeDialog();
    this.dialogBox = this.scene.add.graphics({ fillStyle: { color: 'black' } });
    this.dialogBox.fillRectShape(this.rect);

    this.icon = this.scene.add.image(PORTRAIT_X, PORTRAIT_Y, speaker);
    this.text = this.scene.add.text(TEXT_X, TEXT_Y, text, dialog_style);
  }

  removeDialog() {
    this.icon.destroy();
    this.text.destroy();
    this.dialogBox.destroy();
  }

}