<template>
    <div class = "container">
      <h1>게시판 등록</h1>
      <table border="1" align="center">
          <colgroup>
            <col width = "6%">
            <col width = "10%">
          </colgroup>
          <tr>
              <td>글제목</td>
              <td><input v-model = "title" class = "inputForm" placeholder="글 제목을 입력하세요."></td>
          </tr>
          <tr>
              <td>작성자</td>
              <td><input v-model = "writer"  class = "inputForm" placeholder="작성자를 입력하세요."/></td>
          </tr>
          <tr>
              <td>내용</td>
              <td colspan="3" id = "content"><textarea v-model = "content" class = "inputForm" placeholder="내용을 입력하세요."></textarea></td>
          </tr>
      </table>
      <div id = "right" align = "right">
        <b-button variant="warning" @click="this.gotoList">목록</b-button>
        <b-button variant="success" @click="this.submit">글쓰기</b-button>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name : "BoardRegist",
    data() {
        return {
            dto : '',
            title : '',
            writer : '',
            content : ''
        };
    },
    methods: {
        submit() {
            this.dto = {
                title : this.title,
                writer : this.writer,
                content : this.content
            };
            axios.post("http://3.34.78.18:8081/board/",this.dto).then((res)=>{
                alert("등록완료!");
                console.log(res);
                this.gotoDetail(res.data);
            }).catch((error)=>{
                console.log(error);
            });
        },
        gotoDetail(id) {
            this.$router.push({path : "../boardDetail/"+id, params : id});
        },
        gotoList() {
        this.$router.push({ path: "/"});
        }
    }
}
</script>

<style>
.inputForm {
    width : 100%;
}
</style>