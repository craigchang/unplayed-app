<template></template>
<script>
/* eslint-disable */
export default {
  name: 'UtilityComponent',
  methods: {
    sortAscByCategory: (cat, list) => {
      list.sort((a, b) => {
        let param1 = typeof a[cat] == 'string' ? a[cat].toLowerCase() : a[cat];
        let param2 = typeof b[cat] == 'string' ? b[cat].toLowerCase() : b[cat];
        if (param1 < param2) return -1;
        else if (param1 > param2) return 1;
        else return 0;
      });

      return list;
    },
    sortDescByCategory: (cat, list) => {
      list.sort((a, b) => {
        let param1 = typeof a[cat] == 'string' ? a[cat].toLowerCase() : a[cat];
        let param2 = typeof b[cat] == 'string' ? b[cat].toLowerCase() : b[cat];
        if (param1 > param2) return -1;
        else if (param1 < param2) return 1;
        else return 0;
      });

      return list;
    }
  }
  
};

</script>
<style></style>