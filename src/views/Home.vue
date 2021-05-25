<template>
  <div class="home">
    <div class="container">
      <div class="loader d-inline-block" v-if="isLoading"></div>
      <span class="d-inline-block">Redirecting to user page.</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { uuid } from "vue-uuid";
import { TOKEN_ID_NAMESPACE } from "../constants";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  data() {
    return {
      TOKEN_ID_NAMESPACE,
      uuid: uuid.v1(),
    };
  },
  methods: {
    // Use store actions to make the states globally available
    ...mapActions(["initApplication", "isLoadingIndicator"]),
  },
  computed: {
    // Use global states
    ...mapGetters(["isAppInitialized", "isLoading"]),
  },
  mounted() {
    // Check if token is saved in local storage
    // Initilize application by applying token after the URL
    this.initApplication(this.uuid);
  },
  watch: {
    isAppInitialized: {
      handler(token) {
        this.isLoadingIndicator(true);
        setTimeout(() => {
          this.isLoadingIndicator(false);
          this.$router.push({ name: "User", params: { token } });
        }, 3000);
      },
    },
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
