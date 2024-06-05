<template>
  <h1>问卷列表</h1>
  <el-dropdown style="position: relitive; left: 430px; top: -60px">
    <el-button>
      {{ this.SortMethods }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="SetSortMethods1">{{ this.Sort[0] }}</el-dropdown-item>
        <el-dropdown-item @click="SetSortMethods2">{{ this.Sort[1] }}</el-dropdown-item>
        <el-dropdown-item @click="SetSortMethods3">{{ this.Sort[2] }}</el-dropdown-item>
        <el-dropdown-item @click="SetSortMethods4">{{ this.Sort[3] }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <el-dropdown style="position: relative; left: 470px; top: -60px">
    <el-button>
      {{ defaultState }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="SetStateClassification1">{{
          this.StateArray[0]
        }}</el-dropdown-item>
        <el-dropdown-item @click="SetStateClassification2">{{
          this.StateArray[1]
        }}</el-dropdown-item>
        <el-dropdown-item @click="SetStateClassification3">{{
          this.StateArray[2]
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <el-input
    v-model="input"
    style="width: 300px; position: absolute; left: 700px; top: 25px"
    placeholder="可以输入问卷名来查找..."
    @keyup.enter.native="Find"
    clearable
  >
    <template #append>
      <el-button @click="Find"
        ><el-icon><Search /></el-icon
      ></el-button>
    </template>
  </el-input>

  <div class="QuestionList">
    <el-scrollbar height="600px">
      <QuestionaireItem
        v-for="component in components"
        :Name_Question="component.title"
        :Description_Question="component.description"
        :Id_Question="component.id"
        :CreatedAt_Question="component.createdAt"
        :state_Question="this.State"
        :received_Question="this.Receive"
        :Id_User="this.userid"
        :Name_User="this.username"
        :Token_User="this.usertoken"
        @click-to-publish="PublishQuestionaire"
        @click-to-del="DeleteQuestionaire"
        @click-to-copy="CopyQuestionaire"
      ></QuestionaireItem>
      <!--上面前五个变量都是问卷相关信息，即从data_array参数传递过来-->
      <!--他们分别表示了：  问卷的标题，问卷的编号，问卷的问卷的创建时间，问卷的状态，问卷的答卷数，后两者等待后端更新-->
      <!--后面三个参数代表拥有此问卷的用户信息-->
    </el-scrollbar>
  </div>
</template>
<script>
import QuestionaireItem from "./QuestionaireItem.vue";

export default {
  props: {
    SurveyName: {
      //如果是新建问卷的话会用到，表示新建问卷的标题
      type: String,
      required: true,
    },
    userid: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    usertoken: {
      type: String,
      required: true,
    },
    data_array: {
      type: Array,
      required: true,
    },
  },

  watch: {
    data_array(newVal) {
      this.components = this.HandleArray();
    },
  },
  data() {
    return {
      SortMethods: "时间倒序",
      Sort: ["时间倒序", "时间正序", "问卷倒序", "问卷正序"],
      defaultState: "状态",
      StateArray: ["状态", "已发布", "未发布"],

      //临时变量
      State: "未发布",
      Receive: 0,

      hasreceived: 0,
      input: "", //输入问卷名查找问卷
      components: [], //问卷列表 元素：问卷序号id(Number) 问卷标题title(String) 创建者createBy(Number)
      //问卷描述description(String/null) 创建时间createdAt(String)
      Rubish: [], //回收站
    };
  },
  methods: {
    HandleArray() {
      let array = [];

      for (let i = 0, l = this.data_array.length; i < l; ++i) {
        let str = this.generateID(this.data_array[i].id);
        array.push({
          id: str,
          title: this.data_array[i].title,
          createdBy: this.data_array[i].createdBy,
          description: this.data_array[i].description,
          createdAt: this.data_array[i].createdAt,
        });
      }
      return array;
    },
    generateID(id) {
      let idStr = id.toString();
      // 如果字符串长度小于 7,则在前面补足 0
      if (idStr.length < 7) {
        return idStr.padStart(7, "0");
      } else {
        return idStr;
      }
    },
    addItem( //新增问卷
      ID = this.generateID(this.components.length * this.userid),
      name = this.SurveyName === "" ? "未命名问卷" : this.SurveyName
    ) {
      this.components.push({
        id: ID,
        title: name,
        createdBy: this.userid,
        description: "",
        createdAt: this.FormatDateTime(new Date()),
      });
    },
    FormatDateTime(dateObj) {
      //new Date对象转化成2024-05-31T03:14:36.000+00:00
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      const hours = String(dateObj.getHours()).padStart(2, "0");
      const minutes = String(dateObj.getMinutes()).padStart(2, "0");
      const seconds = String(dateObj.getSeconds()).padStart(2, "0");
      const milliseconds = String(dateObj.getMilliseconds()).padStart(3, "0");
      const offsetMinutes = dateObj.getTimezoneOffset();
      const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
      const offsetMinutesRemainder = Math.abs(offsetMinutes) % 60;
      const offsetSign = offsetMinutes >= 0 ? "-" : "+";
      const offsetString = `${offsetSign}${String(offsetHours).padStart(2, "0")}:${String(
        offsetMinutesRemainder
      ).padStart(2, "0")}`;

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${offsetString}`;
    },
    PublishQuestionaire() {
      alert("发布问卷");
    },
    DeleteQuestionaire(serialnum) {
      const trimmedStr = serialnum.replace(/^0+/, "");
      const num = parseInt(trimmedStr);
      this.components.splice(num - 1, 1);
    },
    CopyQuestionaire(serialnum) {},
    Find() {
      alert("执行搜索");
    },

    getNum_of_Questionaire() {
      //获得问卷数
      return this.components.length + 1;
    },

    SetSortMethods1() {
      this.SortMethods = this.Sort[0];
    },
    SetSortMethods2() {
      this.SortMethods = this.Sort[1];
    },
    SetSortMethods3() {
      this.SortMethods = this.Sort[2];
    },
    SetSortMethods4() {
      this.SortMethods = this.Sort[3];
    },

    SetStateClassification1() {
      this.defaultState = this.StateArray[0];
    },
    SetStateClassification2() {
      this.defaultState = this.StateArray[1];
    },
    SetStateClassification3() {
      this.defaultState = this.StateArray[2];
    },
  },
  components: {
    QuestionaireItem,
  },
};
</script>

<style></style>
