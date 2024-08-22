<script setup lang="ts">
import {computed} from "vue";

defineProps<{
  text: string
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  bgColor?: string,
  color?: string,
}>()

const emits = defineEmits(['start'])
const startWalkthrough = () => emits('start')

</script>

<template>
  <div :class="`walk-through-start ${position}`">
    <button @click="startWalkthrough">Start Walkthrough</button>
  </div>
</template>

<style scoped lang="scss">
.walk-through-start {
  position: absolute;
  padding: 10px;
  button {
    background-color: #15616d;
    color: #fff;
    border: none;
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