<template>
  <v-container>
    <section>
      <h3>
        <v-icon>mdi-github</v-icon>
        <a
          href="https://github.com/book000/youtube-music-viewer"
          target="_blank"
        >book000/youtube-music-viewer</a>
      </h3>
      <p>
        このアプリは <a href="https://github.com/yay4ya">yay4ya</a> さんが制作した <a href="https://github.com/yay4ya/akikunouta">アキくんのおうた</a> を拡張し、複数人の歌唱者に対応させたものです。<br />
        素晴らしい作品を制作し、それをオープンソースとしてアップしてくれた <a href="https://github.com/yay4ya">yay4ya</a>さん へ心からの感謝を。
      </p>
    </section>

    <section>
      <h3>製作者</h3>
      <p>
        <b>ややや</b> :
        <a
          href="https://twitter.com/_yay4ya"
          target="_blank"
        >
          <v-icon
            size="1.2em"
          >
            mdi-twitter
          </v-icon>
          @_yay4ya
        </a>

        <a
          href="https://github.com/yay4ya"
          target="_blank"
        >
          <v-icon
            size="1.2em"
          >
            mdi-github
          </v-icon>
          yay4ya
        </a>
      </p>
      <h3>機能拡張者</h3>
      <p>
        <b>Tomachi</b> :
        <a
          href="https://twitter.com/book000"
          target="_blank"
        >
          <v-icon
            size="1.2em"
          >
            mdi-twitter
          </v-icon>
          @book000
        </a>

        <a
          href="https://github.com/book000"
          target="_blank"
        >
          <v-icon
            size="1.2em"
          >
            mdi-github
          </v-icon>
          book000
        </a>
      </p>
    </section>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: 'About',
  });
</script>

<style lang="scss" scoped>
  h3 {
    padding-bottom: 10px;
  }
  section {
    &:not(:first-child) {
      margin-top: 40px;
    }
  }
</style>
