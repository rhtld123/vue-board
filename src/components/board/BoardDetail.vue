<template>
  <div id="read">
    <h1>게시판 상세</h1>
    <table border="1" align="center">
      <colgroup>
        <col width="6%" />
        <col width="10%" />
        <col width="6%" />
        <col width="10%" />
      </colgroup>
      <tr>
        <td>글제목</td>
        <td>{{ vo.title }}</td>
        <td>작성일자</td>
        <td>{{ vo.regDate.substring(0, 10) }}</td>
      </tr>
      <tr>
        <td>작성자</td>
        <td>{{ vo.writer }}</td>
        <td>조회수</td>
        <td>{{ vo.viewcnt }}</td>
      </tr>
      <tr>
        <td>내용</td>
        <td colspan="3" id="content">{{ vo.content }}</td>
      </tr>
    </table>
    <div id="right" align="right">
      <button @click="this.delete">삭제</button>
    </div>
    <br /><br />

    <table border="1" align="center">
      <colgroup>
        <col width="8%" />
        <col width="10%" />
        <col width="5%" />
      </colgroup>
      <thead>
        <td colspan="3"><h2 class="textLeft">댓글 입력</h2></td>
      </thead>
      <tr style="border-bottom-style: hidden">
        <td class="textLeft" style="border-right-style: hidden">작성자명</td>
        <td class="textLeft">
          <input v-model="replyWriter" id="replyWriter" size="90" />
        </td>
        <td rowspan="2" style="border-left-style: hidden">
          <button type="button" id="add" @click="this.registReply">등록</button>
        </td>
      </tr>
      <tr>
        <td class="textLeft" style="border-right-style: hidden">내용</td>
        <td class="textLeft" colspan="2">
          <input v-model="replyContent" id="replyContent" size="90" />
        </td>
      </tr>
    </table>
    <br /><br />
    <table border="1" align="center">
      <colgroup>
        <col width="6%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <td colspan="2">
          <h2 class="textLeft">댓글 {{ replyList.totalElements }}</h2>
        </td>
      </thead>
      <tbody v-for="(list, id) in replyList.content" :key="id">
        <tr style="border-bottom-style: hidden">
          <td class="textLeft" colspan="2">
            <b>{{ list.writer }}</b>
          </td>
        </tr>
        <tr>
          <td class="textLeft" style="border-right-style: hidden">
            {{ list.content }}
          </td>
          <td align="right"><!--수정 삭제 --></td>
        </tr>
      </tbody>
      <tr v-if="replyList.totalElements == 0">
          <td colspan="2">댓글이 없습니다.</td>
      </tr>
    </table>
    <Pagination v-bind:data="replyList"></Pagination>
  </div>
</template>

<script>
import axios from "axios";
import Pagination from "../common/Pagination";
export default {
  name: "boardDetail",
  components: { Pagination },
  data() {
    return {
      vo: "",
      replyWriter: "",
      replyContent: "",
      dto: "",
      replyList: "",
    };
  },
  created() {
    console.log(this.$route);
    this.fetch();
    this.getList(0, 10);
  },
  methods: {
    fetch() {
      axios
        .get("http://localhost:8080/board/" + this.$route.params.id)
        .then((res) => {
          this.vo = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delete() {
      axios
        .delete("http://localhost:8080/board/" + this.$route.params.id)
        .then((res) => {
          alert("게시글이 삭제되었습니다.");
          this.$router.push({ path: "../" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    registReply() {
      this.dto = {
        writer: this.replyWriter,
        content: this.replyContent,
      };
      axios
        .post("http://localhost:8080/reply/" + this.$route.params.id, this.dto)
        .then((res) => {
          alert("등록완료!");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getList(page, size) {
      axios.get(this.makePageUrl(page, size)).then((res) => {
        this.replyList = res.data;
        console.log(this.replyList);
      });
    },
    makePageUrl(page, size) {
      return (
        "http://localhost:8080/reply/" +
        this.$route.params.id +
        "?page=" +
        page +
        "&size=" +
        size
      );
    },
  },
};
</script>

<style>
#content {
  height: 300px;
}
#read {
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 270px;
  margin-right: 270px;
}
.textLeft {
  text-align: left;
}
</style>