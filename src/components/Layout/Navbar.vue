<template>
    <nav class="navbar navbar-default navbar-static-top" role="navigation">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand">
                <span translate>ESP3D for</span>
                <span>{{ fwName }}</span>
                <span id="showSDused" v-if="fwData.direct_sd">SD</span>
            </a>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav pull-right">
                <li class="dropdown">
                    <a href="#" class="nav-link">
                        <i class="dropbtn">
                            <i class="glyphicon glyphicon-user"></i>
                            <span id="current_ID"></span>
                            <span id="current_auth_level"></span>
                        </i>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a
                                href="#"
                                @click="changepassworddlg()"
                                id="password_menu"
                                class="hidden"
                            >
                                <span class="pull-right" translate>Password</span>
                                <span class="pull-left">
                                    <i class="glyphicon glyphicon-key"></i>
                                </span>
                                <span class="clearfix"></span>
                            </a>
                        </li>
                        <li>
                            <a href="#" @click="logindlg()">
                                <span class="pull-right" translate>Login</span>
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
                                id="logout_menu"
                                class="hidden"
                            >
                                <span class="pull-right" translate>Log out</span>
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
    computed: {
        fwName() {
            return FIRMWARE_NAMES[this.$store.fwData.target_firmware]
        },
        fwData() {
            return this.$store.fwData
        }
    },
    methods: {
        showpreferencesdlg() {
            var modal = this.$modal({
                title: 'Preferences',
                data: {
                    preferences: this.$store.preferences
                },
                events: {
                    success() {
                        modal.close()
                    },
                    cancel() {
                        modal.close()
                    }
                }
            }, 'PreferencesModal')
        },
        // setupdlg () {
        //     this.$modal({
        //         title: 'Setup'
        //     }, 'SetupModal')
        // },
        passworddlg() {
            this.$modal({
                title: 'Change Password'
            }, 'PasswordModal')
        },
        creditsdlg() {
            this.$modal({
                title: 'Credits'
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