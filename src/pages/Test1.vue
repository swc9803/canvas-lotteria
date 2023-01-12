<template>
  <div class="container">
    <img src="@/assets/back.webp" />
    <img src="@/assets/front.webp" />
    <div class="textWrapper">
      <img class="text1" src="@/assets/text1.webp" />
      <img class="text2" src="@/assets/text2.webp" />
      <img class="text3" src="@/assets/text3.webp" />
    </div>
    <canvas ref="canvasRef" @mousemove="onMouseMove" />
  </div>
  <div class="blank"></div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";

const canvasRef = ref();
const ctx = ref();

const particleArray = [];
const hue = ref(0);
const text = ref("");
const textArray = "촵딱";
const randomText = () => {
  for (let i = 0; i < 1; i++)
    text.value = textArray.charAt(Math.floor(Math.random() * textArray.length));
  return text.value;
};

const mouse = reactive({
  x: -100,
  y: -100,
});

const onMouseMove = (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 2; i++) {
    particleArray.push(new Particle());
  }
};
// const onTouchMove = (e) => {
//   mouse.x = e.touches[0].clientX;
//   mouse.y = e.touches[0].clientY;
//   e.preventDefault();
//   for (let i = 0; i < 2; i++) {
//     particleArray.push(new Particle());
//   }
// };

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 100 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `white`;
    this.text = text.value;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) {
      this.size /= 1.2;
    }
  }
  draw() {
    randomText();
    ctx.value.beginPath();
    if (this.text === "촵") {
      ctx.value.font = `${this.size * 1.5}px chab`;
      ctx.value.fillStyle = this.color;
      //   ctx.value.lineWidth = 3;
      //   ctx.value.strokeStyle = "#ff6a5f";
      //   ctx.value.strokeText(this.text, this.x * 0.93, this.y * 1.07);
    } else {
      ctx.value.font = `${this.size * 1.5}px ddag`;
      ctx.value.fillStyle = this.color;
      //   ctx.value.lineWidth = 3;
      //   ctx.value.strokeStyle = "#44d13d";
      //   ctx.value.strokeText(this.text, this.x * 0.93, this.y * 1.07);
    }
    ctx.value.fillText(this.text, this.x * 0.93, this.y * 1.07);
    ctx.value.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
    if (particleArray[i].size <= 0.3) {
      particleArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  handleParticles();
  randomText();
  hue.value += 2;
  requestAnimationFrame(animate);
}

function onResize() {
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
}

const textTl = gsap.timeline();

onMounted(() => {
  ctx.value = canvasRef.value.getContext("2d", {
    willReadFrequently: true,
  });
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;

  animate();

  textTl
    .to(".text1", {
      opacity: 1,
      duration: 0,
      repeat: -1,
      repeatDelay: 6,
    })
    .to(
      ".text1",
      {
        opacity: 0,
        duration: 0,
        delay: 2,
        repeat: -1,
        repeatDelay: 6,
      },
      "<"
    )
    .to(
      ".text2",
      {
        opacity: 1,
        duration: 0,
        repeat: -1,
        repeatDelay: 6,
      },
      "<"
    )
    .to(
      ".text2",
      {
        opacity: 0,
        duration: 0,
        delay: 2,
        repeat: -1,
        repeatDelay: 6,
      },
      "<"
    )
    .to(
      ".text3",
      {
        opacity: 1,
        duration: 0,
        repeat: -1,
        repeatDelay: 6,
      },
      "<"
    )
    .to(
      ".text3",
      {
        opacity: 0,
        duration: 0,
        delay: 2,
        repeat: -1,
        repeatDelay: 6,
      },
      "<"
    );

  window.addEventListener("resize", onResize);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "chab";
  src: url("../assets/font/chab.woff2") format("woff2"),
    url("../assets/font/chab.otf") format("opentype");
}

@font-face {
  font-family: "ddag";
  src: url("../assets/font/ddag.woff2") format("woff2"),
    url("../assets/font/ddag.otf") format("opentype");
}

.container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  img {
    position: absolute;
    width: 100%;
    pointer-events: none;
  }
  canvas {
    position: relative;
    z-index: 2;
  }
}
.blank {
  width: 100%;
  height: 100vh;
}
.text1,
.text2,
.text3 {
  opacity: 0;
}
.textWrapper {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
}
</style>
