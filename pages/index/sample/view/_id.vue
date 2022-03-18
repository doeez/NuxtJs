<template>
  <div>
    <h2 class="subtitle">
      View Page
    </h2>
    <div>
      Info : {{ council }}
    </div>
    <button type="button" @click="deleteThis">삭제</button>
  </div>
</template>

<script>
export default {
  name: 'SampleViewIdPage',
  props: [],
  data () {
    return {
      sequence: this.$route.params.id,
      row: [],
      council: {}
    }
  },
  beforeMount () {},
  mounted () {
    this.getList()
  },
  methods: {
    getList() {
      this.$axios.get(`/api/sample/getTestList/${this.sequence}`).then((res) => {
          if (res.status === 200) {
            console.log(res)
            //console.log(res.data)
            this.row = res.data
            this.council = res.data[0]
          } else {
            alert(res)
            this.$router.go(-1)
          }
        })
        .catch((error) => {
          console.log(error)
          console.log(error.response)
        })
    },
    deleteThis() {
      this.$axios.get(`/api/sample/delete/${this.sequence}`).then((res) => {
        if (res.status === 200) {
            alert('정상적으로 삭제되었습니다.')
            this.$router.push('/')
          } else {
            alert(res)
            this.$router.go(-1)
          }
        })
        .catch((error) => {
          console.log(error)
          console.log(error.response)
        })
    }
  },
  watch: {},
  computed: {}
}
</script>

<style>
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
  
}
</style>

