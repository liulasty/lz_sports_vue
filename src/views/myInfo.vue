<template>
    <div>
        <el-form :model="infoForm" ref="infoForm" label-width="100px" class="demo-infoForm">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="infoForm.name" disabled></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="gender">
                <el-radio v-model="infoForm.gender" label="男" disabled>男</el-radio>
                <el-radio v-model="infoForm.gender" label="女" disabled>女</el-radio>
            </el-form-item>

            <el-form-item label="年龄" prop="age">
                <el-input-number v-model="infoForm.age" controls-position="right" :min="18" :max="64"
                    disabled></el-input-number>
            </el-form-item>

            <el-form-item label="参赛年级" prop="grade">
                <el-radio-group v-model="infoForm.grade" disabled>
                    <el-radio label="一年级" name="grade"></el-radio>
                    <el-radio label="二年级" name="grade"></el-radio>
                    <el-radio label="三年级" name="grade"></el-radio>
                    <el-radio label="四年级" name="grade"></el-radio>
                    <el-radio label="五年级" name="grade"></el-radio>
                    <el-radio label="六年级" name="grade"></el-radio>
                    <el-radio label="七年级" name="grade"></el-radio>
                    <el-radio label="八年级" name="grade"></el-radio>
                    <el-radio label="九年级" name="grade"></el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="电话号码" prop="contact">
                <el-input v-model="infoForm.contact" disabled></el-input>
            </el-form-item>

            
            <el-form-item>
                <el-button type="primary" @click="submitForm('infoForm')">申请修改</el-button>
                <el-button @click="resetForm('infoForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { getAthlete } from '@/api'


export default {
    data() {
        return {
            infoForm: {
                name: '',
                age: '20',
                gender: '1',
                contact: '',
                userId: this.$store.state.userInfo.userId
            },
            playerInfo: {
            }
        }
    },
    mounted() {


        this.getInfo()
    },
    methods: {
        getInfo() {
            getAthlete(this.$store.state.userInfo.userId).then((data) => {
                console.log("运动员信息", data.data.data);
                this.infoForm = data.data.data;
            })
        }
    }
}
</script>
