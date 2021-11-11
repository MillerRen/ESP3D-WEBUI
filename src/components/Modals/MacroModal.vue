<template>
    <form class="modal-body" @submit="updateMacros">
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
                            type="button"
                            class="btn btn-sm btn-default"
                            v-if="!m.class"
                            @click="resetMacro(m)"
                        >
                            <i class="glyphicon glyphicon-plus"></i>
                        </button>
                        <button
                            type="button"
                            class="btn btn-sm btn-danger"
                            v-if="m.class"
                            @click="resetMacro(m)"
                        >
                            <i class="glyphicon glyphicon-trash"></i>
                        </button>
                    </td>
                    <td>
                        <input
                            type="text"
                            v-model="m.name"
                            class="form-control w4 input-sm"
                            v-if="m.class"
                            required
                        />
                    </td>
                    <td>
                        <div class="btn-group" v-if="m.class">
                            <button
                                type="button"
                                class="btn btn-sm dropdown-toggle"
                                :class="'btn-' + m.class"
                            >
                                <i class="glyphicon" :class="'glyphicon-' + m.glyph" v-if="m.class"></i>
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href>aaa</a>
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td>
                        <div class="btn-group" v-if="m.class">
                            <button type="button" class="btn btn-sm dropdown-toggle" :class="'btn-' + m.class">
                                {{ m.class }}
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li
                                    :value="color"
                                    v-for="color in ['default', 'primary', 'info', 'warning', 'danger']"
                                    :key="color"
                                >
                                    <a
                                        href
                                        @click.prevent="m.class = color"
                                        class="btn btn-sm"
                                        :class="'btn-' + color"
                                    >{{ color }}</a>
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td>
                        <select
                            v-model="m.target"
                            class="form-control input-sm"
                            v-if="m.class"
                            required
                        >
                            <option
                                :value="target"
                                v-for="target in ['ESP', 'SD', 'URI']"
                                :key="target"
                            >{{ target }}</option>
                        </select>
                    </td>
                    <td>
                        <input
                            type="text"
                            class="form-control input-sm"
                            v-model="m.filename"
                            v-if="m.class"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
        <hr />
        <div class="clearfix">
            <button type="submit" class="btn btn-primary pull-right">Save</button>
        </div>
    </form>
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
        updateMacros() {
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
                m.class = 'default'
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
