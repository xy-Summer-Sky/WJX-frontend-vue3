<template>
  <div class="head" v-if="shower">
    <img id="Location" src="/public/Picture/PersonalLogo.png" alt="图片加载失败" />
    <el-icon id="icon_style" :size="20" color="blue"><HomeFilled /></el-icon>
    <el-link href="#" id="HomeStyle" type="primary" :underline="false">我的问卷</el-link>
    <el-icon
      id="icon_style"
      :size="20"
      :color="Color1"
      title="帮助中心"
      style="left: 570px"
      @mouseover="SetColor1"
      @mouseout="ReSetColor1"
      ><QuestionFilled
    /></el-icon>
    <el-icon
      id="icon_style"
      :size="20"
      :color="Color2"
      title="意见反馈"
      style="left: 580px"
      @mouseover="SetColor2"
      @mouseout="ReSetColor2"
      ><Comment
    /></el-icon>
    <el-icon
      id="icon_style"
      :size="20"
      :color="Color3"
      title="消息"
      style="left: 590px"
      @mouseover="SetColor3"
      @mouseout="ReSetColor3"
      ><BellFilled
    /></el-icon>
    <span id="SetText">{{ "尊敬的用户：" + Name + "  欢迎使用问卷星" }}</span>
    <img id="HeadSculpture" src="/public/Picture/head.jpg" alt="图片无法显示" />
  </div>

  <div class="aside">
    <el-button
      round
      id="SetButton"
      type="primary"
      icon="CirclePlus"
      @click="dialogVisible = true"
      title="创建新问卷"
      >创建问卷</el-button
    >

    <el-dialog v-model="dialogVisible" title="输入问卷名以继续" width="500">
      <el-form :model="form">
        <el-form-item label="问卷名" :label-width="formLabelWidth">
          <el-input v-model="NameofQuestionaire" autocomplete="off" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="JumpToCreate"> 创建 </el-button>
        </div>
      </template>
    </el-dialog>

    <div class="OptionList">
      <p
        id="all_style"
        :style="{ '--primary-color': primaryColor1 }"
        @mouseover="changePrimaryColor1"
        @mouseout="resetPrimaryColor1"
      >
        <el-icon :size="20"><Document /></el-icon>
        <span id="text_style">全部文件</span>
      </p>
      <p
        id="all_style"
        :style="{ '--primary-color': primaryColor2 }"
        @mouseover="changePrimaryColor2"
        @mouseout="resetPrimaryColor2"
      >
        <el-icon :size="20"><StarFilled /></el-icon>
        <span id="text_style">重要文件</span>
      </p>
      <p
        id="all_style"
        :style="{ '--primary-color': primaryColor3 }"
        @mouseover="changePrimaryColor3"
        @mouseout="resetPrimaryColor3"
      >
        <el-icon :size="20"><DeleteFilled /></el-icon>
        <span id="text_style">回收站</span>
      </p>
      <el-button type="primary" @click="print">打印UserSurvey</el-button>
    </div>
  </div>

  <div class="main">
    <QuestionaireList
      :SurveyName="this.NameofQuestionaire"
      :userid="this.UserId"
      :username="this.UserName"
      :usertoken="this.UserToken"
      :data_array="this.UserSurveys"
    ></QuestionaireList>
    <div
      v-if="showNoQuestionaireTips"
      style="position: relative; top: -400px; left: 500px"
    >
      <p>你似乎还没有问卷哦</p>
      <p>点击左上角去创建一个吧~</p>
      <img
        src="/public/Picture/NotFound.png"
        alt="图片加载失败"
        style="position: relative; height: 100px; left: -230px; top: -100px"
      />
    </div>
  </div>
</template>
<script>
import QuestionaireList from "./QuestionaireList.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import axios from "axios";
export default {
  name: "Personal",
  setup() {
    const primaryColor1 = ref("#ffffff");
    const changePrimaryColor1 = () => {
      primaryColor1.value = "#d3d3d3";
    };
    const resetPrimaryColor1 = () => {
      primaryColor1.value = "#ffffff";
    };

    const primaryColor2 = ref("#ffffff");
    const changePrimaryColor2 = () => {
      primaryColor2.value = "#d3d3d3";
    };
    const resetPrimaryColor2 = () => {
      primaryColor2.value = "#ffffff";
    };

    const primaryColor3 = ref("#ffffff");
    const changePrimaryColor3 = () => {
      primaryColor3.value = "#d3d3d3";
    };
    const resetPrimaryColor3 = () => {
      primaryColor3.value = "#ffffff";
    };

    const route = useRoute();
    const { EnrolleeToken, EnrolleeName } = route.query;
    const Name = computed(() => (EnrolleeName === undefined ? "" : EnrolleeName));
    const Token = computed(() => (EnrolleeToken === undefined ? "" : EnrolleeToken));
    return {
      primaryColor1,
      changePrimaryColor1,
      resetPrimaryColor1,

      primaryColor2,
      changePrimaryColor2,
      resetPrimaryColor2,

      primaryColor3,
      changePrimaryColor3,
      resetPrimaryColor3,

      Name,
      Token,
    };
  },
  created() {
    this.getUserID()
      .then((userId) => {
        this.UserId = userId;
        this.getSurveys();
      })
      .catch((error) => {
        alert("出现错误，未能获取用户ID！");
        console.error("an error!", error);
      });
  },
  data() {
    return {
      S1: false,
      Color1: "gray",
      Color2: "gray",
      Color3: "gray",

      dialogVisible: false,
      shower: true,
      showNoQuestionaireTips: true,

      NameofQuestionaire: "", //点击创建问卷时的问卷名
      UserId: 0,
      UserName: this.Name,
      UserToken: this.Token,
      UserSurveys: [],
    };
  },
  components: {
    QuestionaireList,
  },
  methods: {
    JumpToCreate() {
      //创建问卷
      const URL = "http://localhost:8080/api/surveys";
      axios
        .post(
          URL,
          {
            id: 0,
            title: this.NameofQuestionaire,
            createdBy: this.UserId,
            description: "",
            createdAt: "",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + "123456",
            },
          }
        )
        .then((response) => {
          console.log(response.data);

          this.UserSurveys.push({
            id: response.data.id,
            title: this.NameofQuestionaire,
            createdBy: this.UserId,
            description: "",
          });
          this.shower = "false";
          this.$router.push({
            path: "/Create",
            query: {
              survey_id: response.data.id,
              user_id: this.UserId,
              Name: this.NameofQuestionaire,
              Description: "",
            },
          });
        })
        .catch((error) => {
          alert("There was an error!");
          console.error("Error!", error);
        });
    },
    print() {
      console.log(this.UserSurveys[5]);
    },
    ShowTips() {
      //显示没有问卷情况下的小组件
      if (this.UserSurveys.length === 0) {
        this.showNoQuestionaireTips = true;
      } else {
        this.showNoQuestionaireTips = false;
      }
    },
    async getUserID() {
      return axios
        .get(
          "http://localhost:8080/api/users/getUserId",
          {
            params: {
              email: this.UserName,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + "123456",
            },
          }
        )
        .then((response) => {
          return response.data;
        });
    },
    getSurveys() {
      const userId = this.UserId;
      const baseUrl = "http://localhost:8080/api/surveys/user";
      const url = `${baseUrl}/${userId}`;
      axios
        .get(
          url,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + "123456",
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + "123456",
            },
          }
        )
        .then((response) => {
          this.UserSurveys = response.data;
          //console.log(response.data);
          this.ShowTips();
        })
        .catch((error) => {
          alert("There was an error!");
          console.error("Error!", error);
        });
    },

    SetColor1() {
      this.Color1 = "blue";
    },
    SetColor2() {
      this.Color2 = "blue";
    },
    SetColor3() {
      this.Color3 = "blue";
    },
    ReSetColor1() {
      this.Color1 = "gray";
    },
    ReSetColor2() {
      this.Color2 = "gray";
    },
    ReSetColor3() {
      this.Color3 = "gray";
    },
  },
};
</script>
<style scoped>
.head {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  height: 70px;
  width: 100%;
}
.aside {
  width: 250px;
  text-align: center;
}
.OptionList {
  position: relative;
  top: 50px;
}
.main {
  position: absolute;
  top: 90px;
  left: 350px;
}
#Location {
  position: relative;
  left: 33px;
}
#HomeStyle {
  position: relative;
  font-size: large;
  top: -28px;
  left: 550px;
}
#icon_style {
  position: relative;
  top: -22px;
  left: 540px;
}
#SetText {
  position: relative;
  background-color: rgb(238, 238, 238);
  font-family: "KaiTi";
  left: 610px;
  top: -23px;
  border: 1px solid #ccc;
  border-radius: 30px;
  padding: 13px 20px 13px 50px;
  font-size: 22px;
}
#HeadSculpture {
  position: absolute;
  left: 940px;
  top: 23px;
  height: 40px;
  border-radius: 50%;
}
#SetButton {
  position: relative;
  top: 30px;
  height: 50px;
  width: 200px;
  font-size: 20px;
}
#text_style {
  position: relative;
  top: -5px;
}
#all_style {
  border: 1px solid #ccc;
  padding: 9px 20px;
  background-color: var(--primary-color);
}
</style>
