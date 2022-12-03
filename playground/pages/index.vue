<template>
  <div>
    Works!
  </div>
</template>

<script setup>
import { useNuxtApp } from '#app'
const { $ym } = useNuxtApp()
definePageMeta({
  title: 'Startpage'
})

if ($ym) {
  $ym('hit', '/', {
    referer: '/',
    title: 'test'
  })
}
</script>
