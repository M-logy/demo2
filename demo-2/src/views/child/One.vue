<template>
  <div class="one">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" @click="addFn">添加</el-button>
          <el-button type="primary" @click="getD">请求</el-button>
        </div>
      </el-col>
    </el-row>

    <!--模态框-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form
        :model="obj"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="Id" hidden prop="id">
          <el-input v-model="obj.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="obj.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="obj.age"></el-input>
        </el-form-item>
        <el-form-item label="Msg" prop="msg">
          <el-input v-model="obj.msg"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="obj.gender">
            <el-radio label="0" v-model="obj.gender">男</el-radio>
            <el-radio label="1" v-model="obj.gender">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确定</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--表格-->
    <el-table :data="tableData" height="560" border style="width: 100%">
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="msg" label="Msg"> </el-table-column>
      <el-table-column prop="gender" label="性别"> </el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            slot="reference"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="5"
        layout="total, prev, pager, next"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/javascript">
import { getList, delPost, addPost, editPost,phpGet } from "../../api/index";
export default {
  name: "about",
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      title: "添加数据",
      obj: {
        id: "",
        name: "",
        age: "",
        gender: "0",
        msg: "",
        hospital: "",
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        msg: [{ required: true, message: "请输入信息", trigger: "blur" }],
      },
      currentPage1: 5,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getD() {
      phpGet().then((res) => {
        console.log(res);
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    addFn() {
      this.dialogFormVisible = true;
      this.title = "添加数据";
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.title = "编辑数据";
      this.obj = {
        id: row.id,
        name: row.name,
        age: row.age,
        gender: row.gender === "男" ? "0" : "1",
        msg: row.msg,
      };
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm("确定删除当前信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delPost({ id: row.id }).then((res) => {
            if (res.data.status === "200") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getData();
            } else {
              this.$message({
                type: "error",
                message: "删除失败!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title === "添加数据") {
            addPost({
              name: this.obj.name,
              age: this.obj.age,
              gender: this.obj.gender === "1" ? "女" : "男",
              msg: this.obj.msg,
            }).then((res) => {
              if (res.data.status === "200") {
                this.$message({
                  type: "success",
                  message: "添加成功!",
                });
                this.getData();
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
              } else {
                this.$message({
                  type: "error",
                  message: "添加失败!",
                });
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
              }
            });
          } else {
            editPost({
              id: this.obj.id,
              name: this.obj.name,
              age: this.obj.age,
              gender: this.obj.gender === "1" ? "女" : "男",
              msg: this.obj.msg,
            }).then((res) => {
              if (res.data.status === "200") {
                this.$message({
                  type: "success",
                  message: "编辑成功!",
                });
                this.getData();
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
              } else {
                this.$message({
                  type: "error",
                  message: "编辑失败!",
                });
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    getData() {
      getList().then((res) => {
        // console.log(res.data.users);
        this.tableData = res.data.users;
      });
    },
  },
};
</script>
<style lang="less">
th,
td {
  text-align: center !important;
}
.cell > span {
  margin: 0 10px;
}
.el-row {
  width: 100%;
  padding-bottom: 15px;
  box-sizing: border-box;
  text-align: left;
}
tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
  height: 700px !important;
  overflow: auto;
}
.el-table thead {
  font-weight: 500;
}
</style>
