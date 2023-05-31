
<template>
   <section id="root">

      <SpaceParticules/>
      
   </section>
</template>

<script>
   // Components 
   import SpaceParticules from "./Components/SpaceParticules.vue"

   export default {
      name: "App",

      components: {
         SpaceParticules,
      },
   }
</script>

<style>
   html * {
      margin: 0;
      padding: 0;
      /* cursor: default; */
   }
   
   #root {
      position: fixed;
      height: 100%;
      width: 100%;
      background-color: rgb(30, 30, 30);
   }
   
   .Flex {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
      width: 100%;
   }

   p,
   input,
   button {
      font-family: "Verdana";
      font-size: 22px;
   }
   input,
   button {
      border: none;
      background: none;
   }

   p {
      text-align: center;
   }
</style>
