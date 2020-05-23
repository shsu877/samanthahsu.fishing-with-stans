const speaker = {
  STAN: 0,
  FORD: 1,
  VOIDFISH: 2
}

const TEXT_X = 140;
const TEXT_Y = 380;
const TEXT_WORD_WRAP = 400;
const PORTRAIT_X = 70;
const PORTRAIT_Y = 415;

const dialog_style = { font: 'bold 14pt Courier', fill: 'black', align: 'left', wordWrap: {width: TEXT_WORD_WRAP, useAdvancedWrap: true}};

class Dialog {
  constructor(scene) {
    this.scene = scene;

    var rect = new Phaser.Geom.Rectangle(5, GAMEHEIGHT * 0.75 - 5, GAMEWIDTH - 10, GAMEHEIGHT * 0.25);
    var dialogBox = this.scene.add.graphics({ fillStyle: { color: 0xffffff } });
    dialogBox.fillRectShape(rect);

    this.text = this.scene.add.text(TEXT_X, TEXT_Y, "", dialog_style);

    this.setDialog(speaker.STAN, "hi");
    this.setDialog(speaker.STAN, "bysfdjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjkglrege");

  }

  setDialog(speaker, text) {
    // set image of speaker
    this.scene.add.image(PORTRAIT_X,PORTRAIT_Y,'ford')
    this.text.setText(text);
  }



}