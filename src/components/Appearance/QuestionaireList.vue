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

  <button style="position: relative; top: -50px; left: 100px" @click="addItem()">
    增加问卷
  </button>

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
        :is="component.component"
        :Name_Question="component.Name"
        :Id_Question="component.Id"
        :state_Question="component.State"
        :received_Question="component.Receive"
        @click-to-publish="PublishQuestionaire"
        @click-to-del="DeleteQuestionaire"
        @click-to-copy="CopyQuestionaire"
      ></QuestionaireItem>
    </el-scrollbar>
  </div>
</template>
<script>
import QuestionaireItem from "./QuestionaireItem.vue";

export default {
  components: {
    QuestionaireItem,
  },
  data() {
    return {
      SortMethods: "时间倒序",
      Sort: ["时间倒序", "时间正序", "问卷倒序", "问卷正序"],
      defaultState: "状态",
      StateArray: ["状态", "已发布", "未发布"],

      hasreceived: 0,
      input: "",
      components: [],
    };
  },
  methods: {
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
    addItem(
      name = this.SetName(),
      id = this.generateID(),
      state = "已发布",
      receive = 0
    ) {
      this.components.push({
        component: QuestionaireItem,
        Name: name,
        Id: id,
        State: state,
        Receive: receive,
      });
    },
    getNum_of_Questionaire() {
      //获得问卷数
      return this.components.length + 1;
    },
    SetName() {
      return "未命名问卷";
    },
    generateID() {
      var id = this.getNum_of_Questionaire();
      let idStr = id.toString();

      // 如果字符串长度小于 7,则在前面补足 0
      if (idStr.length < 7) {
        return idStr.padStart(7, "0");
      } else {
        return idStr;
      }
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
};
</script>

<style></style>
