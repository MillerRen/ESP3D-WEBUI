<template>
        <form class="modal-body">
            <div class="form-group">
                <span class="modal-text" translate>Current Password:</span>
                <input class='form-control' type="password" id="password_password_text" style="width:auto" />
            </div>
            <hr>
            <div class="form-group">
                <span class="modal-text" translate>New Password:</span>
                <input class='form-control' type="password" id="password_password_text1" onkeyup="checkpassword()" style="width:auto" />
            </div>
            <hr>
            <div class="form-group">
                <span class="modal-text" translate>Confirm New Password:</span>
                <input class='form-control' type="password" id="password_password_text2" onkeyup="checkpassword()" style="width:auto" />
            </div>
            <hr>
            <span>
                <span id="password_content"></span>
            </span>
        </form>
</template>