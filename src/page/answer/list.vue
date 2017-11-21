<template>
    <div class="table">
        <el-form :inline="true" ref="queryForm" :model="queryForm" :rules="queryRules" size="small">
            <el-form-item label="名称" prop="name">
                <el-input v-model="queryForm.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain @click="findByCondition()">查询</el-button>
                <el-button type="default" plain @click="reset()">重置</el-button>
            </el-form-item>
            <el-form-item style="float: right">
                <el-button type="primary" @click="toAdd()">添加</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    v-if="false"
                    prop="id"
                    label="id"
                    width="180">
            </el-table-column>

            <el-table-column
                    v-if="false"
                    prop="id"
                    label="id"
                    width="10">
            </el-table-column>

                        <el-table-column
                      prop="paperId"
                      label="paperId">
              </el-table-column>
                        <el-table-column
                      prop="questionId"
                      label="questionId">
              </el-table-column>
                        <el-table-column
                      prop="questionTypeId"
                      label="questionTypeId">
              </el-table-column>
                        <el-table-column
                      prop="sceneId"
                      label="sceneId">
              </el-table-column>
                        <el-table-column
                      prop="answer"
                      label="answer">
              </el-table-column>
                        <el-table-column
                      prop="timeUsed"
                      label="timeUsed">
              </el-table-column>
                        <el-table-column
                      prop="timeLeft"
                      label="timeLeft">
              </el-table-column>
                        <el-table-column
                      prop="isDel"
                      label="isDel">
              </el-table-column>
                        <el-table-column
                      prop="createUserId"
                      label="createUserId">
              </el-table-column>
                        <el-table-column
                      prop="createTime"
                      label="createTime">
              </el-table-column>
                        <el-table-column
                      prop="updateUserId"
                      label="updateUserId">
              </el-table-column>
                        <el-table-column
                      prop="updateTime"
                      label="updateTime">
              </el-table-column>
                    
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="90">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="toEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="toRemove(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination  style="float: right; margin-top: 10px;"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="queryForm.pageNum"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="queryForm.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount">
        </el-pagination>


        <el-dialog title="修改信息" :visible.sync="editDialogShow">
            <el-form label-position="left" :model="dataForEdit">
                                <el-form-item label="paperId" prop="paperId">
                      <el-input v-model="dataForEdit.paperId" placeholder="请输入"></el-input>
                  </el-form-item>
                                <el-form-item label="questionId" prop="questionId">
                      <el-input v-model="dataForEdit.questionId" placeholder="请输入"></el-input>
                  </el-form-item>
                                <el-form-item label="questionTypeId" prop="questionTypeId">
                      <el-input v-model="dataForEdit.questionTypeId" placeholder="请输入"></el-input>
                  </el-form-item>
                                <el-form-item label="sceneId" prop="sceneId">
                      <el-input v-model="dataForEdit.sceneId" placeholder="请输入"></el-input>
                  </el-form-item>
                                <el-form-item label="answer" prop="answer">
                      <el-input v-model="dataForEdit.answer" placeholder="请输入"></el-input>
                  </el-form-item>
                                <el-form-item label="timeUsed" prop="timeUsed">
                      <el-input v-model="dataForEdit.timeUsed" placeholder="请输入"></el-input>
                  </el-form-item>
                                <el-form-item label="timeLeft" prop="timeLeft">
                      <el-input v-model="dataForEdit.timeLeft" placeholder="请输入"></el-input>
                  </el-form-item>
                                <el-form-item label="isDel" prop="isDel">
                      <el-input v-model="dataForEdit.isDel" placeholder="请输入"></el-input>
                  </el-form-item>
                                <el-form-item label="createUserId" prop="createUserId">
                      <el-input v-model="dataForEdit.createUserId" placeholder="请输入"></el-input>
                  </el-form-item>
                                <el-form-item label="createTime" prop="createTime">
                      <el-input v-model="dataForEdit.createTime" placeholder="请输入"></el-input>
                  </el-form-item>
                                <el-form-item label="updateUserId" prop="updateUserId">
                      <el-input v-model="dataForEdit.updateUserId" placeholder="请输入"></el-input>
                  </el-form-item>
                                <el-form-item label="updateTime" prop="updateTime">
                      <el-input v-model="dataForEdit.updateTime" placeholder="请输入"></el-input>
                  </el-form-item>
                          </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="updateData()">确 定</el-button>
            </div>
        </el-dialog>

    </div>

</template>


<script>
    import Vue from 'vue'
    export default {
        data() {
            return {
                /**
                 * 表格数据
                 **/
                tableData: [],
                /**
                 * 数据总数
                 */
                totalCount: null,
                /**
                 * 查询参数校验规则
                 **/
                queryRules: {},
                /**
                 * 查询参数
                 **/
                queryForm: {
                    name: null,
                    pageSize: 10,
                    pageNum: 1,
                },

                /**
                 * 修改对话框是否显示
                 */
                editDialogShow: false,

                /**
                 * 修改对话框数据
                 */
                dataForEdit: {},

                /**
                 * 修改对话框数据索引值
                 */
                dataForEditIndex: null,

            }
        },


        methods: {
            /**
             * 查询
             */
            findByCondition : async function() {
                let data = await this.http("/answer/api/findByCondition.do?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
                console.log("data: ", data);
                this.tableData = data.list;
                this.totalCount = data.total;//总记录数目
            },

            /**
             * 重置查询表单
             */
            reset(){
                this.$refs["queryForm"].resetFields();
            },

            getDetail(row) {
                console.log("查看详情：", row)
            },
            /**
             * 跳转到添加数据页面
             */
            toAdd(){
                console.log("准备跳转到添加页面")
                this.$router.push("/answer/add");
            },
            /**
             * 唤起编辑对话框
             */
            toEdit(idx, row) {
                console.log("编辑：", row)
                this.dataForEdit = JSON.parse(JSON.stringify(row));
                this.dataForEditIndex = idx;
                this.editDialogShow = true;
            },
            /**
             * 提交更新数据
             */
            updateData: async function () {
                console.log("更新数据");
                console.log("dataForEdit:", this.dataForEdit)
                var res = await this.http('/answer/api/update.do', this.dataForEdit, 1000);
                if (res) {
//        用Vue.set使数据处于监控之下
                    Vue.set(this.tableData, this.dataForEditIndex, this.dataForEdit);
//        以下代码变动无法触发页面渲染
//        this.tableData[this.dataForEditIndex] = Object.assign({},this.dataForEdit);
//          console.log(this.tableData)
                } else if (res == false) {
                    console.log("请求成功，处理失败");
                } else if (res == null) {
                    console.error("请求失败")
                }
//        关闭对话框
                this.editDialogShow = false;
            },

            /**
             * 删除数据
             */
            async toRemove(idx, row) {
                console.log("删除：", idx, row)
                let data  = await this.http("/answer/api/delete.do?id=" + row.id);
                if(data == true){
                    this.tableData.splice(idx, 1);
                    this.tableData = this.tableData;
                }else if(data == false){
                    console.log("删除失败");
                    this.$notify({
                        title: '警告',
                        message: "删除失败",
                        type: 'warning'
                    });
                }
            },

            handleSizeChange(val) {
                this.queryForm.pageSize = val;
                console.log(`每页 ${val} 条`);
                this.findByCondition();
            },
            handleCurrentChange(val) {
                this.queryForm.pageNum = val;
                console.log(`当前页: ${val}`);
                this.findByCondition();
            }
        },
        /**
         * 页面初始化时候执行
         **/
        created: async function () {
            console.log("created....")
            this.findByCondition();
        }
    }
</script>

<style>
    .el-pager > li, button.btn-prev, button.btn-next {
        border: 1px solid gainsboro;
        border-left: none;
    }
    button.btn-prev {
        border-left: 1px solid gainsboro;
    }
</style>



































