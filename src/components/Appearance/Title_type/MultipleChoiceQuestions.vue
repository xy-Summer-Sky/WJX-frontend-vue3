<template>
  <div
    class="defaultUI"
    v-show="S_de"
    :style="{ height: OptionHeightDefault }"
    @mouseover="SetShowDEbutton"
    @mouseout="ResetShowDEbutton"
  >
    <p style="position: absolute; top: 0px; left: 58px; font-size: 18px">
      {{ serial + title + "(多选题)" }}
    </p>

    <el-checkbox-group v-model="checkedList">
      <div style="position: relative; top: -20px">
        <MOptions
          v-for="(moption, index) in moptions"
          :key="moption.mid"
          :NumberofOption="index + 1"
          :showDE="true"
          :showED="false"
        ></MOptions>
      </div>
    </el-checkbox-group>

    <el-button
      type="primary"
      style="position: absolute; bottom: 20px; left: 58px"
      @click="TurnToEdit"
      title="点击可跳转到编辑模式"
      v-show="showDefaultButton"
      ><el-icon><Position /></el-icon>跳转至编辑</el-button
    >

    <div style="position: absolute; bottom: 20px; left: 380px" v-show="showDefaultButton">
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

  <div class="EditUI" v-show="S_ed" :style="{ height: OptionHeightEdit }">
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
    <el-checkbox-group v-model="checkedList">
      <div>
        <MOptions
          v-for="(moption, index) in moptions"
          :key="moption.mid"
          :NumberofOption="index + 1"
          :showDE="false"
          :showED="true"
          @click-to-add="addOptions"
          @click-to-del="deleteOptions"
          @click-to-up="move_up_Options"
          @click-to-down="move_down_Options"
          @click-to-front="move_front_Options"
          @click-to-end="move_end_Options"
        ></MOptions>
      </div>
    </el-checkbox-group>
    <el-button
      type="primary"
      style="position: absolute; bottom: 20px; left: 58px"
      @click="TurnToDefault"
      title="点击可跳转到预览模式"
      ><el-icon><Position /></el-icon>跳转至预览</el-button
    >
    <el-divider style="position: absolute; bottom: -10px" />
  </div>
</template>
<script>
import { mergeOptions } from "element-plus/es/components/table/src/util";
import MOptions from "../LittleAssembly/MOptions.vue";
export default {
  props: {
    Question_num: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      OptionHeightDefault: "180px",
      OptionHeightEdit: "230px",

      S_de: true,
      S_ed: false,
      showDefaultButton: false,

      serial: this.Question_num + ".",
      title: "标题",
      checkedList: [],
      moptions: [{ mid: 1 }, { mid: 2 }],
    };
  },
  methods: {
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

      this.moptions.push({ mid: this.moptions.length + 1 });
      this.moptions.splice(serialnum, 0, this.moptions.pop());
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

      this.moptions.splice(serialnum - 1, 1);
    },
    move_up_Options(serialnum) {
      if (serialnum > 1) {
        [this.moptions[serialnum - 2], this.moptions[serialnum - 1]] = [
          this.moptions[serialnum - 1],
          this.moptions[serialnum - 2],
        ];
      }
    },
    move_down_Options(serialnum) {
      if (serialnum < this.moptions.length) {
        [this.moptions[serialnum - 1], this.moptions[serialnum]] = [
          this.moptions[serialnum],
          this.moptions[serialnum - 1],
        ];
      }
    },
    move_front_Options(serialnum) {
      [this.moptions[serialnum - 1], this.moptions[0]] = [
        this.moptions[0],
        this.moptions[serialnum - 1],
      ];
    },
    move_end_Options(serialnum) {
      [this.moptions[serialnum - 1], this.moptions[this.moptions.length - 1]] = [
        this.moptions[this.moptions.length - 1],
        this.moptions[serialnum - 1],
      ];
    },

    Copy() {
      this.$emit("click-to-Copy", this.Question_num);
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
      this.S_de = true;
      this.S_ed = false;
    },
    TurnToEdit() {
      this.S_de = false;
      this.S_ed = true;
    },
  },
  components: {
    MOptions,
  },
};
</script>
<style scoped>
.DefaultUI {
  position: relative;
  background-color: white;
}
.EditUI {
  position: relative;
  background-color: white;
}
</style>
