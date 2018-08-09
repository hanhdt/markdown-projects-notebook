<template>
  <v-flex md6 sm12 xs12 ml-3 hidden-md-and-down v-html="notePreview"></v-flex>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PreviewNote',
  computed: {
    ...mapGetters([
      'notePreview'
    ])
  }
}
</script>
