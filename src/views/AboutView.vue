<template>
  <div class="flex">

    <div>
      <NavSiderBar></NavSiderBar>
    </div>
    <div class="about">
      <el-icon :size="20" color="#409EFC" class="no-inherit">
        <i-ep-Share />
      </el-icon>
      <el-button>
        <el-icon><i-ep-circle-check-filled /></el-icon>
        <i-ep-add-location />
      </el-button>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input size="small" v-model="searchKey" placeholder="请输入" />
        </el-col>
        <el-col :span="2">
          <el-button size="small" @click="getOrderList()">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small" @click="getOrderList()">刷新</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="small" @click="newAdd()" type="primary">新增</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="tel" label="电话" width="180" />
        <el-table-column prop="address" label="Address" />
        <el-table-column prop="address" label="操作">
          <template #default="scope">
            <el-button size="small"
              @click="actionHandle(scope.row, 'edit')"
            >编辑</el-button
            >
            <el-popconfirm
              @confirm="actionHandle(scope.row, 'del')"
              @cancel="() => {}"
              title="确认删除？">
              <template #reference>
                <el-button size="small" type="danger" >删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;">
        <!-- 分页 -->
        <el-pagination
          background
          small
          :page-size="pageSetting.pageSize"
          @current-change="handelCurrentChange"
          v-model:current-page="pageSetting.pageNum"
          layout="prev, pager, next"
          :total="pageSetting.total"
        />
      </div>
      <!-- <div class="card"></div> -->
      <el-dialog
        v-model="dialogVisible"
        title="Tips"
        width="80%"
        :before-close="handleClose"
      >
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" />
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="formInline.tel" placeholder="Approved by" />
          </el-form-item>
          <el-form-item label="Resources" prop="resource">
            <el-radio-group v-model="formInline.sex" class="ml-4">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="111"></el-option>
              <el-option label="区域二" value="222"></el-option>
              <el-option label="区域三" value="333"></el-option>
            </el-select>
          </el-form-item>
          <el-upload
            v-model:file-list="fileList"
            list-type="picture-card"
            action="/uploadImage"
            :auto-upload="true"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeUploadHanlde"
            :http-request="httpRequestHandle"
            :on-remove="handleRemove"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
  
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="commitForm()">保存</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref, reactive, onMounted } from 'vue'
import request from '../utils/request'
// import NavSiderBar from '@/render/components/NavSiderBar'

const dialogVisible = ref(false)
const isEdit = ref(false)
const searchKey = ref('')
const pageSetting = ref({
  pageNum: 1,
  pageSize: 5,
  total: 0
})
const dialogImageUrl = ref('')
const fileList = ref([])
const tableData = ref([])
let formInline = reactive({
  name: '',
  tel: '',
  region: '',
  sex: '1'
})

const handleRemove = (uploadFile: any, uploadFiles: any) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile: any) => {
  // dialogImageUrl.value = uploadFile.url!
  // dialogVisible.value = true
}
const httpRequestHandle = (uploadFile: any) => {
  console.log('httpRequestHandle', uploadFile.file)
  // console.log('httpRequestHandle', fileList)
  let file = uploadFile.file
  // 将图片转换为 formData对象
  let formdata = new FormData()
  formdata.append("file",file)
  request.post('/uploadImage', {
    data: formdata,
    headers: {
    //请求头这个一定要写
      'Content-Type': 'multipart/form-data',
    },
  }).then((data) => {
    console.log('data', data)
    // getOrderList()
  });
}

const beforeUploadHanlde = (uploadFile: any) => {
  console.log('uploadFile', uploadFile)
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const getOrderList = () => {
  const params = {
    pageNum: pageSetting.value.pageNum,
    pageSize: pageSetting.value.pageSize,
    key: searchKey.value
  }
  request.get('/getUserPage', { params }).then((data) => {
    console.log('data', data)
    tableData.value = data.data.content
    pageSetting.value.pageNum = data.data.pageNum
    pageSetting.value.pageSize = data.data.pageSize
    pageSetting.value.total = data.data.total
  });
}

const newAdd = () => {
  dialogVisible.value = true
  isEdit.value = false
  const resetData = {
    name: '',
    tel: '',
    region: '',
    sex: '1'
  }
  Object.assign(formInline, resetData)
  console.log('[][[]]', formInline)
}
const handleClose = () => {
  dialogVisible.value = false
  Object.assign(formInline, {
    name: '',
    tel: '',
    region: '',
    sex: '1'
  })
}
const handelCurrentChange = (curPage: number) => {
  pageSetting.value.pageNum = curPage
  getOrderList()
}
const actionHandle = (rowItem: any, type: string) => {
  if (type == 'edit') {
    dialogVisible.value = true
    isEdit.value = true
    Object.assign(formInline, rowItem)
  } else {
    request.post('/deleteUser', {
      _id: rowItem._id
    }).then((data) => {
      console.log('data', data)
      getOrderList()
    });
    
  }
}
const commitForm = () => {
  const params = {
    ...formInline
  }
  if (isEdit.value) {
    request.post('/updateUser', {
      ...params
    }).then((data) => {
      console.log('data', data)
      handleClose()
      getOrderList()
    });
  } else {

    request.post('/addUser', {
      ...params
    }).then((data) => {
      console.log('data', data)
      handleClose()
      getOrderList()
    });
  }
}

onMounted(() => {
  getOrderList()
})
</script>

<style>
/* class为card的流动色彩背景 */
.card {
  position: relative;
  width: 400px;
  height: 400px;
  border-radius: 40px;
  padding: 40px;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: inset 0px 0px 40px rgba(0, 0, 0, .8), 0px 8px 20px rgba(0, 0, 0, .6);
}

.card::after {
  content: '';
  position: absolute;
  top: -300px;
  right: -300px;
  bottom: -300px;
  left: -300px;
  background: conic-gradient(from 180deg at 50% 50%, #12001B -97.5deg, #000000 14.05deg, #040EFF 54.01deg, #8000FF 113.42deg, #00B6B6 185.62deg, #12001B 262.5deg, #000000 374.05deg);
filter: blur(60px) brightness(1.5);
  z-index: -1;
  animation: 30s move linear infinite;
}


@keyframes move {
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(540deg);
  }
}
.flex {
  display: flex;
  .about {
    overflow: hidden;
    flex: 1;
  }
}
</style>
