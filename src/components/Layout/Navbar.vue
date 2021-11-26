<template>
    <nav class="navbar navbar-default navbar-static-top" role="navigation">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" @click="collapsed=!collapsed">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" @click.prevent="creditsdlg()" href>
                <span v-t>ESP3D</span>
                <span class="hidden-xs">&nbsp;for&nbsp;{{ fwName }}</span>
            </a>
        </div>
        <div class="collapse navbar-collapse" :style="{display:collapsed?'none':'block'}">
            <ul class="nav navbar-nav pull-right">
         <li>
             <a >{{dht.humidity}}</a>
         </li>
         <li>
             <a id="DHT_temperature">{{dht.temperature}}</a>
         </li>
     </ul>
            <ul class="nav navbar-nav pull-right">
                <li class="dropdown" v-if="fwData.ESP3D_authentication">
                    <a href="#" class="nav-link">
                        <i class="dropbtn">
                            <i class="glyphicon glyphicon-user"></i>
                            <span ></span>
                            <span ></span>
                        </i>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a
                                href="#"
                                @click="changepassworddlg()"
                                
                                class="hidden"
                            >
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
                                @click="confirmdlg(translate_text_item('Disconnection requested'), translate_text_item('Please confirm disconnection.'), DisconnectLogin); "
                                
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
import { FIRMWARE_NAMES } from '../../constants'
export default {
    data () {
        return {
            collapsed: true
        }
    },
    computed: {
        fwName() {
            return FIRMWARE_NAMES[this.$store.fwData.target_firmware]
        },
        fwData() {
            return this.$store.fwData
        },
        dht () {
            return this.$store.dht
        }
    },
    methods: {
        passworddlg() {
            this.$modal({
                title: 'Change Password'
            }, 'PasswordModal')
        },
        creditsdlg() {
            this.$modal({
                title: 'About'
            }, 'CreditsModal')
        },
        logindlg() {
            this.$modal({
                title: 'Login'
            }, 'LoginModal')
        }
    }
}
</script>

<style>
.dropdown:hover .dropdown-menu {
    display: block;
}
</style>