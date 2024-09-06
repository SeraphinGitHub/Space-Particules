
<template>
   
   <canvas ref="rainCanvas" class="Flex canvas-bgd"></canvas>
   
</template>

<script>
   import {
      ParticulesClass,
      CursorClass,
   } from "../Scripts/ImageRain/_export";
   
   // import { imgStr } from "../Scripts/ImageRain/imgTo64_Barrack"
   // import { imgStr } from "../Scripts/ImageRain/imgTo64_Flag"
   import { imgStr } from "../Scripts/ImageRain/imgTo64_Panel"

   export default {

      data() {
      return {
         ctx:              null,
         effectImg:        null,
         frame:            0,
         height:           800,
         width:            500,
         particulesNumber: 1500,
         particulesArray:  [],
         
         Cursor: null,
      }},

      beforeMount() {
         this.effectImg = new Image();
      },

      mounted() {
         this.init();
         this.animation();
      },

      methods: {

         init() {
            this.effectImg.src = imgStr;

            const canvas  = this.$refs.rainCanvas;
            this.ctx      = canvas.getContext("2d");
            canvas.height = this.height;
            canvas.width  = this.width;
            this.ctx.drawImage(this.effectImg, 0, 0, this.width, this.height);

            const { data } = this.ctx.getImageData(0, 0, this.width, this.height);
            this.ctx.clearRect(0, 0, this.width, this.height); // <== Clear canvas

            let imageMap = [];

            for(let y = 0; y < this.height; y++) {
               let row = [];

               for(let x = 0; x < this.width; x++) {
                  const red   = data[ this.findIndex(x, y, 0) ];
                  const green = data[ this.findIndex(x, y, 1) ];
                  const blue  = data[ this.findIndex(x, y, 2) ];
                  
                  row.push({
                     brightness: this.calcBrightness(red, green, blue),
                     color:      `rgb(${red}, ${green}, ${blue})`,
                  });
               }

               imageMap.push(row);
            }
            
            for(let i = 0; i < this.particulesNumber; i++) {
               const particule = new ParticulesClass(imageMap, this.ctx, this.width, this.height);
               this.particulesArray.push(particule);
            }

            this.Cursor = new CursorClass(canvas);

            window.addEventListener("mousemove", (event) => this.Cursor.detect(event));
            window.addEventListener("mousedown", (event) => this.Cursor.detectClick(event));
            window.addEventListener("mouseup",   (event) => this.Cursor.detectClick(event));
         },

         animation() {
            this.frame++;

            if(this.frame % 2 === 0) {
               this.frame = 0;
               
               const ctx = this.ctx;
               
               ctx.globalAlpha = 0.05;
               ctx.fillStyle   = "black";
               ctx.fillRect(0, 0, this.width, this.height);

               const particulesArray = this.particulesArray;
   
               for(let i = 0; i < particulesArray.length; i++) {
                  const particule = particulesArray[i];
   
                  particule.update();
                  
                  ctx.globalAlpha = particule.speed *0.5;
                  this.Cursor.interact(particule);

                  particule.draw();
               }
            };

            requestAnimationFrame(this.animation);
         },

         findIndex(x, y, modifier) {
            return (y *4 *this.width) + (x *4 +modifier);
         },

         calcBrightness(red, green, blue) {
            return Math.sqrt(
               (red   *red)   *0.299 +
               (green *green) *0.587 +
               (blue  *blue)  *0.114
            ) /100;
         },
      }
   }
</script>

<style scoped>
   
   .canvas-bgd {
      background: black;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      /* ======================================== */
      height: 800px;    /* <== Has to match script canvas size */
      width:  500px;
      /* ======================================== */
   }

</style>
