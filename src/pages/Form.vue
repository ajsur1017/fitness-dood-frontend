<template>
  <form v-on:submit.prevent="handleSubmit">
    <input type="text" placeholder="date" v-model="date" />
    <input type="text" placeholder="actvity" v-model="actvity" />
    <input type="text" placeholder="breakfast" v-model="foodB" />
    <input type="text" placeholder="lunch" v-model="foodL" />
    <input type="text" placeholder="dinner" v-model="foodD" />
    <input type="text" placeholder="snack" v-model="foodS" />
    <input type="integer" placeholder="water" v-model="water" /><br>
    

    <input type="submit" :value="buttonLabel" />
  </form>
</template>

<script>
  // get router hooks
  import { useRoute, useRouter } from "vue-router";
  // get vue hooks
  import { ref, toRefs } from "vue";

  export default {
    name: "Form",
    props: ["posts", "url", "getPosts"],
    setup(props) {
      const route = useRoute(); //get route
      const router = useRouter(); //get router
      const { posts, url, getPosts } = toRefs(props); // get posts from props
      const subject = ref(""); // variable for subject in form
      const details = ref(""); // variable for details in form
      console.log(url);
      let buttonLabel; // label for submit button
      let handleSubmit; //variable to hold submit function
      // If edit route setup for editing, if not setup for creating
      if (route.name === "edit") {
        //get post to be edited from posts
        const post = posts.value.find((p) => p.id == route.params.id);
        // fill the form with that posts values
        subject.value = post.subject;
        details.value = post.details;
        // label for submit button
        buttonLabel = "edit todo";
        // define function to update
        handleSubmit = async () => {
          await fetch(url.value + route.params.id + "/", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              subject: subject.value,
              details: details.value,
            }),
          });

          getPosts.value();
          router.push("/");
        };
      } else {
        // label for submit button
        buttonLabel = "create todo";
        // define function to create
        handleSubmit = async () => {
          await fetch(url.value, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              subject: subject.value,
              details: details.value,
            }),
          });

          getPosts.value();
          router.push("/");
        };
      }
      return {
        subject,
        details,
        handleSubmit,
        buttonLabel,
      };
    },
  };
</script>

<style></style>