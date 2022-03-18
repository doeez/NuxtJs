<template>
  <div>
    <h2 class="subtitle">
      Register Page
    </h2>
    <div>
      회의체명
      <input
        type="text"
        placeholder="500자 이내로 입력해 주세요."
        title="회의체명 입력"
        ref="councilNm"
        max-length="500"
        v-model="council.councilNm"
      />
    </div>
    <div>
      분류
      <select
        title="분류조건선택"
        v-model="council.councilTy"
        ref="councilTy"
      >
        <option
          v-for="item in councilTypeList"
          :key="'type'+item.codeId"
          :value="item.codeId"
        >
        {{ item.codeNm }}
        </option>
      </select>
    </div>
    <div>
      운영 목적
      <textarea
        placeholder="운영 목적을 1000자 이내로 적어주세요."
        title="운영 목적 입력"
        ref="cntnts"
        v-model="council.cntnts"
      ></textarea>
    </div>
    <button type="button" @click="save">저장</button>
  </div>
</template>

<script>
export default {
  name: 'SampleRegisterPage',
  props: [],
  data () {
    return {
      council: {
        councilNm: 'test name',
        councilTy: 'CMITE',
        cntnts: 'test'
      },
      councilTypeList: [
        {
          codeId: 'CMITE',
          codeNm: '위원회'
        },
        {
          codeId: 'CNFRNCE',
          codeNm: '자문회의'
        },
        {
          codeId: 'COUNCIL',
          codeNm: '협의체'
        }
      ]
    }
  },
  beforeMount () {},
  mounted () {
  },
  methods: {
    save() {
      let params = {
        ...this.council
      }
      this.$axios.post('/api/sample/register', params).then((res) => {
          if (res.status === 200) {
            alert('성공적으로 등록되었습니다.')
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
    },
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

