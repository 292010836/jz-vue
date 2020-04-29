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
      <!-- 讲师头像：TODO -->
      <!--<el-form-item label="讲师头像">-->
        <!--<upload-->
          <!--:uploadImageUrl="uploadUrl"-->
          <!--v-model="teacher.avatar"-->
          <!--v-bind:url="imageurl"-->
          <!--v-on:func="show($event)"-->
        <!--&gt;-->
        <!--</upload>-->
      <!--</el-form-item>-->

      <el-form-item label="讲师头像">

        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>

        <!--
    v-show：是否显示上传组件
    :key：类似于id，如果一个页面多个图片上传控件，可以做区分
    :url：后台上传的url地址
    @close：关闭上传组件
    @crop-upload-success：上传成功后的回调
    :auto-upload="false"
      <input type="file" name="file"/>
    -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
  import teacher from '@/api/edu/teacher'
  // import upload  from '@/components/Upload'
  import ImageCropper from '@/components/ImageCropper'
  import PanThumb from '@/components/PanThumb'
  export default {
    components: { ImageCropper, PanThumb },
    data() {
      return {
        teacher: {
          // avatar:"https://guli-file-190513.oss-cn-beijing.aliyuncs.com/avatar/default.jpg"
        },
        //上传弹框组件是否显示
        imagecropperShow:false,
        imagecropperKey:0,//上传组件key值
        BASE_API:process.env.BASE_API, //获取dev.env.js里面地址
        saveBtnDisabled:false  // 保存按钮是否禁用,
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
      close() { //关闭上传弹框的方法
        this.imagecropperShow=false
        //上传组件初始化
        this.imagecropperKey = this.imagecropperKey+1
      },
      //上传成功方法
      cropSuccess(data) {
        this.imagecropperShow=false
        //上传之后接口返回图片地址
        this.teacher.avatar = data.url
        this.imagecropperKey = this.imagecropperKey+1
      },
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
