<template>
    <div
        class="navbar"
        mode="horizontal">
        <div class="breadcrumb">
            <hamburger
                :toggle-click="toggleSideBar"
                :is-active="sidebar.opened"
                class="hamburger-container"/>
            <breadcrumb/>
        </div>

        <el-dropdown
            @command="handleCommand"
            class="avatar-container"
            trigger="click">
            <div class="avatar-wrapper">
                <img :src="avatar" class="avatar"/>
                <div class="userName"><span>{{userName}}</span></div>
                <i class="el-icon-caret-bottom"/>
            </div>
            <el-dropdown-menu
                slot="dropdown"
                class="user-dropdown">
                <el-dropdown-item command="logout">
                    <span>登出</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import avatar from '@/assets/images/pic-head.png'

export default {
    components: {
        Breadcrumb,
        Hamburger
    },
    computed: {
        ...mapGetters(['sidebar']),

        userName: function() {
            return ''
        }
    },

    data() {
        return {
            avatar
        }
    },

    methods: {
        ...mapActions([
            'ToggleSideBar', 'logout'
        ]),
        toggleSideBar() {
            this.ToggleSideBar()
        },
        handleCommand(command) {
            if (command === 'logout') {
                this.logout().then(() => {
                    this.$router.push('/login')
                })
            }
            // this.LogOut().then(() => {
            //   location.reload() // 为了重新实例化vue-router对象
            // })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        padding: 12px 30px 10px 0px;
        border-radius: 0 !important;
        display: flex;
        justify-content: space-between;

        .avatar-container {
            .avatar-wrapper {
                margin-top: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .avatar {
                height: 32px;
                width: 32px;
            }
            .userName {
                margin: 0 10px;
            }
        }

        .breadcrumb{
            display: flex;
            align-items: center;
            margin-left: 15px;
        }
    }
</style>

