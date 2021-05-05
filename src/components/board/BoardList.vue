<template>
  <div id = "grid">
      <h1>게시판 목록</h1>
      <div id ="boardTable">
      <h4 id = "totalCount" align = "left">총 게시글 : {{list.totalElements}}</h4>
      <table border="1" align = "center">
            <colgroup>
                <col width = "6%">
                <col width = "*%">
                <col width = "10%">
                <col width = "15%">
            </colgroup>
             <thead>
                <tr>
                    <th>글번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>조회수</th>
                </tr>    
            </thead>  
            <tbody>
                <tr v-for="(list, id) in list.content" :key="id">
                    <td>{{list.id}}</td>
                    <td><a href="javascript:;" @click="gotoDetail(`${list.id}`)">{{list.title}}</a></td>
                    <td>{{list.writer}}</td>
                    <td>{{list.viewcnt}}</td>
                </tr>
                <tr v-if = "list.length == 0">
                    <td colspan="4">게시글이 없습니다.</td>
                </tr>   
            </tbody>   
        </table>
        <div class="pagination1">
            <span v-for="(page, idx) in list.totalPages" :key="idx">
                    <template v-if = "list.pageable.pageNumber == idx">
                        <strong> {{idx + 1}} </strong>
                    </template>
                    <template v-else>
                        <a href="javascript:;" @click="getBoardList(`${idx}`,10)"> {{idx + 1}} </a>
                    </template>
            </span>     
        </div>
      <div class = "right" align = "right">
          <button type = "button" id = "add" @click="this.gotoRegist" >글쓰기</button>
      </div> 
    </div>    
  </div>    
</template>

<script>
import axios from 'axios';
export default {
    name : "BoardList",
    data() {
        return {
            list : ''
        }
    },
    created() {
        this.getBoardList(0,10);
    },
    methods : {
        getBoardList(page,size) {
            axios.get(this.makePageUrl(page,size)).then((res)=>{
                this.list = res.data;
                console.log(res.data);
            }).catch((err)=>{
                console.log(err);
            });
        },
        makePageUrl(page, size) {
            return "http://localhost:8080/board?page="+page+"&size="+size;
        },
        gotoDetail(id) {
            this.$router.push({path : "./boardDetail/"+id, params : id});
        },
        gotoRegist() {
            this.$router.push({path : "./boardRegist"});
        }
    }

}
</script>

<style>
#grid {
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 270px;
    margin-right: 270px;
}

</style>