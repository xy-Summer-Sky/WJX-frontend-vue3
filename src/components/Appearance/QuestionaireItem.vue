<template>
  <div class="QuestionaireItem">
    <el-link href="" id="name_type" :underline="false" :title="NameOfQuestionaire">{{
      NameOfQuestionaire
    }}</el-link>
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
        {{
          "创建时间：" +
          date.getFullYear() +
          "年" +
          date.getMonth() +
          "月" +
          date.getDay() +
          "日"
        }}
      </span>
      <span style="position: relative; left: 70px">
        {{
          SetNumberStandard(date.getHours()) + ":" + SetNumberStandard(date.getMinutes())
        }}
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
export default {
  props: {
    Name_Question: {
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
      requirde: true,
    },
  },
  data() {
    return {
      NameOfQuestionaire: this.Name_Question,
      QuestionaireId: this.Id_Question,
      State: this.state_Question,
      received: this.received_Question,

      state_color: this.Setstate_color(),
      fabu: "black",
      date: new Date(),
    };
  },
  methods: {
    Publish() {
      this.$emit("click-to-publish");
    },
    Delete() {
      this.$emit("click-to-del", this.Id_Question);
    },
    Copy() {
      this.$emit("click-to-copy", this.Id_Question);
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
