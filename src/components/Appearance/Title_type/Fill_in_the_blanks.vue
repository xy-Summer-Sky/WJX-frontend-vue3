<template>
  <div
    class="defaultUI"
    v-show="S_De"
    @mouseover="SetShowDEbutton"
    @mouseout="ResetShowDEbutton"
  >
    <p style="position: absolute; top: 0px; left: 58px; font-size: 18px">
      {{ serial + title }}
    </p>
    <!--这部分内容提供三种输入模式-->
    <el-input
      v-model="AnswerForUsers"
      v-if="showNormalInput"
      style="position: relative; top: 70px; left: 58px; width: 400px"
      :placeholder="VariablePlaceholder"
      :prefix-icon="VariableIcon"
      @input="REmatch"
    />

    <el-date-picker
      v-model="AnswerForUsers"
      v-if="showDateInput"
      style="position: relative; top: 70px; left: 58px; width: 400px"
      type="date"
      placeholder="日期"
      size="default"
    />

    <el-time-picker
      v-model="AnswerForUsers"
      v-if="showTimeInput"
      style="position: relative; top: 70px; left: 58px; width: 400px"
      placeholder="时间"
    />
    <!--到此结束-->
    <!--以下内容是正则表达式匹配报错-->
    <div class="errortips">
      <el-alert
        title="请输入正确的整数，如123456"
        style="width: 400px"
        type="error"
        show-icon
        v-show="Interror"
      />
      <el-alert
        title="请输入正确的小数，如123.456"
        style="width: 400px"
        type="error"
        show-icon
        v-show="Floaterror"
      />
      <el-alert
        title="请输入正确的邮箱格式，如qwe@mail.com"
        style="width: 400px"
        type="error"
        show-icon
        v-show="Emailerror"
      />
      <el-alert
        title="请输入正确的手机号码，如13812341234"
        style="width: 400px"
        type="error"
        show-icon
        v-show="Phoneerror"
      />
    </div>
    <!--到这里结束-->
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
  <div class="editUI" v-show="S_Ed">
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
    <!--以下提供三种输入模式-->
    <el-input
      v-model="AnswerForUsers"
      v-if="showNormalInput"
      style="position: relative; top: 70px; left: 58px; width: 400px"
      :placeholder="VariablePlaceholder"
      :prefix-icon="VariableIcon"
      disabled
    />

    <el-date-picker
      v-model="AnswerForUsers"
      v-if="showDateInput"
      style="position: relative; top: 70px; left: 58px; width: 400px"
      type="date"
      placeholder="日期"
      size="default"
      disabled
    />

    <el-time-picker
      v-model="AnswerForUsers"
      v-if="showTimeInput"
      style="position: relative; top: 70px; left: 58px; width: 400px"
      placeholder="时间"
      disabled
    />
    <!--到这里结束-->
    <el-button
      type="primary"
      style="position: absolute; bottom: 20px; left: 58px"
      @click="TurnToDefault"
      title="点击可跳转到预览模式"
      ><el-icon><Position /></el-icon>跳转至预览</el-button
    >

    <el-select
      v-model="CharacterValue"
      placeholder="属性限制"
      style="position: relative; width: 100px; top: 120px; left: -345px"
      clearable
      ><!--; left: -345px; -->
      <el-option
        v-for="item in CharacterOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        @click="SetPlaceholder"
      />
    </el-select>
    <el-divider style="position: absolute; bottom: -10px" />
  </div>
</template>
<script>
export default {
  update() {
    this.REmatch();
  },
  props: {
    Question_num: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      S_De: true,
      S_Ed: false,

      Interror: false,
      Floaterror: false,
      Emailerror: false,
      Phoneerror: false,

      showNormalInput: true,
      showDateInput: false,
      showTimeInput: false,

      serial: this.Question_num + ".",
      title: "标题",
      VariablePlaceholder: "",
      VariableIcon: "",
      AnswerForUsers: "",
      CharacterValue: "",
      CharacterOptions: [
        {
          value: "",
          label: "属性限制",
        },
        {
          value: "int",
          label: "整数",
        },
        {
          value: "float",
          label: "小数",
        },
        {
          value: "email",
          label: "邮箱",
        },
        {
          value: "phone",
          label: "电话",
        },
        {
          value: "date",
          label: "日期",
        },
        {
          value: "time",
          label: "时间",
        },
      ],
      showDefaultButton: false,
    };
  },
  methods: {
    SetPlaceholder() {
      if (this.CharacterValue == "") {
        this.showNormalInput = true;
        this.showDateInput = false;
        this.showTimeInput = false;
        this.VariablePlaceholder = "";
        this.VariableIcon = "";
        this.REmatch();
      } else if (this.CharacterValue == "int") {
        this.showNormalInput = true;
        this.showDateInput = false;
        this.showTimeInput = false;
        this.VariablePlaceholder = "整数";
        this.VariableIcon = "";
        this.REmatch();
      } else if (this.CharacterValue == "float") {
        this.showNormalInput = true;
        this.showDateInput = false;
        this.showTimeInput = false;
        this.VariablePlaceholder = "小数";
        this.VariableIcon = "";
        this.REmatch();
      } else if (this.CharacterValue == "email") {
        this.showNormalInput = true;
        this.showDateInput = false;
        this.showTimeInput = false;
        this.VariablePlaceholder = "邮箱";
        this.VariableIcon = "Message";
        this.REmatch();
      } else if (this.CharacterValue == "phone") {
        this.showNormalInput = true;
        this.showDateInput = false;
        this.showTimeInput = false;
        this.VariablePlaceholder = "电话";
        this.VariableIcon = "Iphone";
        this.REmatch();
      } else if (this.CharacterValue == "date") {
        this.showNormalInput = false;
        this.showDateInput = true;
        this.showTimeInput = false;
        this.REmatch();
      } else if (this.CharacterValue == "time") {
        this.showNormalInput = false;
        this.showDateInput = false;
        this.showTimeInput = true;
        this.REmatch();
      }
    },
    REmatch() {
      if (
        this.CharacterValue == "" ||
        this.CharacterValue == "date" ||
        this.CharacterValue == "time"
      ) {
        this.Interror = false;
        this.Floaterror = false;
        this.Emailerror = false;
        this.Phoneerror = false;
      } else if (this.CharacterValue == "int") {
        const integerRegex = /^-?\d+$/;
        this.Floaterror = false;
        this.Emailerror = false;
        this.Phoneerror = false;
        if (!integerRegex.test(this.AnswerForUsers)) {
          this.Interror = true;
        } else {
          this.Interror = false;
        }
      } else if (this.CharacterValue == "float") {
        const decimalRegex = /^-?\d+(\.\d+)?$/;
        this.Interror = false;
        this.Emailerror = false;
        this.Phoneerror = false;
        if (!decimalRegex.test(this.AnswerForUsers)) {
          this.Floaterror = true;
        } else {
          this.Floaterror = false;
        }
      } else if (this.CharacterValue == "email") {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        this.Interror = false;
        this.Floaterror = false;
        this.Phoneerror = false;
        if (!emailRegex.test(this.AnswerForUsers)) {
          this.Emailerror = true;
        } else {
          this.Emailerror = false;
        }
      } else if (this.CharacterValue == "phone") {
        const mobileRegex = /^1[3-9]\d{9}$/;
        this.Interror = false;
        this.Floaterror = false;
        this.Emailerror = false;
        if (!mobileRegex.test(this.AnswerForUsers)) {
          this.Phoneerror = true;
        } else {
          this.Phoneerror = false;
        }
      }
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
      this.S_De = true;
      this.S_Ed = false;
    },
    TurnToEdit() {
      this.S_De = false;
      this.S_Ed = true;
    },
  },
};
</script>
<style>
.defaultUI {
  position: relative;
  background-color: white;
  height: 230px;
}
.editUI {
  position: relative;
  background-color: white;
  height: 230px;
}
.errortips {
  position: relative;
  top: 80px;
  left: 58px;
}
</style>
