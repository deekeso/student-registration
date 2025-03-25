<template>
  <div class="backdrop">
    <div class="modal">
      <h2>Review the following information before submitting.</h2>
      <slot></slot>

      <el-button @click="$emit('close')">Cancel</el-button>
      <el-button @click="$emit('submit')">Submit</el-button>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  height: 100%;
  width: 100%;
  background-color: hsla(0, 0%, 0%, 0.15);
  margin: 0;

  position: absolute;
  top: 0;

  justify-items: center;
  align-content: center;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;

  -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
}
</style>
