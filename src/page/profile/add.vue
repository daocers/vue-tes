<template>
    <div id="add">
        <el-row>
            <el-col :span="18">

                <el-form :model="profile" :rules="rules" ref="addForm" label-width="80px">
                                            <el-form-item label="userId" prop="userId">
                            <el-input v-model="profile.userId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="examFlag" prop="examFlag">
                            <el-input v-model="profile.examFlag" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="isDel" prop="isDel">
                            <el-input v-model="profile.isDel" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="createUserId" prop="createUserId">
                            <el-input v-model="profile.createUserId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="createTime" prop="createTime">
                            <el-input v-model="profile.createTime" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="updateUserId" prop="updateUserId">
                            <el-input v-model="profile.updateUserId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="updateTime" prop="updateTime">
                            <el-input v-model="profile.updateTime" placeholder="请输入"></el-input>
                        </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="add">保存</el-button>
                        <el-button type="info" plain @click="goBack">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>


    </div>

</template>

<script>
    export default {
        data() {
            return {
            profile: {},
            rules: {
                                    userId:
                    [
                        {required: true, message: '请输入userId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    examFlag:
                    [
                        {required: true, message: '请输入examFlag', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    isDel:
                    [
                        {required: true, message: '请输入isDel', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    createUserId:
                    [
                        {required: true, message: '请输入createUserId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    createTime:
                    [
                        {required: true, message: '请输入createTime', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    updateUserId:
                    [
                        {required: true, message: '请输入updateUserId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    updateTime:
                    [
                        {required: true, message: '请输入updateTime', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                            }
        }
        },
        methods: {
            add() {
                this.$refs['addForm'].validate(async (valid) => {
                    if (!valid) {
                        console.log("参数校验不通过，请处理");
                        return false;
                    } else {
                        let res = await this.http("/profile/api/save.do", this.profile);
                        if (res == true) {
                            this.$confirm('继续添加?查看列表?', '提示', {
                                confirmButtonText: '继续添加',
                                cancelButtonText: '查看列表',
                                type: 'success',
                                center: true
                            }).then(() => {
                                                            this.$refs['addForm'].resetFields();
                            }).catch(() => {
                                this.$router.push("/profile/")
                            });
                        }
                    }
                });
            },
            goBack(){
                this.$router.go(-1);
            }

        },
        created: function () {

        }
    }
</script>


<style>

</style>
