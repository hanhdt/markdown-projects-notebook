<template>
  <v-footer app absolute>
    <v-card flat tile class="flex">
      <v-divider></v-divider>
      <v-card-actions class="justify-center">
        &copy; {{ new Date().getFullYear() }} — <strong>Aromajoin</strong>
      </v-card-actions>
    </v-card>
    <div></div>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>
