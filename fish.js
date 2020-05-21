class Fish extends Entity {
    constructor(scene, x, y, image) 
    {
        super(scene, x, y, image);
        this.size;
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

class SmallFish extends Fish {
    constructor(scene) {
        var x = Phaser.Math.Between(-100, -10);
        var y = Phaser.Math.Between(150, 470);
        super(scene, x, y, 'small');
        var speed = Phaser.Math.Between(70, 100);
        this.setVelocity(speed, 0);
        this.size = fishSize.SMALL;
        this.setCircle(10, 40, 0);
    }
}

class MediumFish extends Fish {
    constructor(scene) {
        var x = Phaser.Math.Between(-100, -20);
        var y = Phaser.Math.Between(200, 470);
        super(scene, x, y, 'medium');
        var speed = Phaser.Math.Between(50, 70);
        this.setVelocity(speed, 0);
        this.size = fishSize.MEDIUM;
        this.setCircle(15, 120, 0);
    }
}

class BigFish extends Fish {
    constructor(scene) {
        var x = Phaser.Math.Between(-100, -40);
        var y = Phaser.Math.Between(200, 470);
        super(scene, x, y, 'big');
        var speed = Phaser.Math.Between(30, 50);
        this.setVelocity(speed, 0);
        this.size = fishSize.BIG;
        this.setCircle(30, 130, 40);
    }
}

class BiggestFish extends Fish {
    constructor(scene) {
        var x = -150;
        var y = 300;
        super(scene, x, y, 'biggest');
        var speed = 10;
        this.setVelocity(speed, 0);
        this.size = fishSize.BIGGEST;
        this.setCircle(100, 300, 50);
    }
}