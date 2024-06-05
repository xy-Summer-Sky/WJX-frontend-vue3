<template>
  <div class="QuestionaireItem">
    <el-link
      id="name_type"
      :title="NameOfQuestionaire"
      @click="
        NavigateToCreate('/Create', {
          survey_id: this.praseId(),
          user_id: this.Id_User,
          Name: this.Name_Question,
          Description: this.Description_Question,
        })
      "
      >{{ NameOfQuestionaire }}</el-link
    >
    <div class="state">
      <span>{{ "ID:" + QuestionaireId }}</span>
      <span>
        <el-icon id="icon_type" :color="state_color"><CircleCheckFilled /></el-icon>
        <span style="position: relative; left: 23px">{{ State }}</span>
      </span>
      <span style="position: relative; left: 40px">
        {{ "已答卷：" + received }}
      </span>
      <span style="position: relative; left: 60px">
        {{ "创建时间：" + CreatedTime }}
      </span>
    </div>
    <el-divider style="position: relative; top: -15px" />
    <div class="Operate">
      <el-icon :size="25" :color="fabu"><Promotion /></el-icon>
      <el-link
        :underline="false"
        style="position: relative; top: -8px; font-size: 15px"
        @mouseover="Setfabu"
        @mouseout="Resetfabu"
        @click="Publish"
        >发布</el-link
      >
      <el-icon :size="20" style="position: relative; left: 20px; top: -3px"
        ><Delete
      /></el-icon>
      <el-link
        :underline="false"
        style="position: relative; top: -9px; left: 23px"
        title="删除此问卷"
        @click="Delete"
        >删除</el-link
      >
      <el-icon :size="20" style="position: relative; top: -3px; left: 35px"
        ><CopyDocument
      /></el-icon>
      <el-link
        :underline="false"
        style="position: relative; top: -9px; left: 38px"
        title="将此问卷复制一份"
        @click="Copy"
        >复制</el-link
      >
    </div>
  </div>
  <p></p>
</template>
<script>
//每个问卷通过点击标题跳转到其独立的创建界面，因此与Create类形成父子关系
//考虑到可能要与每个用户信息绑定，将从QuestionaireList传递用户信息参数
import DescriptionItem from "element-plus/es/components/descriptions/src/description-item";
import CreateAppearance from "./CreateAppearance.vue";
export default {
  props: {
    Name_Question: {
      type: String,
      required: true,
    },
    Description_Question: {
      type: String,
      required: true,
    },
    Id_Question: {
      type: String,
      required: true,
    },
    state_Question: {
      type: String,
      required: true,
    },
    received_Question: {
      type: Number,
      required: true,
    },
    CreatedAt_Question: {
      type: String,
      required: true,
    },
    Id_User: {
      type: Number,
      required: true,
    },
    Name_User: {
      type: String,
      required: true,
    },
    Token_User: {
      type: String,
      required: true,
    },
  },
  component: {
    CreateAppearance,
  },
  created() {
    this.CreatedTime = this.formatDateTime(this.CreatedAt_Question);
  },
  data() {
    return {
      NameOfQuestionaire: this.Name_Question,
      DESCRIPTION: this.Description_Question,
      QuestionaireId: this.Id_Question,
      State: this.state_Question,
      received: this.received_Question,
      CreatedTime: "",

      state_color: this.Setstate_color(),
      fabu: "black",
    };
  },
  methods: {
    NavigateToCreate(path, param) {
      //点击问卷标题将跳转值对应创建界面进行编辑
      this.$router.push({ path, query: param }, "_blank");
      //console.log(this.Description_Question);
    },
    Publish() {
      this.$emit("click-to-publish");
    },
    Delete() {
      this.$emit("click-to-del", this.Id_Question);
    },
    Copy() {
      this.$emit("click-to-copy", this.Id_Question);
    },

    //格式化时间
    formatDateTime(dateTimeString = "2024-05-31T03:14:36.000+00:00") {
      //2024-05-31T03:14:36.000+00:00转化为正常阅读形态
      const dateTime = new Date(dateTimeString);
      const year = dateTime.getFullYear();
      const month = String(dateTime.getMonth() + 1).padStart(2, "0");
      const day = String(dateTime.getDate()).padStart(2, "0");
      const hours = String(dateTime.getHours()).padStart(2, "0");
      const minutes = String(dateTime.getMinutes()).padStart(2, "0");
      const seconds = String(dateTime.getSeconds()).padStart(2, "0");

      return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
    },
    praseId(str = this.Id_Question) {
      return parseInt(str);
    },
    Setfabu() {
      this.fabu = "aqua";
    },
    Resetfabu() {
      this.fabu = "black";
    },
    Setstate() {
      if (1) {
        this.State = "已发布";
      } else {
        this.State = "未发布";
      }
    },
    RefreshRecieved() {
      this.received = 3;
    },
    Setstate_color() {
      if (this.state_Question == "已发布") {
        return "green";
      } else {
        return "black";
      }
    },
    SetNumberStandard(num) {
      let numStr = num.toString();
      return numStr.padStart(2, "0");
    },
  },
};
</script>

<style>
.QuestionaireItem {
  position: relative;
  background-color: aliceblue;
  height: 120px;
  width: 1000px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.state {
  position: relative;
  left: 400px;
  top: -13px;
}
.Operate {
  position: relative;
  top: -15px;
  left: 750px;
}
#name_type {
  position: relative;
  top: 10px;
  left: 20px;
  font-size: 20px;
}
#icon_type {
  position: relative;
  left: 20px;
  top: 2px;
}
</style>
