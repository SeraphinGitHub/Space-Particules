
import { Iposition } from "../../interfaces";

import { 
   ParticulesClass,
} from "./_export";

// =====================================================================
// Cursor Class
// =====================================================================
export class CursorClass {

   canvas:    HTMLCanvasElement;

   radius:    number  = 80;
   gravity:   number  = 30;
   isPressed: boolean = false;
   
   position:   Iposition = {
      x: -this.radius,
      y: -this.radius,
   };

   constructor(
      canvas: HTMLCanvasElement,
   ) {
      this.canvas = canvas;
   }

   detect(event: MouseEvent) {
      this.position  = this.getMousePos(event);
   }

   detectClick(event: MouseEvent) {

      this.isPressed = !this.isPressed;
      // this.position  = this.getMousePos(event);
   }

   getMousePos(event: MouseEvent) {
      let screenBound = this.canvas.getBoundingClientRect();
   
      return {
         x: Math.floor( event.clientX -screenBound.left ),
         y: Math.floor( event.clientY -screenBound.top  ),
      }
   }

   interact(particule: ParticulesClass) {
      
      if(this.checkCollision(particule)) this.handleCollision(particule);
   }

   checkCollision(
      particule: ParticulesClass,
   ): boolean {

      const { x, y }: Iposition = this.position;
      const { x: partX, y: partY, size: partSize } = particule;
      
      const distX:       number = partX -x;
      const distY:       number = partY -y;
      const hypotenus:   number = Math.hypot(distX, distY);
      const minDistance: number = partSize *0.5 +this.radius;

      if(hypotenus <= minDistance) return true;
      return false;
   }

   handleCollision(
      particule: ParticulesClass,
   ) {

      if(this.isPressed) {
         
      }

      const { x: partX, y: partY, size: partSize } = particule;
      const { x, y }: Iposition = this.position;
      const gravity:  number    = this.gravity;
      const halfSize: number    = partSize *0.5;

      if(partX > x && partX < this.canvas.width  -halfSize) particule.x += gravity;
      if(partY > y && partY < this.canvas.height -halfSize) particule.y += gravity;
      if(partX < x && partX > halfSize)                     particule.x -= gravity;
      if(partY < y && partY > halfSize)                     particule.y -= gravity;

      if(particule.y < 0) particule.y = 0;
      if(particule.x < 0) particule.x = 0;
   }
}