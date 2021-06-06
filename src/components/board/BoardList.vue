<template>
  <div class="container">
    <h1>게시판 목록</h1>
    <div id="boardTable">
      <h4 id="totalCount" align="left">총 게시글 : {{ list.totalElements }}</h4>
      <b-table striped hover :items="list.content" :fields="fields">
        <template #cell(title)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <a href="javascript:;" @click="gotoDetail(`${data.item.id}`)">{{ data.value }}</a>
        </template>
      </b-table>
      <Pagination v-bind:data="list"></Pagination>
      <div class="right" align="right">
        <b-button variant="success" @click="this.gotoRegist">글쓰기</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Pagination from "../common/Pagination";
export default {
  components: { Pagination },
  name: "BoardList",
  data() {
    return {
      list: "",
      fields: [ 
        { key: 'id', label: '글 번호' , thClass: 'width10'},
        { key: 'title', label: '글 제목' , thClass: 'width40'},
        { key: 'writer', label: '작성자' ,thClass: 'width20'},
        { key: 'regDate', label: '작성 일자' , thClass: 'width20'}, 
        { key: 'viewcnt', label: '조회수' ,thClass: 'width10'}
        ]
    };
  },
  created() {
    this.getList(0, 10);
  },
  methods: {
    getList(page, size) {
      axios
        .get(this.makePageUrl(page, size))
        .then((res) => {
          this.list = res.data;
          console.log(this.list);
          
        })
        .catch((err) => {
          console.log(err);
        });
    },
    makePageUrl(page, size) {
      return "http://3.34.78.18:8081/board?page=" + page + "&size=" + size;
    },
    gotoDetail(id) {
      this.$router.push({ path: "./boardDetail/" + id, params: id });
    },
    gotoRegist() {
      this.$router.push({ path: "./boardRegist" });
    },
  },
};
</script>

<style>
table.b-table thead th.width10{ width: 10%; }
table.b-table thead th.width20{ width: 20%; }
table.b-table thead th.width30{ width: 30%; }
</style>