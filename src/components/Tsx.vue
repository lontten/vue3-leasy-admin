<script setup lang="tsx">

const tsxDiv = () => {
  let a = []
  for (let i = 0; i < 3; i++) {
    a.push(<div>hello tsx</div>)
  }
  return a
}
</script>

<template>
  <tsxDiv></tsxDiv>
</template>

<style scoped lang="scss">
</style>
