<template>
  <div>
    <canvas 
      ref="game" 
      :width="w" 
      :height="h" 
      style="border: 1px solid black;"
    >
    </canvas>
    <p>
      <button @click="move('right')">Right</button>
      <button @click="move('left')">Left</button>
      <button @click="move('up')">Up</button>
      <button @click="move('down')">Down</button>
    </p>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "BlockGame",
  data() {
    return {
      socket: {},
      context: {},
      position: {
        x: 0,
        y: 0
      },
      w: 640,
      h: 480,
    };
  },
  created() {
    this.socket = io("http://localhost:3000");
    console.log("game created");
  },
  mounted() {
    this.context = this.$refs.game.getContext("2d");
    this.socket.on("position", data => {
      this.position = data;
      this.context.clearRect(0, 0, this.w, this.h);
      this.context.fillRect(this.position.x, this.position.y, 20, 20);
    });
  },
  methods: {
    move(direction) {
      this.socket.emit("move", direction);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
