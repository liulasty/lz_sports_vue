<template>
    <div class="manage">
        <!-- Form -->
        <el-button type="text" @click="dialogFormVisible = true">添加活动</el-button>
        <button @click="accessChildData">查看子组件数据</button>
        <el-dialog title="添加活动" :visible.sync="dialogFormVisible" :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="活动时间" required>
                    <el-col :span="8">
                        <el-date-picker type="datetime" placeholder="选择开始日期" v-model="ruleForm.date1"
                            style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="8">
                        <el-date-picker type="datetime" placeholder="选择结束时间" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>

                <el-form-item label="活动类型" prop="type">
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio label="线上活动" name="type"></el-radio>
                        <el-radio label="地推活动" name="type"></el-radio>
                        <el-radio label="线下主题活动" name="type"></el-radio>
                        <el-radio label="单纯品牌曝光" name="type"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="活动费用" prop="fee">
                    <el-input-number v-model="ruleForm.fee" :min="10" :max="999"></el-input-number>
                </el-form-item>
                <el-form-item label="活动时间" prop="img">
                    <ImageUploader :childData="parentMessage" ref="imageSet" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="date" label="日期" width="150">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="city" label="市区" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="400">
            </el-table-column>
            <el-table-column prop="zip" label="邮编" width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <!-- <span class="demonstration">完整功能</span> -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import ImageUploader from '@/components/ImageUploader.vue';
import { addEvent } from '@/api';


export default {
    components: { ImageUploader },
    data() {
        return {
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,
            newImageUrl: 'http://image-upload-and-management.oss-cn-beijing.aliyuncs.com/wallhaven-3zvypv.jpg',

            parentMessage: {
                //图片的集合
                imageUrls: [],
                //需要删除的图片
                deleteImagesUrls: [],
                //原有的图片
                OriginalPhotos: [],
            },

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
            dialogTableVisible: false,
            dialogFormVisible: false,

            ruleForm: {
                name: '',
                date1: '',
                date2: '',
                type: [],
                fee: 0,
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 9, message: '长度在 3 到 7 个字符', trigger: 'blur' }
                ],
                date1: [
                    { type: 'datetime', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'datetime', required: true, message: '请选择时间', trigger: 'change' },
                    { min: this.date1,message: '长度在 3 到 7 个字符', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择一个活动性质', trigger: 'change' }
                ],
                fee: [
                    { required: true, message: '请输入活动费用', trigger: 'blur' },

                ]
            }

        };
    },
    mounted() {
        this.parentMessage.imageUrls.push({
            url: this.newImageUrl,
            type: 'old',
            oss_url: this.newImageUrl
        });
        console.log('imageUrls[0]_parent', this.parentMessage.imageUrls[0])
    },
    methods: {
        CreateEvent() {
            console.log('ruleForm', this.ruleForm)
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        accessChildData() {
            // 访问子组件的数据
            const childData1 = this.$refs.imageSet.imageUrls;
            console.log('childData', childData1);
            const childData2 = this.$refs.imageSet.deleteImagesUrls;
            console.log('childData', childData2);

            // 调用子组件的方法
            this.$refs.imageSet.testImg();

        },
        //提交表单
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                    this.ruleForm.imageUrls = this.$refs.imageSet.imageUrls;
                    this.ruleForm.deleteImagesUrls = this.$refs.imageSet.deleteImagesUrls;
                    console.log('完整数据', this.ruleForm)
                    addEvent(this.ruleForm).then((data) => {
                        console.log(data)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            console.log('before', this.parentMessage.imageUrls[0]);
            this.$refs[formName].resetFields();
            console.log('new1', this.parentMessage.imageUrls[0]);
            this.$refs.imageSet.clearImgSet()
            console.log('new2', this.parentMessage.imageUrls[0]);

        },

    },

};
</script>
<style lang="less" scoped></style> 
