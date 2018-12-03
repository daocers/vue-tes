<template>
    <div id="add">
        <el-row>
            <el-col :span="18">

                <el-form label-position="left" :model="commonQuestion" :rules="rules" ref="addForm" label-width="80px">
                                            <el-form-item label="title" prop="title">
                            <el-input v-model="commonQuestion.title" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="answer" prop="answer">
                            <el-input v-model="commonQuestion.answer" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="content" prop="content">
                            <el-input v-model="commonQuestion.content" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="extraInfo" prop="extraInfo">
                            <el-input v-model="commonQuestion.extraInfo" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="questionTypeId" prop="questionTypeId">
                            <el-input v-model="commonQuestion.questionTypeId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="questionBankId" prop="questionBankId">
                            <el-input v-model="commonQuestion.questionBankId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="propertyItemInfo" prop="propertyItemInfo">
                            <el-input v-model="commonQuestion.propertyItemInfo" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="ownerType" prop="ownerType">
                            <el-input v-model="commonQuestion.ownerType" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="ownerId" prop="ownerId">
                            <el-input v-model="commonQuestion.ownerId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="privaryType" prop="privaryType">
                            <el-input v-model="commonQuestion.privaryType" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="status" prop="status">
                            <el-input v-model="commonQuestion.status" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="isDel" prop="isDel">
                            <el-input v-model="commonQuestion.isDel" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="createUserId" prop="createUserId">
                            <el-input v-model="commonQuestion.createUserId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="createTime" prop="createTime">
                            <el-input v-model="commonQuestion.createTime" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="updateUserId" prop="updateUserId">
                            <el-input v-model="commonQuestion.updateUserId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="updateTime" prop="updateTime">
                            <el-input v-model="commonQuestion.updateTime" placeholder="请输入"></el-input>
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
            commonQuestion: {},
            rules: {
                                    title:
                    [
                        {required: true, message: '请输入title', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    answer:
                    [
                        {required: true, message: '请输入answer', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    content:
                    [
                        {required: true, message: '请输入content', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    extraInfo:
                    [
                        {required: true, message: '请输入extraInfo', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    questionTypeId:
                    [
                        {required: true, message: '请输入questionTypeId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    questionBankId:
                    [
                        {required: true, message: '请输入questionBankId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    propertyItemInfo:
                    [
                        {required: true, message: '请输入propertyItemInfo', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    ownerType:
                    [
                        {required: true, message: '请输入ownerType', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    ownerId:
                    [
                        {required: true, message: '请输入ownerId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    privaryType:
                    [
                        {required: true, message: '请输入privaryType', trigger: 'blur'},
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
                        let res = await this.postEntity("/commonQuestion/api/save", this.commonQuestion);
                        if (res == true) {
                            this.$confirm('继续添加?查看列表?', '提示', {
                                confirmButtonText: '继续添加',
                                cancelButtonText: '查看列表',
                                type: 'success',
                                center: true
                            }).then(() => {
                                                            this.$refs['addForm'].resetFields();
                            }).catch(() => {
                                this.$router.push("/commonQuestion/")
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
