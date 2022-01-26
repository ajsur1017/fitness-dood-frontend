<template>
  <div class="post">
    <h1>{{ post.subject }}</h1>
    <h2>{{ post.details }}</h2>
    <router-link to="/"><button>Back to Main</button></router-link>
    <router-link to="{ name: 'edit', params: { id: post.id } }"
      ><button>Edit Todo</button></router-link
    >
    <button v-on:click="deletePost">Delete Todo</button>
  </div>
</template>

<script>
  // get useRoute hook to get access to params
  import { useRoute, useRouter } from "vue-router";
  // getting toRefs hook to maintain props reactivity
  import { toRefs } from "vue";

  export default {
    name: "SinglePost",
    props: ["posts", "url", "getPosts"],
    setup(props) {
      // get route object to access params
      const route = useRoute();
      // get Router
      const router = useRouter();
      // retrieve posts from props
      const { posts, url, getPosts } = toRefs(props);
      // grab target post from posts
      const post = posts.value[route.params.id];

      const deletePost = async () => {
        await fetch(url.value + post.id + "/", {
          method: "delete",
        });

        await getPosts.value();

        router.push("/");
      };

      //return properties
      return {
        post,
        deletePost,
      };
    },
  };
</script>

<style>
  button {
    margin: 10px;
  }
</style>