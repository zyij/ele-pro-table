

<template>
  <div class="main">
    <div data-v-1d4225da="" class="table-box">
      <ele-pro-table ref="tableRef" title="用户列表" :columns="columns" :data="data">
        <!-- 表格 header 按钮 -->
        <template #tableHeader="scope">
          <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增用户</el-button>
          <el-button type="danger" :icon="Delete" plain @click="batchDelete" :disabled="!scope.isSelected">
            批量删除用户
          </el-button>
        </template>
        <!-- Expand -->

        <!-- 表格操作 -->
        <template #operation="scope">
          <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
          <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
          <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
        </template>
      </ele-pro-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { ElMessage } from "element-plus";

const data = [
  {
    "id": "187417962333526268",
    "username": "钱磊",
    "gender": 1,
    "age": 28,
    "idCard": "187417962333526268",
    "email": "h.uhcmcz@depcriwgrt.fo",
    "address": "江苏省 镇江市",
    "createTime": "1970-10-05 23:11:11",
    "status": 1,
  },
  {
    "id": "735852603456267240",
    "username": "钱平",
    "gender": 2,
    "age": 25,
    "idCard": "735852603456267240",
    "email": "v.qfjqmtfk@jtozmo.tp",
    "address": "辽宁省 葫芦岛市",
    "createTime": "2000-06-15 02:13:44",
    "status": 0,
    "avatar": "https://i.imgtg.com/2023/01/16/QRa0s.jpg"
  },
  {
    "id": "808231336790987675",
    "username": "石秀兰",
    "gender": 1,
    "age": 18,
    "idCard": "808231336790987675",
    "email": "m.rfcqv@yqhtj.td",
    "address": "西藏自治区 日喀则地区",
    "createTime": "2001-02-04 05:24:12",
    "status": 1,
    "avatar": "https://i.imgtg.com/2023/01/16/QRa0s.jpg"
  }
]

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const tableRef = ref<ProTableInstance>();

// 表格配置项
const columns: ColumnProps[] = [
  { type: "selection", fixed: "left", width: 80 },
  { type: "index", label: "序号", width: 80 },
  {
    prop: "username",
    label: "用户姓名",
    search: { el: "input" },
  },
  {
    prop: "gender",
    label: "性别",
    // 字典数据
    enum: [{ value: 1, label: '男' }, { value: 2, label: '女' }],
    search: { el: "select", props: { filterable: true } },
  },
  {
    // 多级 prop
    prop: "age",
    label: "年龄",
  },
  { prop: "idCard", label: "身份证号", search: { el: "input" } },
  { prop: "email", label: "邮箱" },
  { prop: "address", label: "居住地址" },
  {
    prop: "status",
    label: "用户状态",
    enum: [{ userStatus: 1, userLabel: '开启' }, { userStatus: 0, userLabel: '关闭' }],
    search: { el: "tree-select", props: { filterable: true } },
    fieldNames: { label: "userLabel", value: "userStatus" },
  },
  {
    prop: "createTime",
    label: "创建时间",
    width: 180,
    search: {
      el: "date-picker",
      span: 2,
      props: { type: "datetimerange", valueFormat: "YYYY-MM-DD HH:mm:ss" },
      defaultValue: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"]
    }
  },
  { prop: "operation", label: "操作", fixed: "right", width: 330 }
];

// 删除用户信息
const deleteAccount = async (params: any) => {
  ElMessage.info("你点击了删除")
};

// 批量删除用户信息
const batchDelete = async () => {
  ElMessage.info("你点击了批量删除")
};


// 打开 drawer(新增、查看、编辑)
const openDrawer = (title: string, row?: any) => {
  ElMessage.info(`你点击了${title}`)
};
</script>

<style scoped>
.main {
  --el-main-padding: 20px;
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: var(--el-main-padding);
  box-sizing: border-box;
  padding: 10px 12px;
  overflow-x: hidden;
  background-color: var(--el-bg-color-page);

}
</style>
