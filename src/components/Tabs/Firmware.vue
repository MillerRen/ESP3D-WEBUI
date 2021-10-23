<template>
  <table>
    <tr>
      <td>
        <input
          type="file"
          style="display:none"
          id="fw-select"
          name="myfiles[]"
          accept=".bin, .bin.gz"
          onchange="checkupdatefile();"
        />
        <table id="fw-select_form">
          <tr>
            <td>
              <button
                class="btn btn-info"
                type="button"
                id="fw_select_files"
                onclick="document.getElementById('fw-select').click();"
                translate
              >Select file</button>
            </td>
            <td>
              <div
                class="filetext no_overflow"
                id="fw_file_name"
                onmouseup="document.getElementById('fw_select_files').click();"
              ></div>
            </td>
          </tr>
        </table>
      </td>

      <td>&nbsp;</td>
      <td>
        <button
          class="btn btn-primary"
          id="uploadfw-button"
          style="display:none;"
          onclick="UploadUpdatefile();"
          translate
        >Update</button>
      </td>
      <td>
        <progress style="display:none;" name="prgfw" id="prgfw" max="100"></progress>
      </td>
      <td>&nbsp;</td>
      <td>
        <span id="updatemsg" style="display:none;" translate>Restarting, please wait....</span>
        <span id="counter"></span>
      </td>
    </tr>
  </table>
</template>