
// =====================================================================
// ParticulesClass
// =====================================================================
export class ParticulesClass {
   
   ctx:      CanvasRenderingContext2D;
   imageMap: number[][];

   x:        number;
   y:        number;
   height:   number;
   width:    number;

   maxSpeed: number = 2.5;
   speed:    number;
   size:     number;
   velocity: number;
   abs_X:    number;
   abs_Y:    number;

   pixelArray: any;

   constructor(
      imageMap: number[][],
      ctx:      CanvasRenderingContext2D,
      width:    number,
      height:   number,
   ) {
      this.ctx      = ctx;
      this.imageMap = imageMap;

      this.x        = Math.random() *width;
      this.y        = 0;
      this.width    = width;
      this.height   = height;
      this.speed    = 0;
      this.size     = Math.random() *1.5 +1;
      this.velocity = Math.random() *3;
      this.abs_X    = Math.floor(this.x);
      this.abs_Y    = Math.floor(this.y);
   }

   update() {

      if(this.y >= this.height) {
         this.y = 0;
         this.x = Math.random() *this.width;
      }

      if(this.x >= this.width) {
         this.x = 0;
         this.y = Math.random() *this.height;
      }

      this.abs_X      = Math.floor(this.x);
      this.abs_Y      = Math.floor(this.y);
      this.pixelArray = this.imageMap[this.abs_Y][this.abs_X];
      this.speed      = this.pixelArray.brightness;
      
      let movement    = (this.maxSpeed -this.speed) +this.velocity;

      this.y += movement;
      this.x += movement /2;
   }

   draw() {

      this.ctx.beginPath();
      this.ctx.fillStyle = this.pixelArray.color;
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
      this.ctx.fill();
   }
}