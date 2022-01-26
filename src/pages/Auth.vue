<template>
  <div>
    <div id="app">
      <div id="nologin" v-if="!loggedin">
        <div id="loginform">
          <fieldset>
            <h2>Please sign in!</h2>
            <form v-on:submit.prevent="handleLogin">
              <fieldset>
                <legend>LOGIN</legend>
                <input type="text" placeholder="username" v-model="loginUN" />
                <input
                  type="password"
                  placeholder="password"
                  v-model="loginPW"
                />
                <input type="submit" value="login" id="fkebtn" />
              </fieldset>
            </form>
            <h2>Or if you do not have an account, please sign up!</h2>
            <form v-on:submit.prevent="handleSignup">
              <fieldset>
                <legend>CREATE USER</legend>
                <input type="text" placeholder="username" v-model="createUN" />
                <input
                  type="password"
                  placeholder="password"
                  v-model="createPW"
                />
                <input type="submit" value="create user" id="fkebtn" />
              </fieldset>
            </form>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth",
};
</script>

<style>
</style>