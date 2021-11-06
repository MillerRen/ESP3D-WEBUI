<template>
    <div class="modal-credits">
        <!-- <a href="#" @click="showpreferencesdlg()">
            <span class="pull-right" translate>Preferences</span>
            <span class="pull-left">
                <i class="glyphicon glyphicon-star"></i>
            </span>
            <span class="clearfix"></span>
        </a>-->
        <!-- <hr>
        <h3>Credits</h3>-->
        <ul>
            <li>
                This UI for firmware of 
                <a id="FW_github" href="https://github.com/luc-github/ESP3D" target="_blank">
                    <span translate>ESP3D</span>
                </a>
            </li>
            <li>
                This UI is open source code 
                <a id="UI_github" href="https://github.com/luc-github/ESP3D-webui" target="_blank">
                    <span translate>ESP3D-WEBUI</span>
                </a>
            </li>
            <li>
                Thanks to
                <a
                    href="https://github.com/imrahil/smoothieware-webui"
                    target="_blank"
                >imrahil/smoothieware-webui</a> for the inspiration and the code base.
            </li>
            <li>
                Current UI use a customized version of
                <a
                    href="http://getbootstrap.com"
                    target="_blank"
                >bootstrap</a> including a local limited version of svg version of
                <a
                    href="http://glyphicons.com/"
                    target="_blank"
                >Glyphicons Halflings</a> to get a small footprint.
            </li>
            <li>
                A customized version of
                <a
                    href="http://smoothiecharts.org/"
                    target="_blank"
                >smoothiecharts</a> is used to display temperatures charts, it is simple and perfectly sized for the current purpose.
            </li>
        </ul>
    </div>
</template>