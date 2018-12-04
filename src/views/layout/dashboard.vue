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

<style rel="stylesheet/scss" lang="scss" scoped>
.app-main {
    background-color: none;
}
.app-main-wrap{
    background: none !important;
}
.app-wrapper {
  position: relative;
  //   height: 100%;
  min-height: 100%;
  width: 100%;
  background: none !important;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
