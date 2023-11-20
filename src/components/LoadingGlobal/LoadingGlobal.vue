<template>
  <v-overlay z-index="999" opacity="0.8"  :value="overlay">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
    <p v-if="message" class="text-center font-weight-black mt-4">{{ message }}</p>
  </v-overlay>
</template>

<script>
export default {
  name: "LoadingGlobal",
  data() {
    return {
      overlay: false,
      message: ''
    };
  },
  methods: {
    loading(value, message){
        this.overlay = value
        this.message = message
    }
  }
};
</script>
<style>
</style>