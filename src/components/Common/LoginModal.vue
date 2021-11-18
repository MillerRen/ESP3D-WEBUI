<template>
  <div class="modal-body">
    <form class="form" @submit.prevent="submit">
      <div class="form-group">
        <label for="" class="form-control-label">User:</label>
        <input type="text" class="form-control" required v-model="user.user" />
      </div>
      <div class="form-group">
        <label for="" class="form-control-label">Password:</label>
        <input type="password" class="form-control" required v-model="user.password" />
      </div>
      <div class="form-grou">
        <p class="control-static text-danger">{{msg}}</p>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary" translate>
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
        user: "",
        password: ""
      },
      msg: ''
    };
  },
  methods: {
    submit() {
      this.$store.login(this.user)
        .then(() => {
          this.$emit('success')
        })
        .catch(err => {
          this.msg = err.message
        })
    },
  },
};
</script>