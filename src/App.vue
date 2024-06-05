<template>
  <!--<Personal />-->
  <div>
    <Login />
  </div>
</template>

<script>
import axios from "axios";
import Create from "./components/Appearance/CreateAppearance.vue";
import Login from "./components/Appearance/LoginAppearance.vue";
import Personal from "./components/Appearance/PersonalAppearance.vue";
import Register from "./components/Appearance/RegisterAppearance.vue";
export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
    fetchMessage() {
      axios
        .get("http://localhost:8080/api/message")
        .then((response) => {
          this.message = response.data;
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    showContent() {},
  },
  components: {
    Create,
    Login,
    Personal,
    Register,
  },
};
</script>
