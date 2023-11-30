<template>
    <div>
        <div class="user_top">

            <!-- 查询组件 -->
            <div class="top_right">
                <el-input class="userName" placeholder="请输入用户名关键词" size="small" v-model="userConfig.name" clearable>
                </el-input>
                <el-select v-model="userConfig.type" size="small" placeholder="请选择类型" clearable>
                    <el-option v-for="item in userEligibility" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-date-picker size="small" v-model="userConfig.date" type="date" placeholder="日期之后" clearable>
                </el-date-picker>
                <el-button type="primary" size="small" @click="listSelectCondition">查询</el-button>
            </div>


        </div>
        <div class="useTable">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column fixed prop="registerTime" label="注册日期" width="350">
                </el-table-column>
                <el-table-column prop="name" label="昵称" width="220">
                </el-table-column>
                <el-table-column prop="type" label="类型" width="220">
                </el-table-column>
                <el-table-column prop="state" label="状态" width="220">
                </el-table-column>

                <el-table-column label="操作" width="265">
                    <template slot-scope="scope">
                        <el-button @click="deleteUserById(scope.row)" type="text" size="small">删除</el-button>
                        <el-button v-if="applyPlayer(scope.row)" @click="sportsEdit(scope.row)" type="text"
                            size="small">运动员申请</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>



        <div class="block">
            <!-- <span class="demonstration">完整功能</span> -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[3, 4, 5, 7]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total=userTotal>
            </el-pagination>
        </div>

    </div>
</template>
<script>
import { userList } from "@/api"
import { deleteUser } from "@/api"
import { examineSports } from "@/api"

export default {
    mounted() {

        this.selectPageDate(this.userConfig)
    },
    methods: {
        applyPlayer(row) {
            if (row.applyState === '-1' || row.type === "运动员" || row.type === "工作人员") return false;
            return true;
        },
        deleteUserById(row) {
            console.log(row.id)
            deleteUser(row.id).then((data) => {
                console.log("删除成功", data)
                this.selectPageDate(this.userConfig)
            })
        },
        handleClick(row) {
            console.log(row);
        },
        listSelectCondition() {
            console.log("搜索")
            this.selectPageDate(this.userConfig)
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.userConfig.pageSize=val;
            this.selectPageDate(this.userConfig)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.userConfig.currentPage=val;
            this.selectPageDate(this.userConfig)
        },
        //时间格式转换
        DateToString(dateString) {
            const date = new Date(dateString);

            const year = date.getFullYear();
            const month = date.getMonth() + 1; // 月份是从0开始计数的，所以需要加1
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();

            // 构建格式化后的字符串
            const formattedDate = `${year}年${month}月${day}日${hours}时${minutes}分`;

            return formattedDate
        },
        //查询分页数据
        selectPageDate(config) {
            userList(config).then((data) => {
                console.log("list", data.data.data.records)
                this.tableData = data.data.data.records
                this.userTotal = data.data.data.total
                this.tableData.forEach(item => {
                    item.registerTime = this.DateToString(item.registerTime)
                })
            })

        },
        //允许该用户成为运动员
        sportsEdit(row) {
            console.log("允许该用户成为运动员?", row);

            this.$confirm('允许该用户成为运动员?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {

                examineSports(row.id).then((data) => {
                    console.log("审核响应", data);
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '修改失败!'
                    });
                })

            }).catch((data) => {
                console.log("data", data)
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });


        }
    },

    data() {
        return {
            currentPage: 1,
            userTotal: 0,
            tableData: [{
                id: '',
                date: '2016-05-02',
                name: '王小虎',
                type: '工作人员',
                state: '未激活'
            }],
            dialogFormVisible: false,
            userConfig: {
                name: '',
                type: '',
                date: '',
                currentPage: 1,
                pageSize: 5,
            },
            userEligibility: [{
                value: '管理员',
                label: '管理员'
            }, {
                value: '用户',
                label: '用户'
            }, {
                value: '运动员',
                label: '运动员'
            }],
            useForm: {

            },
        }
    },


}
</script>

<style lang="less" scoped>
.user_top {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;

    .top_right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-left: auto;
    }
}
</style>