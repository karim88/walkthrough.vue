<script setup lang="ts">

import {computed} from "vue";

const props = defineProps<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  bgColor?: string,
  color?: string,
}>()

const style = computed(() => {
  return [
    `color: ${props.color || '#ffffff'}`,
    `background-color: ${props?.bgColor || '#15616d'}`,
  ]
})
const emits = defineEmits(['start'])
const startWalkthrough = () => emits('start')

</script>

<template>
  <div :class="`walk-through-start ${position}`">
    <button
        ref="button"
        :style
        @click="startWalkthrough"
    >
      <slot />
    </button>
  </div>
</template>

<style scoped lang="scss">
.walk-through-start {
  position: absolute;
  padding: 10px;

  button {
    box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px;
    border: none;
    border-radius: 8px;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;
    &:hover {
      opacity: 0.7;
    }
  }
}
.top-right {
  top: 0;
  right: 0;
}
.top-left {
  top: 0;
  left: 0;
}
.bottom-right {
  bottom: 0;
  right: 0;
}
.bottom-left {
  bottom: 0;
  left: 0;
}
</style>