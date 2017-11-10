<template>

</template>

<script type="text/javascript">
  export default {
    data: function () {
      return {
        scene: {

        }
      }
    },
    created: function () {
      console.log("created...")
      this.scene = this.$parent.$data.scene;
    }
  }
</script>

<style>

</style>
