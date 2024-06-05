<template>
  <div class="defaultOption" v-if="showDefault">
    <el-radio :value="OptionName">{{ OptionName }}</el-radio>
  </div>

  <div class="editOption" v-if="showEdit">
    <el-radio :value="OptionName"
      ><el-input
        v-model="OptionName"
        style="position: relative; width: 300px"
        rows="1"
        resize="none"
        type="textarea"
        placeholder="请在此填写选项"
        @input="Edit"
    /></el-radio>
    <div class="functions">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="在此选项后面新增一个选项"
        placement="bottom-start"
      >
        <el-button @click="Add">添加</el-button>
      </el-tooltip>

      <el-tooltip
        class="box-item"
        effect="dark"
        content="删除当前选项"
        placement="bottom-start"
      >
        <el-button @click="Delete">删除</el-button>
      </el-tooltip>

      <el-tooltip
        class="box-item"
        effect="dark"
        content="在此选项与上一个选项交换"
        placement="bottom-start"
      >
        <el-button @click="move_up">上移</el-button>
      </el-tooltip>

      <el-tooltip
        class="box-item"
        effect="dark"
        content="在此选项与下一个选项交换"
        placement="bottom-start"
      >
        <el-button @click="move_down">下移</el-button>
      </el-tooltip>

      <el-tooltip
        class="box-item"
        effect="dark"
        content="在此选项移动到第一位"
        placement="bottom-start"
      >
        <el-button @click="move_front">最前</el-button>
      </el-tooltip>

      <el-tooltip
        class="box-item"
        effect="dark"
        content="在此选项移动到最后一位"
        placement="bottom-start"
      >
        <el-button @click="move_end">最后</el-button>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    Ruled_name: {
      type: String,
      required: true,
    },
    NumberofOption: {
      type: Number,
      required: true,
    },
    showDE: {
      type: Boolean,
      required: true,
    },
    showED: {
      type: Boolean,
      required: true,
    },
    surveyid: {
      type: Number,
      required: true,
    },
    questionid: {
      type: Number,
      required: true,
    },
    optionid: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showDefault: this.showDE,
      showEdit: this.showED,
      OptionName: this.Ruled_name, //*"选项" + this.NumberofOption + ""
    };
  },
  methods: {
    SaveData() {
      const baseURL = "http://localhost:8080/api/surveys";
      const sid = this.surveyid;
      const qid = this.questionid;
      const oid = this.optionid;
      console.log(sid);
      console.log(qid);
      console.log(oid);

      const URL = `${baseURL}/${sid}/questions/${qid}/options/${oid}`;
      axios
        .put(
          URL,
          {
            id: oid,
            optionText: this.OptionName,
            questionId: qid,
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
    Edit() {
      this.$emit("realtime_edit", this.OptionName, this.NumberofOption);
    },
    Add() {
      this.$emit("click-to-add", this.NumberofOption);
    },
    Delete() {
      this.$emit("click-to-del", this.NumberofOption);
    },
    move_up() {
      this.$emit("click-to-up", this.NumberofOption);
    },
    move_down() {
      this.$emit("click-to-down", this.NumberofOption);
    },
    move_front() {
      this.$emit("click-to-front", this.NumberofOption);
    },
    move_end() {
      this.$emit("click-to-end", this.NumberofOption);
    },
  },
};
</script>

<style>
.defaultOption {
  position: relative;
  top: 70px;
  left: 58px;
}
.editOption {
  position: relative;
  top: 70px;
  left: 58px;
  display: block;
}
.functions {
  position: relative;
  left: 350px;
  top: -32px;
}
</style>
