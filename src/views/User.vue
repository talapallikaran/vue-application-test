<template>
  <div class="user">
    <div class="container">
      <div class="loader d-inline-block" v-if="isLoading"></div>
      <span class="d-inline-block">{{ message }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";

export default Vue.extend({
  name: "User",
  methods: {
    // Use store actions to make the states globally available
    ...mapActions(["reValidateUrl", "isLoadingIndicator"]),
  },
  computed: {
    // Use global states
    ...mapGetters(["message", "isLoading"]),
  },
  mounted() {
    // Redirect to user page with token in URL for authentication
    this.reValidateUrl();
    this.isLoadingIndicator(false);
  },
});
</script>

<style scoped lang="scss">
.container {
  max-width: 767px;
  margin: 0 auto;
  padding: 0 15px;
}
.d-inline-block {
  display: inline-block;
  vertical-align: top;
}
.loader {
  margin-right: 15px;
  border: 3px solid #c7c7c7;
  border-radius: 50%;
  border-top: 3px solid #000000;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 0.7s linear infinite; /* Safari */
  animation: spin 0.7s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
