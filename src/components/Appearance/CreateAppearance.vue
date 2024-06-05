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
      <img
        style="position: relative; top: 250px"
        src="/public/Picture/Save.png"
        alt="图片加载失败！"
        height="100px"
      />
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
          <div v-for="(question, index) in Questions">
            <SingleChoiceQuestions
              :key="question.id"
              v-if="question.type === '1'"
              :ref="`typeARef${index}`"
              :Question_num="index + 1"
              :Question_title="question.title"
              :Type="question.type"
              :ID="question.id"
              :ID_survey="question.survey_id"
              :If_Create="question.create"
              @click-to-Copy="CopyQuestion"
              @click-to-Del="DelQuestion"
              @click-to-Up="move_upQuestion"
              @click-to-Down="move_downQuestion"
              @click-to-Front="move_frontQuestion"
              @click-to-End="move_endQuestion"
            />
            <MultipleChoiceQuestions
              :key="question.id"
              v-if="question.type === '2'"
              :ref="`typeBRef${index}`"
              :Question_num="index + 1"
              :Question_title="question.title"
              :Type="question.type"
              :ID="question.id"
              :ID_survey="question.survey_id"
              :If_Create="question.create"
              @click-to-Copy="CopyQuestion"
              @click-to-Del="DelQuestion"
              @click-to-Up="move_upQuestion"
              @click-to-Down="move_downQuestion"
              @click-to-Front="move_frontQuestion"
              @click-to-End="move_endQuestion"
            />
            <Fill_in_the_blanks
              :key="question.id"
              v-if="
                question.type === '3' ||
                question.type === '31' ||
                question.type === '32' ||
                question.type === '33' ||
                question.type === '34' ||
                question.type === '35' ||
                question.type === '36'
              "
              :ref="`typeCRef${index}`"
              :Question_num="index + 1"
              :Question_title="question.title"
              :Type="question.type"
              :ID="question.id"
              :ID_survey="question.survey_id"
              :If_Create="question.create"
              @click-to-Copy="CopyQuestion"
              @click-to-Del="DelQuestion"
              @click-to-Up="move_upQuestion"
              @click-to-Down="move_downQuestion"
              @click-to-Front="move_frontQuestion"
              @click-to-End="move_endQuestion"
            />
            <ShortAnswer
              :key="question.id"
              v-if="question.type === '4'"
              :ref="`typeDRef${index}`"
              :Question_num="index + 1"
              :Question_title="question.title"
              :Type="question.type"
              :ID="question.id"
              :ID_survey="question.survey_id"
              :If_Create="question.create"
              @click-to-Copy="CopyQuestion"
              @click-to-Del="DelQuestion"
              @click-to-Up="move_upQuestion"
              @click-to-Down="move_downQuestion"
              @click-to-Front="move_frontQuestion"
              @click-to-End="move_endQuestion"
            />
          </div>
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
import axios from "axios";
export default {
  data() {
    return {
      NameofQuestionaire: this.$route.query.Name == "" ? "" : this.$route.query.Name,
      DescriptionofQuestionaire:
        this.$route.query.Description == "" ? "" : this.$route.query.Description,

      typeARefs: [],
      typeBRefs: [],
      typeCRefs: [],
      typeDRefs: [],

      Questions: [],
      UntreatedData: [],
    };
  },
  created() {
    this.Init_Questions();
  },
  updated() {},
  methods: {
    collectRefs() {
      this.Questions.forEach((item, index) => {
        if (item.type === "1") {
          this.$refs[`typeARef${index}`] &&
            this.typeARefs.push(this.$refs[`typeARef${index}`]);
          //console.log(this.$refs[`typeARef${index}`]);
        } else if (item.type === "2") {
          this.$refs[`typeBRef${index}`] &&
            this.typeBRefs.push(this.$refs[`typeBRef${index}`]);
          //console.log(this.$refs[`typeBRef${index}`]);
        } else if (
          item.type === "3" ||
          item.type === "31" ||
          item.type === "32" ||
          item.type === "33" ||
          item.type === "34" ||
          item.type === "35" ||
          item.type === "36"
        ) {
          this.$refs[`typeCRef${index}`] &&
            this.typeCRefs.push(this.$refs[`typeCRef${index}`]);
          //console.log(this.$refs[`typeCRef${index}`]);
        } else if (item.type === "4") {
          this.$refs[`typeDRef${index}`] &&
            this.typeDRefs.push(this.$refs[`typeDRef${index}`]);
          //console.log(this.$refs[`typeDRef${index}`]);
        }
        // ... 处理其他类型
      });
    },
    Save() {
      this.typeARefs = [];
      this.typeBRefs = [];
      this.typeCRefs = [];
      this.typeDRefs = [];
      this.collectRefs();
      //保存当前更改到数据库   this.NameofQuestionaire   this.DescriptionofQuestionaire
      this.typeARefs.forEach((component) => {
        //console.log(component[0]);
        for (let i = 0; i < 1; ++i) {
          component[i].ReturnParams();
        }
      });

      this.typeBRefs.forEach((component) => {
        for (let i = 0; i < 1; ++i) {
          component[i].ReturnParams();
        }
      });

      this.typeCRefs.forEach((component) => {
        for (let i = 0; i < 1; ++i) {
          component[i].ReturnParams();
        }
      });

      this.typeDRefs.forEach((component) => {
        for (let i = 0; i < 1; ++i) {
          component[i].ReturnParams();
        }
      });

      for (let i = 0, l = this.Questions.length; i < l; ++i) {
        this.Questions[i].create = false;
      }
      const baseURL = "http://localhost:8080/api/surveys";
      const sid = this.$route.query.survey_id;
      const URL = `${baseURL}/${sid}`;
      axios
        .put(
          URL,
          {
            id: sid,
            title: this.NameofQuestionaire,
            createdBy: this.$route.query.user_id,
            description: this.DescriptionofQuestionaire,
            createdAt: "",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + "123456",
            },
          }
        )
        .then(function (response) {
          alert("问卷保存成功！");
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    showFinish() {
      ElMessage({
        message: "您的问卷信息已保存！",
        type: "success",
      });
    },
    showWrong() {
      ElMessage.error("问卷保存失败！");
    },
    //读取账户时初始化列表
    Init_Questions() {
      const surveyId = this.$route.query.survey_id;
      const baseURL = "http://localhost:8080/api/surveys";
      const backindex = "questions";
      const URL = `${baseURL}/${surveyId}/${backindex}`;
      axios
        .get(URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + "123456",
          },
        })
        .then((response) => {
          //console.log(response.data);
          this.UntreatedData = response.data;
          this.Handle(this.UntreatedData);
        })
        .catch((error) => {
          alert("There was an error!");
          console.error("Error!", error);
        });
    },
    Handle(data) {
      //对get到的参数处理一下，放到Questions中
      for (let i = 0, l = data.length; i < l; ++i) {
        let comp = SingleChoiceQuestions;
        if (data[i].type == "1") {
          comp = SingleChoiceQuestions;
        } else if (data[i].type == "2") {
          comp = MultipleChoiceQuestions;
        } else if (
          data[i].type == "3" ||
          data[i].type == "31" ||
          data[i].type == "32" ||
          data[i].type == "33" ||
          data[i].type == "34" ||
          data[i].type == "35" ||
          data[i].type == "36"
        ) {
          comp = Fill_in_the_blanks;
        } else if (data[i].type == "4") {
          comp = ShortAnswer;
        }
        this.Questions.push({
          id: data[i].id,
          type: data[i].type,
          title: data[i].text,
          survey_id: this.$route.query.survey_id,
          create: false,
          component: comp,
        });
      }
    },

    add_Single_Seclect() {
      const baseURL = "http://localhost:8080/api/surveys";
      const sid = this.$route.query.survey_id;
      const URL = `${baseURL}/${sid}/questions`;
      axios
        .post(
          URL,
          {
            id: "",
            text: "",
            type: "1",
            surveyId: sid,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + "123456",
            },
          }
        )
        .then((response) => {
          this.Questions.push({
            id: response.data.id, //问题的唯一标识
            type: "1", //代表是哪种类型的问题
            title: "",
            survey_id: this.$route.query.survey_id,
            create: true,
            component: SingleChoiceQuestions, //确定是哪个组件
          });
        })
        .catch((error) => {
          alert("There was an error!");
          console.error("Error!", error);
        });
    },
    add_Multiple_Seclect() {
      const baseURL = "http://localhost:8080/api/surveys";
      const sid = this.$route.query.survey_id;
      const URL = `${baseURL}/${sid}/questions`;
      axios
        .post(
          URL,
          {
            id: "",
            text: "",
            type: "2",
            surveyId: sid,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + "123456",
            },
          }
        )
        .then((response) => {
          this.Questions.push({
            id: response.data.id, //问题的唯一标识
            type: "2", //代表是哪种类型的问题
            title: "",
            survey_id: this.$route.query.survey_id,
            create: true,
            component: MultipleChoiceQuestions, //确定是哪个组件
          });
        })
        .catch((error) => {
          alert("There was an error!");
          console.error("Error!", error);
        });
    },
    add_FillBlanks() {
      const baseURL = "http://localhost:8080/api/surveys";
      const sid = this.$route.query.survey_id;
      const URL = `${baseURL}/${sid}/questions`;
      axios
        .post(
          URL,
          {
            id: "",
            text: "",
            type: "3",
            surveyId: sid,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + "123456",
            },
          }
        )
        .then((response) => {
          this.Questions.push({
            id: response.data.id, //问题的唯一标识
            type: "3", //代表是哪种类型的问题
            title: "",
            survey_id: this.$route.query.survey_id,
            create: true,
            component: Fill_in_the_blanks, //确定是哪个组件
          });
        })
        .catch((error) => {
          alert("There was an error!");
          console.error("Error!", error);
        });
    },
    add_ShortAnswer() {
      const baseURL = "http://localhost:8080/api/surveys";
      const sid = this.$route.query.survey_id;
      const URL = `${baseURL}/${sid}/questions`;
      axios
        .post(
          URL,
          {
            id: "",
            text: "",
            type: "4",
            surveyId: sid,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + "123456",
            },
          }
        )
        .then((response) => {
          this.Questions.push({
            id: response.data.id, //问题的唯一标识
            type: "4", //代表是哪种类型的问题
            title: "",
            survey_id: this.$route.query.survey_id,
            create: true,
            component: ShortAnswer, //确定是哪个组件
          });
        })
        .catch((error) => {
          alert("There was an error!");
          console.error("Error!", error);
        });
    },

    CopyQuestion(serialnum, optionsdata = []) {
      let copiedQuestion = this.Questions[serialnum - 1];

      const baseURL = "http://localhost:8080/api/surveys";
      const sid = copiedQuestion.survey_id;
      const URL = `${baseURL}/${sid}/questions`;
      axios
        .post(
          URL,
          {
            id: "",
            text: copiedQuestion.title,
            type: copiedQuestion.type,
            surveyId: copiedQuestion.survey_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + "123456",
            },
          }
        )
        .then((response) => {
          console.log(response.data.id);
          copiedQuestion.id = response.data.id;

          if (optionsdata != []) {
            const qid = Number(response.data.id);
            const URLforoptions = `${baseURL}/${sid}/questions/${qid}/options`;
            for (let i = 0, l = optionsdata.length; i < l; ++i) {
              axios
                .post(
                  URLforoptions,
                  {
                    id: 0,
                    optionText: optionsdata[i].name,
                    questionId: response.data.id,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + "123456",
                    },
                  }
                )
                .then((Response) => {
                  console.log(Response);
                })
                .catch((Error) => {
                  alert("There was an error!");
                  console.error("Error!", Error);
                });
            }
          }

          this.Questions.splice(serialnum, 0, copiedQuestion);
        })
        .catch((error) => {
          alert("There was an error!");
          console.error("Error!", error);
        });
    },
    DelQuestion(serialnum) {
      /*for (let i = serialnum; i < this.Questions.length; ++i) {
        Questions[i].id--;
      }*/
      this.Questions.splice(serialnum - 1, 1);
    },
    move_upQuestion(serialnum) {
      if (serialnum > 1) {
        [this.Questions[serialnum - 2], this.Questions[serialnum - 1]] = [
          this.Questions[serialnum - 1],
          this.Questions[serialnum - 2],
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
      const temp = this.Questions[serialnum - 1];
      this.Questions[serialnum - 1] = this.Questions[this.Questions.length - 1];
      this.Questions[this.Questions.length - 1] = temp;
      /*
      [this.Questions[serialnum - 1], this.Questions[this.Questions.length - 1]] = [
        this.Questions[this.Questions.length - 1],
        this.Questions[serialnum - 1],
      ];*/
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
