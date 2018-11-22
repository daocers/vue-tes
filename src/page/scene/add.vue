<template>
    <div id="add">
        <el-row>
            <el-col :span="18">

                <el-form label-position="left" :model="scene" :rules="rules" ref="addForm" label-width="80px">
                                            <el-form-item label="code" prop="code">
                            <el-input v-model="scene.code" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="name" prop="name">
                            <el-input v-model="scene.name" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="ownerType" prop="ownerType">
                            <el-input v-model="scene.ownerType" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="ownerId" prop="ownerId">
                            <el-input v-model="scene.ownerId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="authCode" prop="authCode">
                            <el-input v-model="scene.authCode" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="changePaper" prop="changePaper">
                            <el-input v-model="scene.changePaper" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="delayTime" prop="delayTime">
                            <el-input v-model="scene.delayTime" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="duration" prop="duration">
                            <el-input v-model="scene.duration" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="paperPolicyId" prop="paperPolicyId">
                            <el-input v-model="scene.paperPolicyId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="cancelReason" prop="cancelReason">
                            <el-input v-model="scene.cancelReason" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="paperGenerateType" prop="paperGenerateType">
                            <el-input v-model="scene.paperGenerateType" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="remark" prop="remark">
                            <el-input v-model="scene.remark" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="questionBankId" prop="questionBankId">
                            <el-input v-model="scene.questionBankId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="userChoiceType" prop="userChoiceType">
                            <el-input v-model="scene.userChoiceType" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="totalScore" prop="totalScore">
                            <el-input v-model="scene.totalScore" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="percentable" prop="percentable">
                            <el-input v-model="scene.percentable" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="metaScoreInfo" prop="metaScoreInfo">
                            <el-input v-model="scene.metaScoreInfo" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="status" prop="status">
                            <el-input v-model="scene.status" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="openTime" prop="openTime">
                            <el-input v-model="scene.openTime" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="closeTime" prop="closeTime">
                            <el-input v-model="scene.closeTime" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="isDel" prop="isDel">
                            <el-input v-model="scene.isDel" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="createTime" prop="createTime">
                            <el-input v-model="scene.createTime" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="createUserId" prop="createUserId">
                            <el-input v-model="scene.createUserId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="updateTime" prop="updateTime">
                            <el-input v-model="scene.updateTime" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="updateUserId" prop="updateUserId">
                            <el-input v-model="scene.updateUserId" placeholder="请输入"></el-input>
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
            scene: {},
            rules: {
                                    code:
                    [
                        {required: true, message: '请输入code', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    name:
                    [
                        {required: true, message: '请输入name', trigger: 'blur'},
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
                                    authCode:
                    [
                        {required: true, message: '请输入authCode', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    changePaper:
                    [
                        {required: true, message: '请输入changePaper', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    delayTime:
                    [
                        {required: true, message: '请输入delayTime', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    duration:
                    [
                        {required: true, message: '请输入duration', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    paperPolicyId:
                    [
                        {required: true, message: '请输入paperPolicyId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    cancelReason:
                    [
                        {required: true, message: '请输入cancelReason', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    paperGenerateType:
                    [
                        {required: true, message: '请输入paperGenerateType', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    remark:
                    [
                        {required: true, message: '请输入remark', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    questionBankId:
                    [
                        {required: true, message: '请输入questionBankId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    userChoiceType:
                    [
                        {required: true, message: '请输入userChoiceType', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    totalScore:
                    [
                        {required: true, message: '请输入totalScore', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    percentable:
                    [
                        {required: true, message: '请输入percentable', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    metaScoreInfo:
                    [
                        {required: true, message: '请输入metaScoreInfo', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    status:
                    [
                        {required: true, message: '请输入status', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    openTime:
                    [
                        {required: true, message: '请输入openTime', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    closeTime:
                    [
                        {required: true, message: '请输入closeTime', trigger: 'blur'},
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
                        let res = await this.http("/scene/api/save", this.scene);
                        if (res == true) {
                            this.$confirm('继续添加?查看列表?', '提示', {
                                confirmButtonText: '继续添加',
                                cancelButtonText: '查看列表',
                                type: 'success',
                                center: true
                            }).then(() => {
                                                            this.$refs['addForm'].resetFields();
                            }).catch(() => {
                                this.$router.push("/scene/")
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
