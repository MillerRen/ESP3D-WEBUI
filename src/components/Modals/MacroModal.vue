<template>
    <div class="modal-body">
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th translate>Name</th>
                        <th translate>Icon</th>
                        <th translate>Color</th>
                        <th translate>Target</th>
                        <th translate>Filename/URI</th>
                    </tr>
                </thead>
                <tbody id="dlg_macro_list">
                    <tr v-for="m in macros" :key="m.index">
                        <td>
                            <button class="btn btn-xs btn-default" v-if="!m.class">
                                <i class="glyphicon glyphicon-plus"></i>
                            </button>
                            <button class="btn btn-xs btn-danger" v-if="m.class">
                                <i class="glyphicon glyphicon-trash"></i>
                            </button>
                        </td>
                        <td>
                            <input type="text" v-model="m.name" class="form-control w4">
                        </td>
                        <td>
                            <i class="glyphicon glyphicon-star"></i>
                        </td>
                        <td>
                            <select name id class="form-control">
                                <option
                                    :value="color"
                                    v-for="color in ['default', 'primary', 'info', 'warning', 'danger']"
                                    :key="color"
                                >{{ color }}</option>
                            </select>
                        </td>
                        <td>
                            <select v-model="m.target" class="form-control">
                                <option
                                    :value="target"
                                    v-for="target in ['ESP', 'SD', 'URI']"
                                    :key="target"
                                >{{ target }}</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" class="form-control" v-model="m.filename">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        macros() {
            return this.$store.macros
        }
    },
    methods: {
        getMacros() {
            return this.$store.getMacros()
        }
    },
    mounted() {
        this.getMacros()
    }
}
</script>

<style>
.macro-container {
    display: inline-grid;
    grid-gap: 10px;
    padding: 10px;
    grid-template-columns: auto auto;
}
</style>
