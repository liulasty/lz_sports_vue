<template>
    <div>
        <div class="user_top">

            <!-- 查询组件 -->
            <div class="top_right">
                <el-input class="eventName" placeholder="请输入内容" size="small" v-model="userConfig.name" clearable>
                </el-input>
                <el-select v-model="userConfig.type" size="small" placeholder="请选择" clearable>
                    <el-option v-for="item in userEligibility" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-date-picker size="small" v-model="userConfig.data" type="date" placeholder="日期之后" clearable>
                </el-date-picker>
                <el-button type="primary" size="small" @click="listSelectCondition">查询</el-button>
            </div>


        </div>
        <div class="useTable">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column fixed prop="date" label="日期" width="150">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="province" label="省份" width="120">
                </el-table-column>
                <el-table-column prop="city" label="市区" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址" width="300">
                </el-table-column>
                <el-table-column prop="zip" label="邮编" width="120">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small">运动员申请</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 添加Form -->
        <el-dialog title="修改用户" :visible.sync="dialogFormVisible" :before-close="handleClose">
            <el-form :model="useForm" ref="useForm" label-width="100px" class="demo-useForm">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="useForm.name"></el-input>
                </el-form-item>
                <el-form-item label="活动时间" required>
                    <el-date-picker v-model="useForm.date1" type="datetimerange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="参赛资格" prop="type">
                    <el-radio-group v-model="useForm.type">
                        <el-radio label="线上报名" name="type"></el-radio>
                        <el-radio label="单位报名" name="type"></el-radio>
                        <el-radio label="线下报名" name="type"></el-radio>
                        <el-radio label="其他" name="type"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="活动费用" prop="fee">
                    <el-input-number v-model="useForm.fee" :min="10" :max="999"></el-input-number>
                </el-form-item>
                <el-form-item label="活动照片" prop="img">
                    <ImageUploader ref="imageSet1" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('useForm')">立即创建</el-button>
                    <el-button @click="resetForm('useForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>
<script>
export default {
    methods: {
        handleClick(row) {
            console.log(row);
        },
        listSelectCondition() {
            console.log("搜索")
        }
    },

    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄',
                zip: 200333
            }, {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄',
                zip: 200333
            }],
            dialogFormVisible: false,
            userConfig: {
                name: '',
                type: '',
                data: ''
            },
            userEligibility: [{
                value: '线上报名',
                label: '线上报名'
            }, {
                value: '单位报名',
                label: '单位报名'
            }, {
                value: '线下报名',
                label: '线下报名'
            }, {
                value: '其他',
                label: '其他'
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
    .top_right{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-left: auto;
    }
}
</style>