import { createRouter, createWebHashHistory}  from "vue-router";
import LoginAppearance from './components/Appearance/LoginAppearance.vue';
import RegisterAppearance from './components/Appearance/RegisterAppearance.vue';
import PersonalAppearance from "./components/Appearance/PersonalAppearance.vue";
import CreateAppearance from "./components/Appearance/CreateAppearance.vue";

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            component:LoginAppearance,
            
        },
        {
            path:"/Register",
            component:RegisterAppearance,
        },
        {
            path:'/Personal',
            name:"Personal",
            component:PersonalAppearance,
            
        },
        {
            path:"/Create",
            component:CreateAppearance,
        }
    ]
});

export default router;