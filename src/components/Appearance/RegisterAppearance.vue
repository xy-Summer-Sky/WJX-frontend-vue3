<template>
    <div class = "image-container">
        <div id = "BackG"></div>
        <div>
            <img src = "/public/Picture/Logo.png" class = "LogoRule" alt = "Logo图标加载失败">
        </div>      
    </div>
    <div class = "RegisterBox">
        <h2 id = "Register">注册新账号</h2>
        <div class = "input">
            <el-input v-model="id" placeholder="用户名/Email/手机" style= "height:40px; width: 390px"></el-input>
            <p></p>
            <el-input v-model="password" placeholder="请输入密码" style= "height:40px; width: 390px" show-password></el-input>
            <p></p>
            <input type = "checkbox" v-model = "ischecked">勾选后同意《问卷星服务协议》和《隐私条款》
        </div>
        <div class = "Create">
            <el-button type = "primary" style = "height:50px; width: 390px; font-size:large" @click = "isChecked">创建用户</el-button>
            <p></p>
            <span class = "ToLogin">已有账号？
                <router-link to="/Login">立即登录</router-link>
                
            </span>
            
        </div>
        
    </div>
    <router-view></router-view>

</template>
<script>
export default{
    data(){
       return{
            id:'',
            password:'',
            ischecked:false,
       };
    },
    methods:{
        isChecked(){
            if(this.ischecked){
                alert("请记住您的账号密码，现在前往您的个人主页");
            }
            else{
                alert("请勾选同意《问卷星服务协议》和《隐私条款》");
            }   

        },
    },
}
</script>
<style scoped>

/* 全局样式：设置背景 */
#BackG{
    background: url("/public/Picture/BG1.jpg");
	background-repeat: no-repeat;
	background-size: 100% 100%;   
	position: fixed;
	height: 100%;
	width: 100%; 
}
.LogoRule{
    position:absolute;
    margin-left: 70px;
    margin-top: 25px;
    height: 100px;
    width:auto;
}
.image_container{
    position:relative;
    display:inline_block;
}
.RegisterBox{
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -40%);
    height:540px;
    width:480px;
    background-color: white;
    border: 2px solid white;
    border-radius: 10px;
}
#Register{
    position:relative;
    left:40px;
    top:10px;
}  
.input{
    position:relative;
    top:10px;
    left: 40px;
}
.Create{
    position:relative;
    top:180px;
    left:40px;
}
.ToLogin{
    position:relative;
    font-size: medium;
    color: gray;
    left:25%;
}
#Link{
    position:relative;
    font-size: medium;
    top:-2px;
}
</style>
