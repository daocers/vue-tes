<template>
    <div id="add">
        <el-row>
            <el-col :span="18">

                <el-form label-position="left" :model="single" :rules="rules" ref="addForm" label-width="80px">
                                            <el-form-item label="title" prop="title">
                            <el-input v-model="single.title" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="answer" prop="answer">
                            <el-input v-model="single.answer" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="content" prop="content">
                            <el-input v-model="single.content" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="extraInfo" prop="extraInfo">
                            <el-input v-model="single.extraInfo" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="bankId" prop="bankId">
                            <el-input v-model="single.bankId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="branchId" prop="branchId">
                            <el-input v-model="single.branchId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="departmentId" prop="departmentId">
                            <el-input v-model="single.departmentId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="stationId" prop="stationId">
                            <el-input v-model="single.stationId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="ownerId" prop="ownerId">
                            <el-input v-model="single.ownerId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="publicFlag" prop="publicFlag">
                            <el-input v-model="single.publicFlag" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="status" prop="status">
                            <el-input v-model="single.status" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="attr1" prop="attr1">
                            <el-input v-model="single.attr1" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="attr2" prop="attr2">
                            <el-input v-model="single.attr2" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="attr3" prop="attr3">
                            <el-input v-model="single.attr3" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="attr4" prop="attr4">
                            <el-input v-model="single.attr4" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="attr5" prop="attr5">
                            <el-input v-model="single.attr5" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="isDel" prop="isDel">
                            <el-input v-model="single.isDel" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="createUserId" prop="createUserId">
                            <el-input v-model="single.createUserId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="createTime" prop="createTime">
                            <el-input v-model="single.createTime" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="updateUserId" prop="updateUserId">
                            <el-input v-model="single.updateUserId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="updateTime" prop="updateTime">
                            <el-input v-model="single.updateTime" placeholder="请输入"></el-input>
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
            single: {},
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
                                    bankId:
                    [
                        {required: true, message: '请输入bankId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    branchId:
                    [
                        {required: true, message: '请输入branchId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    departmentId:
                    [
                        {required: true, message: '请输入departmentId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    stationId:
                    [
                        {required: true, message: '请输入stationId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    ownerId:
                    [
                        {required: true, message: '请输入ownerId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    publicFlag:
                    [
                        {required: true, message: '请输入publicFlag', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    status:
                    [
                        {required: true, message: '请输入status', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    attr1:
                    [
                        {required: true, message: '请输入attr1', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    attr2:
                    [
                        {required: true, message: '请输入attr2', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    attr3:
                    [
                        {required: true, message: '请输入attr3', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    attr4:
                    [
                        {required: true, message: '请输入attr4', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    attr5:
                    [
                        {required: true, message: '请输入attr5', trigger: 'blur'},
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
                        let res = await this.http("/single/v1/save", this.single);
                        if (res == true) {
                            this.$confirm('继续添加?查看列表?', '提示', {
                                confirmButtonText: '继续添加',
                                cancelButtonText: '查看列表',
                                type: 'success',
                                center: true
                            }).then(() => {
                                                            this.$refs['addForm'].resetFields();
                            }).catch(() => {
                                this.$router.push("/single/")
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
