<template>
    <div id="add">
        <el-row>
            <el-col :span="18">

                <el-form label-position="left" :model="answer" :rules="rules" ref="addForm" label-width="80px">
                                            <el-form-item label="paperId" prop="paperId">
                            <el-input v-model="answer.paperId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="questionId" prop="questionId">
                            <el-input v-model="answer.questionId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="questionTypeId" prop="questionTypeId">
                            <el-input v-model="answer.questionTypeId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="sceneId" prop="sceneId">
                            <el-input v-model="answer.sceneId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="answer" prop="answer">
                            <el-input v-model="answer.answer" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="timeUsed" prop="timeUsed">
                            <el-input v-model="answer.timeUsed" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="timeLeft" prop="timeLeft">
                            <el-input v-model="answer.timeLeft" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="isDel" prop="isDel">
                            <el-input v-model="answer.isDel" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="createUserId" prop="createUserId">
                            <el-input v-model="answer.createUserId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="createTime" prop="createTime">
                            <el-input v-model="answer.createTime" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="updateUserId" prop="updateUserId">
                            <el-input v-model="answer.updateUserId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="updateTime" prop="updateTime">
                            <el-input v-model="answer.updateTime" placeholder="请输入"></el-input>
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
            answer: {},
            rules: {
                                    paperId:
                    [
                        {required: true, message: '请输入paperId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    questionId:
                    [
                        {required: true, message: '请输入questionId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    questionTypeId:
                    [
                        {required: true, message: '请输入questionTypeId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    sceneId:
                    [
                        {required: true, message: '请输入sceneId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    answer:
                    [
                        {required: true, message: '请输入answer', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    timeUsed:
                    [
                        {required: true, message: '请输入timeUsed', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    timeLeft:
                    [
                        {required: true, message: '请输入timeLeft', trigger: 'blur'},
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
                        let res = await this.http("/answer/api/save", this.answer);
                        if (res == true) {
                            this.$confirm('继续添加?查看列表?', '提示', {
                                confirmButtonText: '继续添加',
                                cancelButtonText: '查看列表',
                                type: 'success',
                                center: true
                            }).then(() => {
                                                            this.$refs['addForm'].resetFields();
                            }).catch(() => {
                                this.$router.push("/answer/")
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
