<template lang="pug">
.wrapper-radial-bg
  .right-top
  .right-bottom
</template>

<script>
export default {
  name: 'IntroRadialBg',
}
</script>

<style lang="scss" scoped>
.wrapper-radial-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.right-top,
.right-bottom,
.test {
  width: 100%;
  height: 100%;
}

.right-top {
  position: absolute;
  top: 0;
  background: radial-gradient(
    62.73% 76.57% at 0% 23.69%,
    #a1bbff 27.82%,
    rgba(225, 255, 250, 0) 100%
  );
  mix-blend-mode: lighten;
  opacity: 0.6;
  transform: matrix(-1, 0, 0, 1, 0, 0);

  @include max-w-md {
    background: radial-gradient(
      62.73% 35.34% at 0% 23.69%,
      #a1bbff 27.82%,
      rgba(225, 255, 250, 0) 100%
    );
  }
}

.right-bottom {
  background: radial-gradient(
      46.73% 57.04% at 15.99% 100%,
      #fdffa1 27.82%,
      rgba(245, 255, 225, 0) 100%
    )
    /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  mix-blend-mode: lighten;
  opacity: 0.5;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  left: 100vw;
  top: 1px;

  @include max-w-md {
    background: radial-gradient(
      78.98% 44.49% at 15.99% 100%,
      #fdffa1 27.82%,
      rgba(245, 255, 225, 0) 100%
    );
  }
}
</style>