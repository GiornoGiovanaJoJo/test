<template lang="pug">
.contacts-links
  .contacts-links__list
    a.contacts-links__item(
      v-if="social.telegram"
      :href="`https://t.me/+${social.telegram}`"
      target="_blank"
    )
      img(src="~/assets/img/icons/telegram.svg" alt="icon" width="16")
    a.contacts-links__item(
      v-if="social.viber"
      :href="`viber://chat?number=${social.viber}`"
    )
      img(src="~/assets/img/icons/viber.svg" alt="icon" width="16")
    a.contacts-links__item.popup-with-move-anim(
      v-if="social.whatsapp"
      :href="`https://wa.me/${social.whatsapp}`"
      target="_blank"
    )
      img(src="~/assets/img/icons/whatsapp.svg" alt="icon" width="16")
</template>

<script>
export default {
  name: 'AppContactsLinks',
  props: {
    social: {
      type: Object,
      default: () => {},
    },
  },
}
</script>