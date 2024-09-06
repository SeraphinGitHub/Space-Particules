
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
   }

   update() {

      if(this.y >= this.height) {
         this.y = 0;
         this.x = Math.random() *this.width;
      }

      else if(this.x >= this.width) {
         this.x = 0;
         this.y = Math.random() *this.height;
      }

      const abs_X     = Math.floor(this.x);
      const abs_Y     = Math.floor(this.y);
      this.pixelArray = this.imageMap[abs_Y][abs_X];
      this.speed      = this.pixelArray.brightness;
      
      let movement    = (this.maxSpeed -this.speed) +this.velocity;

      this.y += movement;
      this.x += movement *0.5;
   }

   draw() {
      const ctx = this.ctx;

      ctx.beginPath();
      ctx.fillStyle = this.pixelArray.color;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
      ctx.fill();
   }
}