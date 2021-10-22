<template>
  <div class="modal-body">
    <form class="form" @submit.prevent="submit">
      <div class="form-group">
        <label for="" class="form-control-label">User:</label>
        <input type="text" class="form-control" v-model="user.USER" />
      </div>
      <div class="form-group">
        <label for="" class="form-control-label">Password:</label>
        <input type="password" class="form-control" v-model="user.PASSWORD" />
      </div>
      <div class="form-group">
        <button id="login_submit_btn" class="btn btn-primary" translate>
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        USER: "",
        PASSWORD: "",
        SUBMIT: "yes",
      },
    };
  },
  methods: {
    submit() {
      this.$emit("update", this.user);
    },
  },
};
</script>