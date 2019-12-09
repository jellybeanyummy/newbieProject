<template>
    <div id = 'SignUp'>
        <div>Sign Up</div>
        name: <input v-model="user.name" placeholder="name"> <br />
        ID: <input v-model="user.id" placeholder="ID"> <br />
        password: <input v-model="user.password" type="password" placeholder="password">
        <button v-on:click="signup" >Sign Up</button>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            user: {
                id:'', 
                password:'', 
                name:''
            }
        }
    }, 
    methods: {
        signUp: function(event) {
            this.$http.post('/api/login/signUp', {
                user: this.user
            })
        .then((response) => {
            if (response.data.result === 0) {
                alert('Error, Please try again!')
            }
            if (response.data.result === 1) {
                alert('Success!')
                this.$router.push('/login')
            }
        })
        .catch(function (error)  {
            alert('error')
        })
        }
    }
}
</script>