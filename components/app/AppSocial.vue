<template lang="pug">
.social
  .social__list
    a.social__item(href="https://rutube.ru/channel/32963276/" target="_blank")
      img(src='~/assets/img/icons/rutube.svg' alt='icon' width='16' style="margin-top: -4px")
    a.social__item(href="https://www.youtube.com/@Russian-lion/featured" target="_blank")
      img(src='~/assets/img/icons/youtube.svg' alt='icon' width='16')
    a.social__item(href="https://vk.com/russianlionru" target="_blank")
      img(src='~/assets/img/icons/vk.svg' alt='icon' width='16')
    a.social__item(href="https://ok.ru/group/70000004894312" target="_blank")
      img(src='~/assets/img/icons/ok.svg' alt='icon' style="height: 16px; width: 16px;")
</template>

<script>
export default {
  name: 'AppSocial',
}
</script>