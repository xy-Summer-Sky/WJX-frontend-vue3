<template>
    <div v-if='show'>
        <div class="image-container">
            <div id="BackG"></div>
            <div>
                <img src="/public/Picture/Logo.png" class="LogoRule" alt="Logo图标加载失败"/>
            </div>
        </div>

        <div class="LoginBox">
            <h2 id="locate">账号登录</h2>
            <div class="input">
                <p>帐号：</p>
                <el-input
                        v-model="id"
                        placeholder="用户名/Email/手机"
                        style="height: 40px; width: 390px"
                ></el-input>
                <p>密码：</p>
                <el-input
                        v-model="password"
                        placeholder="请输入密码"
                        style="height: 40px; width: 390px"
                        show-password
                ></el-input>
                <p></p>
                <input type="checkbox" id="remember" v-model="ischecked"/>下次自动登录

                <div class="link1">
                    <el-link href="https://baidu.com" target="_blank">忘记用户名/密码？</el-link>
                </div>
                <el-button
                        type="primary"
                        @click.native="ToPersonal()"
                        style="height: 50px; width: 390px; font-size: large"
                >登录
                </el-button
                >

                <div class="RegisterNow">
                    <router-link to="/Register"> 立即注册</router-link>
                </div>
                <div class="MoreWaytoLogin">
                    <p style="color: gray">
                        ---------------------更多登录方式----------------------
                    </p>
                    <div class="three-extra-way">
            <span>
              <img src="/public/Picture/QQ1.png" style="height: 50px" alt="" href="#"/>
              <p><el-link href="#" type="primary">QQ登录</el-link></p>
            </span>
                        <span id="WX">
              <img src="/public/Picture/WX1.png" style="height: 50px" alt=""/>
              <p><el-link href="#" type="primary">微信登录</el-link></p>
            </span>
                        <span id="QWX">
              <img src="/public/Picture/QWX1.png" style="height: 50px" alt=""/>
              <p><el-link href="#" type="primary">企业微信</el-link></p>
            </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <router-view></router-view>
</template>
<script>
export default {
    data() {
        return {
            id: "",
            password: "",
            ischecked: false,
            show:true
        };
    },
    methods: {
        AutoLogin() {
            if (this.ischecked) {
                //设置为下次自动登录
            }
        },
        ToPersonal() {
            this.show=false;
            window.localStorage.setItem('show', JSON.stringify(this.show));

            this.$nextTick().then(() => {
                this.$router.replace("/Personal").then(() => {
                    console.log('Navigation to Personal page is successful');
                }).catch(error => {
                    console.error('There was an error during navigation', error);
                });
            });

        },
    },
    mounted() {

        // window.localStorage.clear();


            if(window.localStorage.getItem('show')) {


                this.show = JSON.parse(window.localStorage.getItem('show'));
                if (!this.show) {
                    this.$router.replace("/Personal");
                }
                console.log(this.show);
            } else {
                this.show = true;
            }
            console.log(this.show);


    },

   beforeRouteEnter(to, from, next) {
       next(vm => {
           vm.show = false;
           window.localStorage.setItem('show', JSON.stringify(vm.show));
       });
   },




};
</script>
<style scoped>
.Login {
	color: red;
	font-size: large;
	}

.LoginBox {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -40%);
	height: 580px;
	width: 480px;
	background-color: white;
	border: 2px solid white;
	border-radius: 10px;
	}

/* 全局样式：设置背景 */
#BackG {
	background: url("/public/Picture/BG1.jpg");
	background-repeat: no-repeat;
	background-size: 100% 100%;
	position: fixed;
	height: 100%;
	width: 100%;
	}

.LogoRule {
	position: absolute;
	margin-left: 70px;
	margin-top: 25px;
	height: 100px;
	width: auto;
	}

.image_container {
	position: relative;
	display: inline_block;
	}

#locate {
	position: relative;
	top: 10px;
	left: 40px;
	}

.input {
	position: relative;
	left: 40px;
	top: 20px;
	}

.link1 {
	position: relative;
	left: 280px;
	top: -20px;
	}

.MoreWaytoLogin {
	position: relative;
	top: 50px;
	}

.RegisterNow {
	position: relative;
	top: 50px;
	left: 165px;
	}

.three-extra-way {
	position: relative;
	left: 50px;
	color: gray;
	font-size: 13px;
	}

#WX {
	position: relative;
	top: -99px;
	left: 118px;
	}

#QWX {
	position: relative;
	top: -197px;
	left: 240px;
	}
</style>
