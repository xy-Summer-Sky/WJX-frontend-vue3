<template>
  <div class="all">
    <div class="aside">
      <h3 style="position: relative; top: 50px">选择题型：</h3>
      <div class="titleGroup">
        <el-button
          type="info"
          @click="add_Single_Seclect"
          title="点击为问卷增加一道单选题"
          ><el-icon size="20"><Check /></el-icon>单选题</el-button
        >
        <p></p>
        <el-button
          type="info"
          @click="add_Multiple_Seclect"
          title="点击为问卷增加一道多选题"
          ><el-icon size="20"><Finished /></el-icon>多选题</el-button
        >
        <p></p>
        <el-button type="info" @click="add_FillBlanks" title="点击为问卷增加一道填空题"
          ><el-icon size="20"><Document /></el-icon>填空题</el-button
        >
        <p></p>
        <el-button type="info" @click="add_ShortAnswer" title="点击为问卷增加一道简答题"
          ><el-icon size="20"><DocumentCopy /></el-icon>简答题</el-button
        >
      </div>
    </div>
    <div class="head">
      <el-button
        type="primary"
        title="单击以保存你的问卷内容"
        style="
          position: relative;
          left: 1160px;
          height: 50px;
          width: 90px;
          font-size: 16px;
        "
        @click="Save"
        ><el-icon><DocumentChecked /></el-icon>保存</el-button
      >
    </div>
    <div class="main">
      <el-scrollbar height="720px">
        <div class="main_firsthalf">
          <el-input
            v-model="NameofQuestionaire"
            :rows="1"
            type="textarea"
            placeholder="请输入问卷名称"
            minlength="0"
            maxlength="30"
            :style="{ width: '500px', top: '50px', left: '200px' }"
            :input-style="{
              'font-size': '22px',
              color: '#409EFF',
              padding: '10px 20px',
              'text-align': 'center',
              'font-weight': 'bold',
            }"
          />

          <el-input
            v-model="DescriptionofQuestionaire"
            :autosize="true"
            type="textarea"
            placeholder="添加问卷描述"
            minlength="0"
            maxlength="1000"
            show-word-limit
            :style="{ width: '700px', top: '100px', left: '100px' }"
          />

          <el-divider style="position: relative; top: 130px" />
        </div>
        <div class="addtitles">
          <component
            v-for="(question, index) in Questions"
            :is="question.component"
            :key="question.id"
            :Question_num="index + 1"
            @click-to-Copy="CopyQuestion"
            @click-to-Del="DelQuestion"
            @click-to-Up="move_upQuestion"
            @click-to-Down="move_downQuestion"
            @click-to-Front="move_frontQuestion"
            @click-to-End="move_endQuestion"
          ></component>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import SingleChoiceQuestions from "./Title_type/SingleChoiceQuestions.vue";
import MultipleChoiceQuestions from "./Title_type/MultipleChoiceQuestions.vue";
import ShortAnswer from "./Title_type/ShortAnswer.vue";
import Fill_in_the_blanks from "./Title_type/Fill_in_the_blanks.vue";
export default {
  data() {
    return {
      NameofQuestionaire: "",
      DescriptionofQuestionaire: "",

      Questions: [],
    };
  },
  methods: {
    //读取账户时初始化列表
    Init_Questions() {},

    add_Single_Seclect() {
      this.Questions.push({
        type: "SC", //代表是哪种类型的问题
        component: SingleChoiceQuestions, //确定是哪个组件
        id: this.Questions.length + 1, //问题的唯一标识
      });
    },
    add_Multiple_Seclect() {
      this.Questions.push({
        type: "MC",
        component: MultipleChoiceQuestions,
        id: this.Questions.length + 1,
      });
    },
    add_FillBlanks() {
      this.Questions.push({
        type: "FB",
        component: Fill_in_the_blanks,
        id: this.Questions.length + 1,
      });
    },
    add_ShortAnswer() {
      this.Questions.push({
        type: "SA",
        component: ShortAnswer,
        id: this.Questions.length + 1,
      });
    },

    CopyQuestion(serialnum) {
      let copiedQuestion = this.Questions[serialnum - 1];
      copiedQuestion.id += 1;
      /* for (let i = serialnum; i < this.Questions.length; ++i) {
        Questions[i].id++;
      }*/
      this.Questions.splice(serialnum, 0, copiedQuestion);
    },
    DelQuestion(serialnum) {
      /*for (let i = serialnum; i < this.Questions.length; ++i) {
        Questions[i].id--;
      }*/
      this.Questions.splice(serialnum - 1, 1);
    },
    move_upQuestion(serialnum) {
      if (serialnum > 1) {
        [this.Questions[serialnum - 1], this.Questions[serialnum - 2]] = [
          this.Questions[serialnum - 2],
          this.Questions[serialnum - 1],
        ];
      }
    },
    move_downQuestion(serialnum) {
      if (serialnum < this.Questions.length) {
        [this.Questions[serialnum - 1], this.Questions[serialnum]] = [
          this.Questions[serialnum],
          this.Questions[serialnum - 1],
        ];
      }
    },
    move_frontQuestion(serialnum) {
      [this.Questions[serialnum - 1], this.Questions[0]] = [
        this.Questions[0],
        this.Questions[serialnum - 1],
      ];
    },
    move_endQuestion(serialnum) {
      [this.Questions[serialnum - 1], this.Questions[this.Questions.length - 1]] = [
        this.Questions[this.Questions.length - 1],
        this.Questions[serialnum - 1],
      ];
    },
  },
  components: {
    SingleChoiceQuestions,
    MultipleChoiceQuestions,
    ShortAnswer,
    Fill_in_the_blanks,
  },
};
</script>

<style scoped>
.all {
  background-color: rgb(250, 245, 245);
  height: 760px;
  width: 100%;
}
.head {
  position: absolute;
  width: 100%;
  height: 50px;
  background-color: rgb(75, 75, 75);
  top: 0px;
}
.aside {
  position: relative;
  background-color: white;
  /*border-radius: 10px;*/
  left: 100px;
  height: 760px;
  width: 220px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.titleGroup {
  position: relative;
  top: 50px;
  left: 60px;
  font-size: 30px;
}
.main {
  position: relative;
  left: 350px;
  width: 900px;
  top: -720px;
}
.main_firsthalf {
  position: relative;
  background-color: white;
  width: 900px;
  height: 260px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

#NameLocation {
  position: relative;
  top: 50px;
}
</style>
