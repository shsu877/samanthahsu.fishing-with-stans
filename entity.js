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

        this.fish = null;

        scene.input.on('pointermove', function(pointer) {
            this.y = Phaser.Math.Clamp(pointer.y - 180, -50, 500);
            if (this.hasFish())
                this.setFishY();
        }, this);
        scene.input.on('pointerdown', function(pointer) 
        {
            scene.letFishGo();  
        }, this);
        
    }

    // returns true if there is fish on hook
    hasFish() {
        return this.fish != null;
    }

    setFishY() { this.fish.y = Phaser.Math.Clamp(this.y + 200, -50, 500);}

    addFish(fish) {
        this.fish = fish;
        this.fish.setVelocity(0);
        this.fish.x = 320;
        this.setFishY(fish);
        this.fish.angle = -90;
    }

    removeFish(isCaught) {
        if (isCaught) {
            this.fish.destroy();
        } else {
            this.fish.flee();
        }
        this.fish = null;
    }
}


class Fish extends Entity {
    constructor(scene, image, size) 
    {
        var x = Phaser.Math.Between(-100, -10);
        var y = Phaser.Math.Between(150, 470);
        var speed = Phaser.Math.Between(40, 70);
        super(scene, x, y, image);
        this.setVelocity(speed, 0);
        this.size = size;
    }

    update() {
        if (this.x > 640) {
            this.destroy();
        }
    }

    // play running away animation >> tween + anim >> bottom edge of screen >> destroy
    flee() {
        console.log("IM FREEEEEE");
        this.destroy();
    }
}
