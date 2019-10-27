<template lang="">
  <div>
    <div v-for="(list,o) in lit" ::key="o">
      <div v-for="(lis,s) list[o]">
        <ul>
          <li>
            {{lis}}
          </li>
        </ul>
        <div>
        </div>
      </div>
</template>

<script>
  export default {
    data() {
      return {
        lit: [
          [
            [1], [2], [3], [6]
          ],
          [
            [4], [5], [6]
          ],
          [[7], [9], [10], [11], [12], [13]]
        ]
      };
    },
    methods: {
      getlist() {
        this.axios({
          method: 'post',
          url: requestUrl,
          data: {
            id: requestUrl
          }
        })
      }

    }
  };
</script>
<style lang="">
</style>