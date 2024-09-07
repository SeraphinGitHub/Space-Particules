
// =====================================================================
// ParticulesClass
// =====================================================================
export class ParticulesClass {

   imageMap:   any;
   
   id:         number;
   x:          number;
   y:          number;
   height:     number;
   width:      number;

   size:       number;
   velocity:   number;
   speed:      number;
   maxSpeed:   number = 2.5; // Max brightness ==> 255, shorten as 2.5 for better perf 

   pixelColor: string = "";

   constructor(
      imageMap: any,
      id:       number,
      width:    number,
      height:   number,
   ) {
      this.imageMap = imageMap;
      
      this.id       = id;
      this.x        = Math.random() *width;
      this.y        = 0;
      this.width    = width;
      this.height   = height;
      this.speed    = 0;
      this.size     = Math.random() *1.5 +1;
      this.velocity = Math.random() *3   +1;
   }

   resetPosotion() {

      if(this.y >= this.height) {
         this.x = Math.random() * this.width;
         this.y = 0;
      }

      else if(this.x >= this.width) {
         this.x = 0;
         this.y = Math.random() * this.height;
      }
   }

   update() {
      
      // When reach border
      this.resetPosotion();

      const abs_X = Math.floor(this.x);
      const abs_Y = Math.floor(this.y);
      const { brightness, color } = this.imageMap[abs_Y][abs_X];

      this.speed      = brightness;
      this.pixelColor = color;
      let movement    = (this.maxSpeed -this.speed) +this.velocity;

      // this.x += movement *0.5;
      // this.y += movement;

      if(this.id % 2 === 0) {
         this.x += movement *0.4;
         this.y += movement *0.6;
      }

      else {
         this.x += movement *0.6;
         this.y += movement *0.4;
      }
   }

   draw(ctx: CanvasRenderingContext2D) {

      ctx.beginPath();
      ctx.fillStyle = this.pixelColor;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
      ctx.fill();
   }
}