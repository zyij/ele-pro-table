# Vue3.2 + Element-Plus 二次封装 el-table（Pro 版 🚀🚀）

前言 📖
😀 欢迎大家在使用过程中发现任何问题或更好的想法，都可以在我的开源项目 issues 中提出。如果你觉得还不错，请帮我点个小小的 Star 🧡

## 一、安装和使用 👀

### 1、安装

```
 npm install ele-pro-table -S
```

### 2、使用

```
 // main.ts
import { createApp } from 'vue'
import EleProTable from "ele-pro-table";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "penk-ui/dist/style.css"
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(EleProTable);
app.mount('#app')
```

## 二、Git 仓库地址 (欢迎 Star⭐⭐⭐)

GitHub：[github.com/zyij/ele-pro-table](https://github.com/zyij/ele-pro-table)

## 三、EleProTable 功能 🚀🚀🚀

EleProTable 组件目前使用属性透传进行重构，支持 el-table && el-table-column 所有属性、事件、方法的调用，不会有任何心智负担。

表格内容自适应屏幕宽高，溢出内容表格内部滚动（flex 布局）
表格搜索、重置、分页查询 Hooks 封装 （页面使用不会存在任何搜索、重置、分页查询逻辑）
表格数据操作 Hooks 封装 （单条数据删除、批量删除、重置密码、状态切换等操作）
表格数据多选 Hooks 封装 （支持现跨页勾选数据）
表格数据导入组件、导出 Hooks 封装
表格搜索区域使用 Grid 布局重构，支持自定义响应式配置
表格分页组件封装（Pagination）
表格数据刷新、列显隐、列排序、搜索区域显隐设置
表格数据打印功能（可勾选行数据、隐藏列打印）
表格配置支持多级 prop（示例 ==> prop: user.detail.name）
单元格内容格式化、tag 标签显示（有字典 enum 会根据字典 enum 自动格式化）
支持多级表头、表头内容自定义渲染（支持作用域插槽、tsx 语法、h 函数）
支持单元格内容自定义渲染（支持作用域插槽、tsx 语法、h 函数）
配合 TreeFilter、SelectFilter 组件使用更佳（项目中有使用示例）

## 四、EleProTable 功能需求分析 📑

首先我们来看效果图（总共可以分为五个模块）：

1、表格搜索区域
2、表格数据操作按钮区域
3、表格功能按钮区域
4、表格主体内容展示区域
5、表格分页区域

### 五、EleProTable 文档 📚

### 1、EleProTable 属性（ProTableProps）：

使用 v-bind="$attrs" 通过属性透传将 EleProTable 组件属性全部透传到 el-table 上，所以我们支持 el-table 的所有 Props 属性。在此基础上，还扩展了以下 Props：

el-table 属性文档链接

| 属性名       | 类型        | 是否必传 | 默认值                                | 属性描述                                                                                             |
| ------------ | ----------- | -------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| columns      | ColumnProps | ✅       | —                                     | EleProTable 组件会根据此字段渲染搜索表单与表格列，详情见 ColumnProps                                 |
| data         | Array       | ❌       | —                                     | 静态 table data 数据，若存在则不会使用 requestApi 返回的 data                                        |
| requestApi   | Function    | ❌       | —                                     | 获取表格数据的请求 API                                                                               |
| requestAuto  | Boolean     | ❌       | true                                  | 表格初始化是否自动执行请求 API                                                                       |
| requestError | Function    | ❌       | —                                     | 表格 API 请求错误监听                                                                                |
| dataCallback | Function    | ❌       | —                                     | 后台返回数据的回调函数，可对后台返回数据进行处理                                                     |
| title        | String      | ❌       | —                                     | 表格标题，目前只在打印的时候用到                                                                     |
| pagination   | Boolean     | ❌       | true                                  | 是否显示分页组件：pagination 为 false 后台返回数据应该没有分页信息 和 list 字段，data 就是 list 数据 |
| initParam    | Object      | ❌       | {}                                    | 表格请求的初始化参数，该值变化会自动请求表格数据                                                     |
| toolButton   | Boolean     | ❌       | true                                  | 是否显示表格功能按钮                                                                                 |
| rowKey       | String      | ❌       | 'id'                                  | 当表格数据多选时，所指定的 id                                                                        |
| searchCol    | Object      | ❌       | { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 } | 表格搜索项每列占比配置                                                                               |

### 2、Column 配置（ColumnProps）：

使用 v-bind="column" 通过属性透传将每一项 column 属性全部透传到 el-table-column 上，所以我们支持 el-table-column 的所有 Props 属性。在此基础上，还扩展了以下 Props：

| 属性名 | 类型 | 是否必传 | 默认值 | 属性描述 |
| -------------- | -------------- |  -------------- |  -------------- |  -------------- | 
| tag | Boolean | ❌ | false | 当前单元格值是否为标签展示，可通过 enum 数据中 tagType 字段指定 tag 类型 |
| isShow | Boolean  | ❌ | true | 当前列是否显示在表格内(只对 prop 列生效) |
| search | SearchProps | ❌ | — | 搜索项配置，详情见 SearchProps |
| enum | Object/Function | ❌ | — | 字典，可格式化单元格内容，还可以作为搜索框的下拉选项（字典可以为 API 请求函数，内部会自动执行） |
| isFilterEnum | Boolean | ❌ | true | 当前单元格值是否根据 enum 格式化（例如 enum 只作为搜索项数据，不参与内容格式化） |
| fieldNames | Object | ❌ | —  |指定 label && value && children 的 key 值 |
| headerRender | Function | ❌ | — | 自定义表头内容渲染（tsx 语法、h 语法） |
| render | Function | ❌ | —  |自定义单元格内容渲染（tsx 语法、h 语法） |
| _children | ColumnProps | ❌ | — | 多级表头 |

### 3、搜索项 配置（SearchProps）：

使用 v-bind="column.search.props“ 通过属性透传将 search.props 属性全部透传到每一项搜索组件上，所以我们支持 input、select、tree-select、date-packer、time-picker、time-select、switch 大部分属性，并在其基础上还扩展了以下 Props：

| 属性名       | 类型     | 是否必传 | 默认值 | 属性描述                                                                                                                                       |
| ------------ | -------- | -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| el           | String   | ❌       | —      | 当前项搜索框的类型，支持：input、input-number、select、select-v2、tree-select、cascader、date-packer、time-picker、time-select、switch、slider |
| props        | Object   | ❌       | —      | 根据 element plus 官方文档来传递，该属性所有值会透传到组件                                                                                     |
| defaultValue | Any      | ❌       | —      | 搜索项默认值                                                                                                                                   |
| key          | String   | ❌       | —      | 当搜索项 key 不为 prop 属性时，可通过 key 指定                                                                                                 |
| order        | Number   | ❌       | —      | 搜索项排序（从小到大）                                                                                                                         |
| span         | Number   | ❌       | 1      | 搜索项所占用的列数，默认为 1 列                                                                                                                |
| offset       | Number   | ❌       | —      | 搜索字段左侧偏移列数                                                                                                                           |
| render       | Function | ❌       |        | 自定义搜索内容渲染（tsx 语法、h 语法）                                                                                                         |

### 4、EleProTable 事件：

根据 ElementPlus Table 文档在 EleProTable 组件上绑定事件即可，组件会通过 $attrs 透传给 el-table。

[el-table 事件文档链接](https://element-plus.org/zh-CN/component/table.html#table-%E6%96%B9%E6%B3%95)

### 5、EleProTable 方法：

EleProTable 组件暴露了 el-table 实例和一些组件内部的参数和方法：

[el-table 方法文档链接](https://element-plus.org/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6)

| 方法名          | 描述                                                                               |
| --------------- | ---------------------------------------------------------------------------------- |
| element         | el-table 实例，可以通过 tableRef.value.element.方法名来调用 el-table 的所有方法    |
| tableData       | 当前页面所展示的数据                                                               |
| searchParam     | 所有的搜索参数，不包含分页                                                         |
| searchInitParam | 所有的搜索初始化默认的参数                                                         |
| pageable        | 当前表格的分页数据                                                                 |
| getTableList    | 获取、刷新表格数据的方法（携带所有参数）                                           |
| search          | 表格查询方法，相当于点击搜索按钮                                                   |
| reset           | 重置表格查询参数，相当于点击重置按钮                                               |
| clearSelection  | 清空表格所选择的数据，除此方法之外还可使用 tableRef.value.element.clearSelection() |
| enumMap         | 当前表格使用的所有字典数据（Map 数据结构）                                         |
| isSelected      | 表格是否选中数据                                                                   |
| selectedList    | 表格选中的数据列表                                                                 |
| selectedListIds | 表格选中的数据列表的 id                                                            |

### 6、EleProTable 插槽：

| 插槽名                 | 描述                                                                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| —                      | 默认插槽，支持直接在 EleProTable 中写 el-table-column 标签                                                                              |
| tableHeader            | 自定义表格头部左侧区域的插槽，一般情况该区域放操作按钮                                                                                  |
| toolButton             | 自定义表格头部左右侧侧功能区域的插槽                                                                                                    |
| append                 | 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上。 |
| empty                  | 当表格数据为空时自定义的内容                                                                                                            |
| pagination             | 分页组件插槽                                                                                                                            |
| column.prop            | 单元格的作用域插槽                                                                                                                      |
| column.prop + "Header" | 表头的作用域插槽                                                                                                                        |

## 六、代码实现 & 基础使用 💪（代码较多，详情请去项目里查看）

使用一段话总结下我的想法：📚📚
🤔 前提：首先我们在封装 EleProTable 组件的时候，在不影响 el-table 原有的属性、事件、方法的前提下，然后在其基础上做二次封装，否则做得再好，也不太完美。

🧐 思路：把一个表格页面所有重复的功能 （表格多选、查询、重置、刷新、分页、数据操作二次确认、文件下载、文件上传） 都封装成 Hooks 函数钩子或组件，然后在 EleProTable 组件中使用这些函数钩子或组件。在页面中使用的时，只需传给 EleProTable 当前表格数据的请求 API、表格配置项 columns 就行了，数据传输都使用 作用域插槽 或 tsx 语法从 EleProTable 传递给父组件就能在页面上获取到了。

```


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

```

## 七、贡献者 👨‍👦‍👦

[HalseySpicy](https://github.com/HalseySpicy)
[denganjia](https://github.com/denganjia)
