<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <h3>{{ isCollapse ? '后台' : '运动员报名管理系统' }}</h3>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildren" :key="item.label" index="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
                <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>

        </el-submenu>


    </el-menu>
</template>


  
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 754px;
}

.el-menu {
    height: 100vh;
    border: 0px;

    h3 {
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
    }
}
</style>
  
<script>
export default {
    watch: {
        '$route'(to, from) {
            // 在路由变化时触发，你可以在这里更新面包屑的样式
            // 比如根据当前路由信息 to 来设置面包屑样式
            console.log("to ",to)
        }
    },
    data() {
        return {

            menuData: [
                {
                    path: '/home',
                    name: 'home',
                    label: '首页',
                    icon: 's-home',
                    url: 'Home/Home'
                },
                {
                    path: '/user',
                    name: 'user',
                    label: '用户管理',
                    icon: 's-home',
                    url: 'user/user'
                },
                {
                    path: '/event',
                    name: 'event',
                    label: '活动管理',
                    icon: 'user',
                    url: 'eventMange/eventMange'
                },
                {
                    path: '/athlete',
                    name: 'athlete',
                    label: '运动员管理',
                    icon: 'user',
                    url: 'athleteMange/athleteMange'
                },
                {
                    path: '/eventItem',
                    name: 'eventItem',
                    label: '项目管理',
                    icon: 'user',
                    url: 'eventItemMange/eventItemMange'
                },
                {
                    path: '/athleteApplication',
                    name: 'athleteApplication',
                    label: '运动员申请',
                    icon: 'user',
                    url: 'athleteApplication/athleteApplication'
                },
                {
                    label: '其他',
                    icon: 'location',
                    children: [
                        {
                            path: '/page1',
                            name: 'page1',
                            label: '页面1',
                            icon: 'setting',
                            url: 'Other/PageOne'
                        },
                        {
                            path: '/page2',
                            name: 'page2',
                            label: '页面2',
                            icon: 'setting',
                            url: 'Other/PageTwo'
                        },
                    ]

                }
            ]

        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickMenu(item) {
            console.log("点击菜单", item)

            if (this.$route.path !== item.path && !(this.$route.path == '/home' && (item.path === '/'))) {
                this.$router.push(item.path)
            } else {
                // this.refreshPage()
            }
            this.$store.commit('selectMenu', item)

        },
        refreshPage() {
            this.$router.go(0);
        },
    },
    computed: {
        //没有子菜单
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },
        hasChildren() {
            return this.menuData.filter(item => item.children)
        },
        isCollapse() {
            return this.$store.state.tab.isCollapse
        }

    }
}
</script>
<style lang="less" scoped>
.el-menu {
    border-right: none;
}
</style>