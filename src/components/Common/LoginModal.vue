<template>
  <div class="modal-body">
    <form class="form" @submit.prevent="submit">
      <div class="form-group">
        <label for="" class="form-control-label" v-t>User:</label>
        <input type="text" class="form-control" required v-model="user.user" />
      </div>
      <div class="form-group">
        <label for="" class="form-control-label" v-t>Password:</label>
        <input type="password" class="form-control" required v-model="user.password" />
      </div>
      <div class="form-grou">
        <p class="control-static text-danger">{{msg}}</p>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary" v-t>
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
    checkLogin () {
      return this.$http.get('/login')
        .then(user => {
          console.log(user)
          if (!user.need_auth) {
            this.$emit('success')
          }
        })
    },
    submit() {
      this.$http.get('/login', this.user)
        .then(() => {
          this.$emit('success')
        })
        .catch(err => {
          this.msg = err.message
        })
    },
  },
  mounted () {
    this.checkLogin()
  }
};
</script>