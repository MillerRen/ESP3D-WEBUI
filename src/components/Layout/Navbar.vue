<template>
     <nav class="navbar navbar-default navbar-static-top" role="navigation">
     <div class="navbar-header">
         <span class="navbar-brand">
             <span translate>ESP3D for </span>
             <span> {{fwName}} </span>
             <span id='showSDused' v-if="fwData.direct_sd"> SD </span>
         </span>
     </div>

     <ul class="nav navbar-nav navbar-right">
         <li class="dropdown">
             <a href="#">
                 <i class="dropbtn">
                     <i class="glyphicon glyphicon-align-justify"></i>
                 </i>
             </a>
             <div class="dropdown-content">
                 <div class="menu-title">
                     <center>
                         <span>UI: </span>
                         <span id='UI_VERSION'>{{fwData.ui_version}}</span>
                         <span> / FW: </span>
                         <span id='FW_VERSION'>{{fwData.fw_version}}</span>
                     </center>
                 </div>
                 <div class="menu-divider"></div>
                 <a id="FW_github" href="https://github.com/luc-github/ESP3D" target="_blank">
                     <span class="pull-right" translate>Firmware</span>
                     <span class="pull-left">
                         <i class="glyphicon glyphicon-cog"></i>
                     </span>
                     <span class="clearfix"></span>
                 </a>
                 <a id="UI_github" href="https://github.com/luc-github/ESP3D-webui" target="_blank">
                     <span class="pull-right" translate>Interface</span>
                     <span class="pull-left">
                         <i class="glyphicon glyphicon-eye-open"></i>
                     </span>
                     <span class="clearfix"></span>
                 </a>
                 <div class="menu-divider"></div>
                 <a href="#" @click="showpreferencesdlg ()">
                     <span class="pull-right" translate>Preferences</span>
                     <span class="pull-left">
                         <i class="glyphicon glyphicon-star"></i>
                     </span>
                     <span class="clearfix"></span>
                 </a>
                 <!-- <a href="#" @click="setupdlg ()">
                     <span class="pull-right" translate>Setup</span>
                     <span class="pull-left">
                         <i class="glyphicon glyphicon-edit"></i>
                     </span>
                     <span class="clearfix"></span>
                 </a> -->
                 <div class="menu-divider"></div>
                 <a href="#" @click='creditsdlg()'>
                     <span class="pull-right" translate>Credits</span>
                     <span class="pull-left">
                         <i class="glyphicon glyphicon-thumbs-up"></i>
                     </span>
                     <span class="clearfix"></span>
                 </a>
             </div>
         </li>
     </ul>
     <ul class="nav navbar-nav navbar-right hidden" id="menu_authentication">
         <li class="dropdown">
             <a href="#" class="nav-link">
                 <i class="dropbtn">
                     <i class="glyphicon glyphicon-user"></i>
                     <span id="current_ID"></span>
                     <span id="current_auth_level"></span>
                 </i>
             </a>
             <div class="dropdown-menu">
                 <a href="#" @click="changepassworddlg()" id="password_menu" class="hidden">
                     <span class="pull-right" translate>Password</span>
                     <span class="pull-left">
                         <i class="glyphicon glyphicon-key"></i>
                     </span>
                     <span class="clearfix"></span>
                 </a>
                 <a href="#" @click="logindlg()">
                     <span class="pull-right" translate>Login</span>
                     <span class="pull-left">
                         <i class="glyphicon glyphicon-login"></i>
                     </span>
                     <span class="clearfix"></span>
                 </a>
                 <div class="menu-divider" id="logout_menu_divider" ></div>
                 <a href="#" @click="confirmdlg(translate_text_item('Disconnection requested'), translate_text_item('Please confirm disconnection.'), DisconnectLogin); " id="logout_menu" class="hidden">
                     <span class="pull-right" translate>Log out</span>
                     <span class="pull-left">
                         <i class="glyphicon glyphicon-logout"></i>
                     </span>
                     <span class="clearfix"></span>
                 </a>
             </div>
         </li>
     </ul>
 </nav>
</template>

<script>
import {FIRMWARE_NAMES} from '../../constants'
export default {
    computed: {
        fwName () {
            return FIRMWARE_NAMES[this.$store.fwData.target_firmware]
        },
        fwData () {
            return this.$store.fwData
        }
    },
    methods: {
        showpreferencesdlg () {
            var modal = this.$modal({
                title: 'Preferences',
                data: {
                    preferences: this.$store.preferences
                },
                events: {
                    success () {
                        modal.close()
                    },
                    cancel () {
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
        passworddlg () {
            this.$modal({
                title: 'Change Password'
            }, 'PasswordModal')
        },
        creditsdlg () {
            this.$modal({
                title: 'Credits'
            }, 'CreditsModal')
        },
        logindlg () {
            this.$modal({
                title: 'Login'
            }, 'LoginModal')
        }
    }
}
</script>

<style>
.dropbtn {
    padding: 16px;
    font-size: 14px;
    border: none;
    cursor: pointer;
}

.dropdown {
    position: relative;
    display: inline-block;
    border-color: #000000;
}

.dropdownselect {
    position: relative;
    display: inline-block;
    border-color: #000000;
}

.dropmenu-content,
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border: 1px solid #dddddd;
    padding-top: 4px;
    padding-bottom: 4px;
}

.dropmenu-content a,
.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropmenu-content a:hover,
.dropdown-content a:hover {
    background-color: #e1e1e1
}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown:hover .dropbtn {
    background-color: #e1e1e1;
}

.menu-title {
    padding: 5px 10px;
    font-size: 12px;
}

.menu-divider {
    height: 1px;
    margin: 2px 0;
    overflow: hidden;
    background-color: #e5e5e5;
}

.dropmenu-content-up {
    bottom: 3em;
    left: 0em
}

.dropmenu-content-down {
    top: 3em;
    left: 0em
}

@media (min-width: 768px) {
    .dropdown-content {
        top: 3em;
        right: 1em;
    }
}

@media screen and (max-width: 767px) {
    .dropdown-content {
        top: 3em;
        left: 1.2em;
    }
}
</style>