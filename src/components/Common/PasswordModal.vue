<template>
        <form class="modal-body">
            <div class="form-group">
                <span class="modal-text" v-t>Current Password:</span>
                <input class='form-control' type="password"  style="width:auto" />
            </div>
            <hr>
            <div class="form-group">
                <span class="modal-text" v-t>New Password:</span>
                <input class='form-control' type="password"  onkeyup="checkpassword()" style="width:auto" />
            </div>
            <hr>
            <div class="form-group">
                <span class="modal-text" v-t>Confirm New Password:</span>
                <input class='form-control' type="password"  onkeyup="checkpassword()" style="width:auto" />
            </div>
            <hr>
            <span>
                <span ></span>
            </span>
        </form>
</template>