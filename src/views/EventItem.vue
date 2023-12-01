<template>
    <div class="projectItem">
        <div class="project_top">
            <div v-if="applyPlayer()" class="top_left">
                <el-button type="primary" size="small" icon="el-icon-circle-plus-outline"
                    @click="dialogFormVisible = true">添加项目</el-button>
            </div>

            <!-- 查询组件 -->
            <div class="top_right">
                <el-input class="projectName" placeholder="请输入活动关键词" size="small" v-model="projectConfig.name" clearable>
                </el-input>
                <el-select v-model="projectConfig.event" size="small" placeholder="请选择活动类型" clearable>
                    <el-option v-for="item in Eligibility" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-date-picker size="small" v-model="projectConfig.date" type="date" placeholder="日期之后" clearable>
                </el-date-picker>
                <el-button type="primary" size="small" @click="listSelectCondition">查询</el-button>
            </div>


        </div>
        <!-- 表格 -->
        <div class="projectTable">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column fixed prop="start" label="开始日期" width="350">
                </el-table-column>
                <el-table-column prop="name" label="项目名称" width="220">
                </el-table-column>
                <el-table-column prop="eventName" label="活动名称" width="220">
                </el-table-column>
                <el-table-column prop="state" label="报名方式" width="220">
                </el-table-column>
                <el-table-column label="操作" width="265">
                    <template slot-scope="scope">
                        <el-button v-if="applyPlayer()" @click="deleteProjectById(scope.row)" type="text"
                            size="small">删除</el-button>
                        <el-button v-else @click="attendProjectById(scope.row)" type="text" size="small">参加</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页按钮 -->
        <div class="block">
            <!-- <span class="demonstration">完整功能</span> -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[3, 4, 5, 7]" :page-size="5" layout="total, sizes, prev, pager, next, jumper"
                :total=projectTotal>
            </el-pagination>
        </div>

        <!-- 添加Form -->
        <el-dialog title="添加项目" :visible.sync="dialogFormVisible" :before-close="handleClose">
            <el-form :model="projectForm" :rules="rules" ref="projectForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="项目名称" prop="name">
                    <el-input v-model="projectForm.name"></el-input>
                </el-form-item>
                <el-form-item label="活动" prop="event">
                    <el-select v-model="projectForm.event" placeholder="请选择活动">
                        <el-option v-for="item in Eligibility" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目照片" prop="uploadImg">
                    <ImageUploader ref="imageSet1" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('projectForm')">立即创建</el-button>
                    <el-button @click="resetForm('projectForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import ImageUploader from '@/components/ImageUploader.vue';
import { projectList } from '@/api'
import { eventTypes } from '@/api'
import { addProject } from '@/api'


export default {
    components: { ImageUploader },
    data() {
        return {
            dialogFormVisible: false,
            projectConfig: {
                name: "",
                event: "",
                date: "",
                currentPage: 1,
                pageSize: 5,
            },
            currentPage: 1,
            projectTotal: 0,
            Eligibility: [],
            tableData: [{
                id: '',
                start: '',
                date: '2016-05-02',
                name: '王小虎',
                eventName: '工作人员',
                state: '未激活'
            }],
            projectForm: {
                
                name: '',
                event: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入项目名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                event: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        //查询分页
        listSelectCondition() {
            // 初始化 tableData
            this.tableData = [];
            projectList(this.projectConfig).then((data) => {
                console.log("查询到的数据", data.data)
                const records = data.data.data.records;
                this.projectTotal = data.data.data.total;
                records.forEach(element => {
                    element.start = this.DateToString(element.start)
                    this.tableData.push(element);
                });
            })
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
        //角色的分工
        applyPlayer() {
            if (this.$store.state.userInfo.type === "运动员") return false;
            return true;
        },
        //分页按钮
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.projectConfig.pageSize = val;
            this.listSelectCondition(this.projectConfig);
        },
        //换页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.projectConfig.currentPage = val;
            console.log("currentPage", this.eventList)

            this.listSelectCondition(this.projectConfig);
        },
        //表单关闭
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();

                })
                .catch(_ => { });
        },
        //提交表单
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {

                    alert('submit!');
                    this.$refs.imageSet1.uploadImages()
                } else {
                    console.log('error submit!!');
                    return false;
                }

                this.projectForm.imageUrls = this.$refs.imageSet1.imageUrls;
                this.projectForm.deleteImagesUrls = this.$refs.imageSet1.deleteImagesUrls;
                console.log('完整数据', this.projectForm)

                addProject(this.projectForm).then((data)=>{
                    console.log("项目添加的响应",data)
                })

            });
        },
        //清空表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$refs.imageSet1.clearImgSet();
        },
        //参加
        attendProjectById(row) {
            console.log("参加", row)
        },
        //删除
        deleteProjectById(row) {
            console.log("删除", row)
        },
    },
    mounted() {
        eventTypes().then((data) => {
            this.Eligibility = [];
            const types = data.data.data
            for (let index = 0; index < types.length; index++) {
                const element = types[index];

                this.Eligibility.push({ 'value': element.EventID, 'label': element.EventName })
                console.log("label",this.Eligibility)
            }
        })
        this.listSelectCondition(this.userConfig)
    },
}
</script>

<style lang="less" scoped>
.project_top {
    display: flex;
    align-items: center;
    width: 100%;

    .top_right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-left: auto;

        .projectName {
            padding: 5px;
            width: 36%;

            input {
                padding-right: 5px;
            }
        }
    }
}
</style>
