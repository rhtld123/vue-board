<template>
  <div class="pagination1">
    <span v-for="(page, idx) in data.totalPages" :key="idx">
      <template v-if="data.pageable.pageNumber == idx">
        <strong> {{ idx + 1 }} </strong>
      </template>
      <template v-else>
        <a href="javascript:;" @click="fetch(`${idx}`)">
          {{ idx + 1 }}
        </a>
      </template>
    </span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["data"],
  methods: {
    fetch(page) {
      this.$parent.getList(page,10);
    }
  }
};
</script>

<style>
</style>