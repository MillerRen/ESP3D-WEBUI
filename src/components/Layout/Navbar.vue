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
                     <svg width='1.3em' height='1.2em' viewBox='0 0 1300 1200'>
                         <g transform='translate(50,1200) scale(1, -1)'>
                             <path fill='#337AB7' d='M50 1100h1100q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-1100q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM50 800h1100q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-1100q-21 0 -35.5 14.5t-14.5 35.5v100 q0 21 14.5 35.5t35.5 14.5zM50 500h1100q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-1100q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM50 200h1100q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-1100 q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5z'></path>
                         </g>
                     </svg>
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
                         <span v-html="$options.filters.icon('cog')"></span>
                     </span>
                     <span class="clearfix"></span>
                 </a>
                 <a id="UI_github" href="https://github.com/luc-github/ESP3D-webui" target="_blank">
                     <span class="pull-right" translate>Interface</span>
                     <span class="pull-left">
                         <span v-html="$options.filters.icon('eye-open')"></span>
                     </span>
                     <span class="clearfix"></span>
                 </a>
                 <div class="menu-divider"></div>
                 <a href="#" @click="showpreferencesdlg ()">
                     <span class="pull-right" translate>Preferences</span>
                     <span class="pull-left">
                         <span v-html="$options.filters.icon('star')"></span>
                     </span>
                     <span class="clearfix"></span>
                 </a>
                 <!-- <a href="#" @click="setupdlg ()">
                     <span class="pull-right" translate>Setup</span>
                     <span class="pull-left">
                         <span v-html="$options.filters.icon('edit')"></span>
                     </span>
                     <span class="clearfix"></span>
                 </a> -->
                 <div class="menu-divider"></div>
                 <a href="#" @click='creditsdlg()'>
                     <span class="pull-right" translate>Credits</span>
                     <span class="pull-left">
                         <span v-html="$options.filters.icon('thumbs-up')"></span>
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
                     <svg width='1.3em' height='1.2em' viewBox='0 0 1300 1200'>
                         <g transform='translate(50,1200) scale(1, -1)'>
                             <path fill='#337AB7' d='M600 1200q124 0 212 -88t88 -212v-250q0 -46 -31 -98t-69 -52v-75q0 -10 6 -21.5t15 -17.5l358 -230q9 -5 15 -16.5t6 -21.5v-93q0 -10 -7.5 -17.5t-17.5 -7.5h-1150q-10 0 -17.5 7.5t-7.5 17.5v93q0 10 6 21.5t15 16.5l358 230q9 6 15 17.5t6 21.5v75q-38 0 -69 52 t-31 98v250q0 124 88 212t212 88z'></path>
                         </g>
                     </svg>
                     <span id="current_ID"></span>
                     <span id="current_auth_level"></span>
                 </i>
             </a>
             <div class="dropdown-menu">
                 <a href="#" @click="changepassworddlg()" id="password_menu" class="hidden">
                     <span class="pull-right" translate>Password</span>
                     <span class="pull-left">
                         <svg width='1.3em' height='1.2em' viewBox='0 0 1300 1200'>
                             <g transform='translate(50,1200) scale(1, -1)'>
                                 <path d='M900 800v200q0 83 -58.5 141.5t-141.5 58.5h-300q-82 0 -141 -59t-59 -141v-200h-100q-41 0 -70.5 -29.5t-29.5 -70.5v-600q0 -41 29.5 -70.5t70.5 -29.5h900q41 0 70.5 29.5t29.5 70.5v600q0 41 -29.5 70.5t-70.5 29.5h-100zM400 800v150q0 21 15 35.5t35 14.5h200 q20 0 35 -14.5t15 -35.5v-150h-300z'></path>
                             </g>
                         </svg>
                     </span>
                     <span class="clearfix"></span>
                 </a>
                 <a href="#" @click="logindlg()">
                     <span class="pull-right" translate>Login</span>
                     <span class="pull-left">
                         <svg width='1.3em' height='1.2em' viewBox='0 0 1300 1200'>
                             <g transform='translate(50,1200) scale(1, -1)'>
                                 <path d='M550 1100h400q165 0 257.5 -92.5t92.5 -257.5v-400q0 -165 -92.5 -257.5t-257.5 -92.5h-400q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5h450q41 0 70.5 29.5t29.5 70.5v500q0 41 -29.5 70.5t-70.5 29.5h-450q-21 0 -35.5 14.5t-14.5 35.5v100 q0 21 14.5 35.5t35.5 14.5zM338 867l324 -284q16 -14 16 -33t-16 -33l-324 -284q-16 -14 -27 -9t-11 26v150h-250q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5h250v150q0 21 11 26t27 -9z'></path>
                             </g>
                         </svg>
                     </span>
                     <span class="clearfix"></span>
                 </a>
                 <div class="menu-divider" id="logout_menu_divider" ></div>
                 <a href="#" @click="confirmdlg(translate_text_item('Disconnection requested'), translate_text_item('Please confirm disconnection.'), DisconnectLogin); " id="logout_menu" class="hidden">
                     <span class="pull-right" translate>Log out</span>
                     <span class="pull-left">
                         <svg width='1.3em' height='1.2em' viewBox='0 0 1300 1200'>
                             <g transform='translate(50,1200) scale(1, -1)'>
                                 <path d='M350 1100h400q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-450q-41 0 -70.5 -29.5t-29.5 -70.5v-500q0 -41 29.5 -70.5t70.5 -29.5h450q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-400q-165 0 -257.5 92.5t-92.5 257.5v400 q0 165 92.5 257.5t257.5 92.5zM938 867l324 -284q16 -14 16 -33t-16 -33l-324 -284q-16 -14 -27 -9t-11 26v150h-250q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5h250v150q0 21 11 26t27 -9z'></path>
                             </g>
                         </svg>
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