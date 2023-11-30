<template>
    <div class="athlete">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="gender">
                <el-radio  v-model="ruleForm.gender" label="男">男</el-radio>
                <el-radio v-model="ruleForm.gender" label="女">女</el-radio>
            </el-form-item>

            <el-form-item label="年龄" prop="age">
                <el-input-number v-model="ruleForm.age" controls-position="right" @change="handleChange" :min="18" :max="64"></el-input-number>
            </el-form-item>

            <el-form-item label="电话号码" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>

            
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即申请</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

import {athleteAdd} from '@/api'

export default {
    data() {
        return {
            ruleForm: {
                name: '',
                age: '20',
                gender: '1',
                phone:'',
                userId:this.$store.state.userInfo.userId
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                phone:[
                { required: true, message: '请输入电话号码', trigger: 'blur' },
                ]
                
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // this.ruleForm
                    console.log(this.ruleForm);
                    athleteAdd(this.ruleForm).then((data)=>{
                        console.log("响应结果",data.data)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleChange(value){
            console.log(value);
        }
    }
}
</script>

<style lang="less">
.athlete {
    margin-top: 20px;
}
</style>