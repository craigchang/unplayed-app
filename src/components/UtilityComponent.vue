<template>
</template>

<script>
/* eslint-disable */
export default {
  name: 'UtilityComponent',
  methods: {
    sortAscByCategory: (cat, list) => {
      list.sort((a, b) => {
        let param1 = a[cat];
        let param2 = b[cat];
        if (typeof a[cat] == 'string') param1 = a[cat].toLowerCase();
        if (typeof b[cat] == 'string') param2 = b[cat].toLowerCase();
        if (param1 < param2) return -1;
        else if (param1 > param2) return 1;
        else return 0;
      });

      return list;
    },
    sortDescByCategory: (cat, list) => {
      list.sort((a, b) => {
        let param1 = a[cat];
        let param2 = b[cat];
        if (typeof a[cat] == 'string') param1 = a[cat].toLowerCase();
        if (typeof b[cat] == 'string') param2 = b[cat].toLowerCase();
        if (param1 > param2) return -1;
        else if (param1 < param2) return 1;
        else return 0;
      });

      return list;
    }
  }
  
};

</script>

<style scoped>
</style>