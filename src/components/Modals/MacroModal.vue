<template>
    <div class="modal-body">
        <table class="table table-responsive">
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
                <tr v-for="(m,index) in macros" :key="index">
                    <td>
                        <button
                            class="btn btn-sm btn-default"
                            v-if="!m.class"
                            @click="resetMacro(m)"
                        >
                            <i class="glyphicon glyphicon-plus"></i>
                        </button>
                        <button class="btn btn-xs btn-danger" v-if="m.class" @click="resetMacro(m)">
                            <i class="glyphicon glyphicon-trash"></i>
                        </button>
                    </td>
                    <td>
                        <input
                            type="text"
                            v-model="m.name"
                            class="form-control w4 input-sm"
                            v-if="m.class"
                        />
                    </td>
                    <td>
                        <i class="glyphicon" :class="'glyphicon-' + m.glyph" v-if="m.class"></i>
                    </td>
                    <td>
                        <select name id class="form-control input-sm" v-if="m.class">
                            <option
                                :value="color"
                                v-for="color in ['default', 'primary', 'info', 'warning', 'danger']"
                                :key="color"
                            >{{ color }}</option>
                        </select>
                    </td>
                    <td>
                        <select v-model="m.target" class="form-control input-sm" v-if="m.class">
                            <option
                                :value="target"
                                v-for="target in ['ESP', 'SD', 'URI']"
                                :key="target"
                            >{{ target }}</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" class="form-control" v-model="m.filename" v-if="m.class" />
                    </td>
                </tr>
            </tbody>
        </table>
        <hr>
        <div class="clearfix">
            <button class="btn btn-primary pull-right" @click="updateMacros">Save</button>
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
        },
        updateMacros () {
            this.$store.updateMacros(this.$store.macros)
        },
        resetMacro(m) {
            if (m.class) {
                m.name = ''
                m.class = ''
                m.target = ''
                m.glyph = ''
                m.filename = ''
            }
            else {
                m.name = 'M' + (1 + m.index)
                m.class = 'btn-default'
                m.target = 'ESP'
                m.glyph = 'star'
                m.filename = '/macro' + (1 + m.index) + '.g'
            }
        }
    },
    mounted() {
        this.getMacros()
    }
}
</script>

<style>
</style>
