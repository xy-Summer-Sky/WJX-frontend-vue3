<template>
  <div>
    <div
      class="defaultUI"
      :style="{ height: OptionHeightDefault }"
      v-if="showDefault"
      @mouseover="SetShowDEbutton"
      @mouseout="ResetShowDEbutton"
    >
      <p style="position: absolute; top: 0px; left: 58px; font-size: 18px">
        {{ serial + title }}
      </p>
      <el-radio-group v-model="selectedValue" style="position: relative; top: -20px">
        <div>
          <Options
            v-for="(option, index) in options"
            :key="option.sid"
            :Ruled_name="option.name"
            :NumberofOption="index + 1"
            :showDE="true"
            :showED="false"
            :surveyid="this.ID_survey"
            :questionid="this.ID"
            :optionid="option.sid"
            @click-to-add="addOptions"
            @click-to-del="deleteOptions"
            @click-to-up="move_up_Options"
            @click-to-down="move_down_Options"
            @click-to-front="move_front_Options"
            @click-to-end="move_end_Options"
          ></Options>
        </div>
      </el-radio-group>
      <el-button
        type="primary"
        style="position: absolute; bottom: 20px"
        @click="TurnToEdit"
        title="点击可跳转到编辑模式"
        v-show="showDefaultButton"
        ><el-icon><Position /></el-icon>跳转至编辑</el-button
      >
      <div
        style="position: absolute; bottom: 20px; left: 380px"
        v-show="showDefaultButton"
      >
        <el-tooltip
          class="box-item"
          effect="dark"
          content="在此问题后面新增一个相同问题"
          placement="bottom-start"
        >
          <el-button @click="Copy">
            <el-icon><CopyDocument /></el-icon>复制
          </el-button>
        </el-tooltip>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="删除这个问题"
          placement="bottom-start"
        >
          <el-button @click="Delete">
            <el-icon><Delete /></el-icon>删除
          </el-button>
        </el-tooltip>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="将这个问题上移一位"
          placement="bottom-start"
        >
          <el-button @click="move_up">
            <el-icon><Top /></el-icon>上移
          </el-button>
        </el-tooltip>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="将这个问题下移一位"
          placement="bottom-start"
        >
          <el-button @click="move_down">
            <el-icon><Bottom /></el-icon>下移
          </el-button>
        </el-tooltip>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="将此问题移到最前面"
          placement="bottom-start"
        >
          <el-button @click="move_front">
            <el-icon><Upload /></el-icon>最前
          </el-button>
        </el-tooltip>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="将此问题移到最后面"
          placement="bottom-start"
        >
          <el-button @click="move_end">
            <el-icon><Download /></el-icon>最后
          </el-button>
        </el-tooltip>
      </div>
      <el-divider style="position: absolute; bottom: -15px" />
    </div>
    <div class="editUI" :style="{ height: OptionHeightEdit }" v-show="showEdit">
      <span style="position: absolute; font-size: 18px; top: 30px; right: 830px">{{
        serial + ""
      }}</span>
      <el-input
        v-model="title"
        placeholder="标题"
        style="position: absolute; top: 20px; left: 80px; width: 600px"
        type="textarea"
        rows="1"
        resize="none"
        :input-style="{ 'font-size': '18px' }"
      ></el-input>
      <el-radio-group v-model="selectedValue">
        <div>
          <Options
            v-for="(option, index) in options"
            :key="option.sid"
            :Ruled_name="option.name"
            :NumberofOption="index + 1"
            :showDE="false"
            :showED="true"
            :surveyid="this.ID_survey"
            :questionid="this.ID"
            :optionid="option.sid"
            @click-to-add="addOptions"
            @click-to-del="deleteOptions"
            @click-to-up="move_up_Options"
            @click-to-down="move_down_Options"
            @click-to-front="move_front_Options"
            @click-to-end="move_end_Options"
            @realtime_edit="EditName"
            ref="option"
          ></Options>
        </div>
      </el-radio-group>
      <el-button
        type="primary"
        style="position: absolute; bottom: 20px; left: 58px"
        @click="TurnToDefault"
        title="点击可跳转到预览模式"
        ><el-icon><Position /></el-icon>跳转至预览</el-button
      >
      <el-divider style="position: absolute; bottom: -10px" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Options from "../LittleAssembly/Options.vue";
export default {
  props: {
    Question_num: {
      type: Number,
      required: true,
    },
    Question_title: {
      type: String,
      required: true,
    },
    ID: {
      type: Number,
      required: true,
    },
    ID_survey: {
      type: Number,
      required: true,
    },
    If_Create: {
      type: Boolean,
      required: true,
    },
  },
  beforeMount() {
    if (this.If_Create) {
      this.InitOptionsForCreate();
      this.InitOptionsForCreate();
    } else {
      this.InitOptions();
    }
  },
  data() {
    return {
      title: this.Question_title == "" ? "标题" : this.Question_title, //*
      serial: this.Question_num + ".", //*问题序号
      selectedValue: "", //本道题目选择的值
      options: [], //*选项列表

      OptionHeightDefault: "180px",
      OptionHeightEdit: "230px",
      showDefault: true,
      showEdit: false,
      showDefaultButton: false,
    };
  },
  methods: {
    InitOptionsForCreate() {
      const baseURL = "http://localhost:8080/api/options";
      const qid = this.ID;
      const URL = `${baseURL}/${qid}`;

      axios
        .post(
          URL,
          {
            id: 0,
            optionText: "选项" + (this.options.length + 1) + "",
            questionId: qid,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + "123456",
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.options.push({
            sid: response.data.id,
            name: "选项" + (this.options.length + 1) + "",
          });
        })
        .catch((error) => {
          alert("There was an error!");
          console.error("Error!", error);
        });
    },
    ReturnParams() {
      //this.title  this.options
      this.$refs.option.forEach((child) => {
        child.SaveData();
      });
      const baseURL = "http://localhost:8080/api/surveys";
      const surveyID = this.ID_survey;
      const questionID = this.ID;
      const URL = `${baseURL}/${surveyID}/questions/${questionID}`;
      axios
        .put(
          URL,
          {
            id: questionID,
            text: this.title,
            type: "1",
            surveyId: surveyID,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + "123456",
            },
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    InitOptions() {
      const id = this.ID;
      const sid = this.ID_survey;
      const baseURL = "http://localhost:8080/api/surveys";
      const URL = `${baseURL}/${sid}/questions/${id}/options`;
      axios
        .get(URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + "123456",
          },
        })
        .then((response) => {
          this.AnalysisDataFromBack(response.data);
        })
        .catch((error) => {
          alert("There was an error!");
          console.error("Error!", error);
        });
    },
    AnalysisDataFromBack(data) {
      if (data.length != 0) {
        this.options = [];
        for (let i = 0, l = data.length; i < l; ++i) {
          this.options.push({
            sid: data[i].id,
            name: data[i].optionText,
          });
        }
        if (data.length > 2) {
          for (let i = 0, l = data.length - 2; i < l; ++i) {
            let index1 = this.OptionHeightDefault.indexOf("p");
            let str1 = this.OptionHeightDefault.slice(0, index1);
            let num1 = Number(str1);
            num1 += 35;
            str1 = String(num1);
            this.OptionHeightDefault = str1 + "px";

            let index2 = this.OptionHeightEdit.indexOf("p");
            let str2 = this.OptionHeightEdit.slice(0, index2);
            let num2 = Number(str2);
            num2 += 65;
            str2 = String(num2);
            this.OptionHeightEdit = str2 + "px";
          }
        }
      }
    },
    EditName(OptionName, num) {
      this.options[num - 1].name = OptionName;
    },
    addOptions(serialnum) {
      let index1 = this.OptionHeightDefault.indexOf("p");
      let str1 = this.OptionHeightDefault.slice(0, index1);
      let num1 = Number(str1);
      num1 += 35;
      str1 = String(num1);
      this.OptionHeightDefault = str1 + "px";

      let index2 = this.OptionHeightEdit.indexOf("p");
      let str2 = this.OptionHeightEdit.slice(0, index2);
      let num2 = Number(str2);
      num2 += 65;
      str2 = String(num2);
      this.OptionHeightEdit = str2 + "px";

      const baseURL = "http://localhost:8080/api/options";
      const qid = this.ID;
      const URL = `${baseURL}/${qid}`;
      axios
        .post(
          URL,
          {
            id: 0,
            optionText: "选项" + (this.options.length + 1) + "",
            questionId: qid,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + "123456",
            },
          }
        )
        .then((response) => {
          this.options.push({
            sid: response.data.id,
            name: "选项" + (this.options.length + 1) + "",
          });
          this.options.splice(serialnum, 0, this.options.pop());
        })
        .catch((error) => {
          alert("There was an error!");
          console.error("Error!", error);
        });
    },
    deleteOptions(serialnum) {
      let index1 = this.OptionHeightDefault.indexOf("p");
      let str1 = this.OptionHeightDefault.slice(0, index1);
      let num1 = Number(str1);
      num1 -= 35;
      str1 = String(num1);
      this.OptionHeightDefault = str1 + "px";

      let index2 = this.OptionHeightEdit.indexOf("p");
      let str2 = this.OptionHeightEdit.slice(0, index2);
      let num2 = Number(str2);
      num2 -= 65;
      str2 = String(num2);
      this.OptionHeightEdit = str2 + "px";

      const baseURL = "http://localhost:8080/api/options";
      const opid = this.options[serialnum - 1].sid;
      const URL = `${baseURL}/${opid}`;
      axios
        .delete(
          URL,
          { id: opid },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + "123456",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          alert("There was an error!");
          console.error("Error!", error);
        });

      this.options.splice(serialnum - 1, 1);
    },
    move_up_Options(serialnum) {
      if (serialnum > 1) {
        [this.options[serialnum - 2], this.options[serialnum - 1]] = [
          this.options[serialnum - 1],
          this.options[serialnum - 2],
        ];
        this.options[serialnum - 1].sid--;
        this.options[serialnum - 2].sid++;
      }
    },
    move_down_Options(serialnum) {
      if (serialnum < this.options.length) {
        [this.options[serialnum - 1], this.options[serialnum]] = [
          this.options[serialnum],
          this.options[serialnum - 1],
        ];
        this.options[serialnum - 1].sid++;
        this.options[serialnum].sid--;
      }
    },
    move_front_Options(serialnum) {
      this.options[0].sid = this.options[serialnum - 1].sid;
      this.options[serialnum - 1].sid = 1;
      [this.options[serialnum - 1], this.options[0]] = [
        this.options[0],
        this.options[serialnum - 1],
      ];
    },
    move_end_Options(serialnum) {
      const temp = this.options[serialnum - 1].sid;
      this.options[serialnum - 1].sid = this.options[this.options.length - 1].sid;
      this.options[this.options.length - 1].sid = temp;
      [this.options[serialnum - 1], this.options[this.options.length - 1]] = [
        this.options[this.options.length - 1],
        this.options[serialnum - 1],
      ];
    },

    Copy() {
      this.$emit("click-to-Copy", this.Question_num, this.options);
    },
    Delete() {
      this.$emit("click-to-Del", this.Question_num);
    },
    move_up() {
      this.$emit("click-to-Up", this.Question_num);
    },
    move_down() {
      this.$emit("click-to-Down", this.Question_num);
    },
    move_front() {
      this.$emit("click-to-Front", this.Question_num);
    },
    move_end() {
      this.$emit("click-to-End", this.Question_num);
    },

    SetShowDEbutton() {
      this.showDefaultButton = true;
    },
    ResetShowDEbutton() {
      this.showDefaultButton = false;
    },

    TurnToDefault() {
      this.showDefault = true;
      this.showEdit = false;
    },
    TurnToEdit() {
      this.showDefault = false;
      this.showEdit = true;
    },
  },
  components: {
    Options,
  },
};
</script>
<style>
.defaultUI {
  position: relative;
  background-color: white;
}
.editUI {
  position: relative;
  background-color: white;
}
</style>
