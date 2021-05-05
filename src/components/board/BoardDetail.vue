<template>
  <div id = "read">
      <h1>게시판 상세</h1>
      <table border="1" align="center">
          <colgroup>
            <col width = "6%">
            <col width = "10%">
            <col width = "6%">
            <col width = "10%%">
          </colgroup>
          <tr>
              <td>글제목</td>
              <td>{{vo.title}}</td>
              <td>작성일자</td>
              <td>{{vo.regDate.substring(0,10)}}</td>
          </tr>
          <tr>
              <td>작성자</td>
              <td>{{vo.writer}}</td>
              <td>조회수</td>
              <td>{{vo.viewcnt}}</td>
          </tr>
          <tr>
              <td>내용</td>
              <td colspan="3" id = "content">{{vo.content}}</td>
          </tr>
      </table>
      <div id = "right" align = "right">
          <button @click="this.delete">삭제</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name : "boardDetail",
    data() {
        return {
            vo : ''
        }
    },
    created() {
        console.log(this.$route);
        this.fetch();
    },
    methods : {
        fetch() {
            axios.get("http://localhost:8080/board/"+this.$route.params.id)
            .then((res) =>{
                this.vo = res.data;
            }).catch((err)=>{
                console.log(err);
            });
        },
        delete() {
            axios.delete("http://localhost:8080/board/"+this.$route.params.id)
            .then((res)=>{
                alert("게시글이 삭제되었습니다.");
                this.$router.push({path : "../"});
            }).catch((err)=>{
                console.log(err);
            });
        }
    }

}
</script>

<style>
    #content {
        height : 300px
    }
    #read {
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 270px;
    margin-right: 270px;
    }
</style>