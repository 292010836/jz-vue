<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import teacher from '@/api/edu/teacher'

  export default {
    data() {
      return {
        teacher: {
          // avatar:"https://guli-file-190513.oss-cn-beijing.aliyuncs.com/avatar/default.jpg"
        },
        saveBtnDisabled: false  // 保存按钮是否禁用,
      }
    },

    created() {
        this.init();
    },

    watch:{
      $route(to,from){
        this.init();
      }
    },
    methods: {
      //初始化解决bug
      init() {
        //判断路径有id值,做修改
        if(this.$route.params && this.$route.params.id) {
          //调用根据id查询的方法
          this.getInfo(this.$route.params.id)
        } else { //路径没有id值，做添加
          //清空表单
          this.teacher = {}
        }
      },
      //判断是更新还是添加
      saveOrUpdate() {
        if (this.teacher.id){
          //更新
          this.updateTeacher()
        }else{
          //添加
         this.saveTeacher()
        }


      },
      //根据讲师id查询讲师
      getInfo(id) {
        teacher.findTeacherById(id)
          .then(response => {
            console.log(response);
            this.teacher = response.data
          })
      },
      //添加讲师
      saveTeacher() {
        teacher.addTeacher(this.teacher)
          .then(response => {
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
            //回到列表页面 路由跳转
            this.$router.push({ path: '/teacher/table' })
          })
      },
      //更新讲师
      updateTeacher() {
        teacher.updateTeacher(this.teacher)
          .then(response => {
            this.$message({
              type: 'success',
              message: '更新成功!'
            })
            //回到列表页面 路由跳转
            this.$router.push({ path: '/teacher/table' })
          })
      }

    }

  }
</script>
