class Entity extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, type) {
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this); // add to scene
        this.scene.physics.world.enableBody(this, 0); // instantiate to rendering queue
        this.setData("type", type);
        this.setData("isDead", false);
    }
}

class Hook extends Entity {
    constructor(scene)
    {
        super(scene, 320, 240, 'hook');
        this.setImmovable();
        this.setCircle(20, -10, 400);

        scene.input.on('pointermove', function(pointer) {
        this.y = Phaser.Math.Clamp(pointer.y - 180, -50, 500);
        }, this);
        scene.input.on('pointerdown', function(pointer) 
        {
            this.letFishGo();  
        }, this);

    }
}


class Fish extends Entity {
    constructor(scene) 
    {
        var x = Phaser.Math.Between(-100, -10);
        var y = Phaser.Math.Between(150, 470);
        var speed = Phaser.Math.Between(40, 70);
        super(scene, x, y, 'small');
        this.setVelocity(speed, 0);
    }

    update() {
        if (this.x > 640) {
            this.destroy();
        }
    }
}
