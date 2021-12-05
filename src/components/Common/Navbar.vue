<template>
  <nav class="navbar navbar-default navbar-static-top" role="navigation">
    <div class="navbar-header">
      <button
        type="button"
        class="navbar-toggle collapsed"
        @click="collapsed = !collapsed"
      >
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" @click.prevent="creditsdlg()" href>
        <span v-t>ESP3D</span>
      </a>
    </div>
    <div
      class="collapse navbar-collapse"
      :style="{ display: collapsed ? 'none' : 'block' }"
    >
      <ul class="nav navbar-nav">
        <li :class="{ active: value == tab.name }" v-for="tab in tabs" :key="tab.name">
          <a href @click.prevent="opentab(tab.name)">
            <i class="glyphicon" :class="'glyphicon-'+(tab.icon||tab.name.toLowerCase())"></i>
            <span v-t>{{tab.name}}</span>
          </a>
        </li>
      </ul>
      <ul class="nav navbar-nav pull-right" v-if="preferences.enable_dht">
        <li>
          <a>{{ dht.humidity }}</a>
        </li>
        <li>
          <a>{{ dht.temperature }}</a>
        </li>
      </ul>
      <ul class="nav navbar-nav pull-right" v-if="fwData.ESP3D_authentication">
        <li class="dropdown">
          <a href="#" class="nav-link">
            <i class="dropbtn">
              <i class="glyphicon glyphicon-user"></i>
              <span></span>
              <span></span>
            </i>
          </a>
          <ul class="dropdown-menu">
            <li>
              <a href="#" @click="changepassworddlg()" class="hidden">
                <span class="pull-right" v-t>Password</span>
                <span class="pull-left">
                  <i class="glyphicon glyphicon-key"></i>
                </span>
                <span class="clearfix"></span>
              </a>
            </li>
            <li>
              <a href="#" @click="logindlg()">
                <span class="pull-right" v-t>Login</span>
                <span class="pull-left">
                  <i class="glyphicon glyphicon-login"></i>
                </span>
                <span class="clearfix"></span>
              </a>
            </li>
            <li class="divider"></li>
            <li>
              <a
                href="#"
                @click="
                  confirmdlg(
                    translate_text_item('Disconnection requested'),
                    translate_text_item('Please confirm disconnection.'),
                    DisconnectLogin
                  )
                "
                class="hidden"
              >
                <span class="pull-right" v-t>Log out</span>
                <span class="pull-left">
                  <i class="glyphicon glyphicon-logout"></i>
                </span>
                <span class="clearfix"></span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  inject: ['fwData', 'preferences'],
  props: {
    value: {
      type: String,
      default: "dashboard",
    },
  },
  data() {
    return {
      collapsed: true,
      dht: {},
      tabs: [
        {
          name: 'Dashboard'
        },
        {
          name: 'Camera'
        },
        {
          name: 'Config',
          icon: 'wrench'
        },
        {
          name: 'ESP3D',
          icon: 'tasks'
        },
      ]
    };
  },
  methods: {
    passworddlg() {
      this.$modal(
        {
          title: "Change Password",
        },
        "PasswordModal"
      );
    },
    creditsdlg() {
      this.$modal(
        {
          title: "Credits",
        },
        "CreditsModal"
      );
    },
    logindlg() {
      this.$modal(
        {
          title: "Login",
        },
        "LoginModal"
      );
    },
    opentab(tab) {
      this.$emit("input", tab);
    },
  },
};
</script>

<style>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>