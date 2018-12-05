<template>
    <div class="bg">
        <app-main />
    </div>
</template>
<script>
// import { Navbar, Sidebar, AppMain } from './components'
import { AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'dashboard',
    components: {
        // Navbar,
        // Sidebar,
        AppMain
    },
    mixins: [ResizeMixin],
    computed: {
        ...mapGetters([
            'sidebar',
            'device'
        ])
    },
    methods: {
        ...mapActions([
            // 'CloseSideBar'
        ])
    }
}
</script>

