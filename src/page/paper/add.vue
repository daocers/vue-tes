<template>
    <div id="add">
        <el-row>
            <el-col :span="18">

                <el-form label-position="left" :model="paper" :rules="rules" ref="addForm" label-width="80px">
                                            <el-form-item label="code" prop="code">
                            <el-input v-model="paper.code" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="answerFlag" prop="answerFlag">
                            <el-input v-model="paper.answerFlag" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="beginTime" prop="beginTime">
                            <el-input v-model="paper.beginTime" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="endTime" prop="endTime">
                            <el-input v-model="paper.endTime" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="originalScore" prop="originalScore">
                            <el-input v-model="paper.originalScore" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="score" prop="score">
                            <el-input v-model="paper.score" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="sceneId" prop="sceneId">
                            <el-input v-model="paper.sceneId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="userId" prop="userId">
                            <el-input v-model="paper.userId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="questionTypeInfo" prop="questionTypeInfo">
                            <el-input v-model="paper.questionTypeInfo" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="status" prop="status">
                            <el-input v-model="paper.status" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="isDel" prop="isDel">
                            <el-input v-model="paper.isDel" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="createTime" prop="createTime">
                            <el-input v-model="paper.createTime" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="createUserId" prop="createUserId">
                            <el-input v-model="paper.createUserId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="updateTime" prop="updateTime">
                            <el-input v-model="paper.updateTime" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="updateUserId" prop="updateUserId">
                            <el-input v-model="paper.updateUserId" placeholder="请输入"></el-input>
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
            paper: {},
            rules: {
                                    code:
                    [
                        {required: true, message: '请输入code', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    answerFlag:
                    [
                        {required: true, message: '请输入answerFlag', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    beginTime:
                    [
                        {required: true, message: '请输入beginTime', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    endTime:
                    [
                        {required: true, message: '请输入endTime', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    originalScore:
                    [
                        {required: true, message: '请输入originalScore', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    score:
                    [
                        {required: true, message: '请输入score', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    sceneId:
                    [
                        {required: true, message: '请输入sceneId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    userId:
                    [
                        {required: true, message: '请输入userId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    questionTypeInfo:
                    [
                        {required: true, message: '请输入questionTypeInfo', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    status:
                    [
                        {required: true, message: '请输入status', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    isDel:
                    [
                        {required: true, message: '请输入isDel', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    createTime:
                    [
                        {required: true, message: '请输入createTime', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    createUserId:
                    [
                        {required: true, message: '请输入createUserId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    updateTime:
                    [
                        {required: true, message: '请输入updateTime', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    updateUserId:
                    [
                        {required: true, message: '请输入updateUserId', trigger: 'blur'},
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
                        let res = await this.http("/paper/api/save.do", this.paper);
                        if (res == true) {
                            this.$confirm('继续添加?查看列表?', '提示', {
                                confirmButtonText: '继续添加',
                                cancelButtonText: '查看列表',
                                type: 'success',
                                center: true
                            }).then(() => {
                                                            this.$refs['addForm'].resetFields();
                            }).catch(() => {
                                this.$router.push("/paper/")
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
