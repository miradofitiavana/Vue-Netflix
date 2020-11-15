<template>
  <button
    class="btn"
    :class="`${btnClass} ${showText ? '' : 'btn-min'}`"
    @click.prevent="btnFunction"
  >
    <b-icon icon="play-fill" v-if="btnClass.includes('btn-play')"></b-icon>
    <b-icon
      :icon="showText ? 'info-circle' : 'info'"
      v-if="btnClass.includes('btn-more')"
    ></b-icon>
    <b-icon icon="plus" v-if="btnClass.includes('btn-add')"></b-icon>
    <b-icon icon="check" v-if="btnClass.includes('btn-check')"></b-icon>
    <span v-if="showText">
      {{ title }}
    </span>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    title: String,
    btnClass: String,
    btnFunction: Function,
    showText: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  padding-left: 2rem;
  padding-right: 2.4rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border: none;
  border-radius: 0px;
  font-size: 20px;

  svg > span {
    margin-left: 5px;
  }

  &.btn-play,
  &.play {
    color: #fff;
    background-color: #e50914;
  }

  &.btn-more,
  &.btn-add,
  &.btn-check {
    background-color: #ffffff52;
    svg {
      color: #fff;
    }
  }

  & + .btn {
    margin-left: 10px;
  }

  &.btn-moyen {
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
  }

  &.btn-min {
    line-height: 1;
    padding: 8px;
    border-radius: 50%;
  }
}
</style>