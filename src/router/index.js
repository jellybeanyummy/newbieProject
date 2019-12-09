import Vue from 'vue'
import SignUp from '../components/login/SignUp'
import Login from '../components/login/Login'
import Router from 'vue-router'

Vue.use(Router)

export default new Router ({
    routes: [
    {
        path: '/login',
        name: 'Login',
        components: {
            body: Login
        },
        children: [
        {
            path: '/signUp', 
            name: 'SignUp', 
            components: {
                body: SignUp
            }
        }
        ]
    }
    ], 
    mode: 'history'
})