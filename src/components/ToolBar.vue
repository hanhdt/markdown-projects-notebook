<template>
  <v-toolbar color="teal"
    card
    dense
    fixed
    clipped-left
    scroll-off-screen
    scroll-target="#NoteBody"
    app>
    <v-toolbar-side-icon @click.stop="changeNavDrawer"></v-toolbar-side-icon>
    <v-toolbar-title class="mr-5 align-center">
      <v-icon class="mx-3">library_books</v-icon>
      <span class="title">Markdown Project Notes - {{ this.selectedNote ? this.selectedNote.title : '' }}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-layout row align-center style="max-width: 450px">
      <v-text-field
        :append-icon-cb="() => {}"
        placeholder="Search..."
        single-line
        append-icon="search"
        color="white"
        hide-details
      ></v-text-field>
    </v-layout>
    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ToolBar',
  computed: {
    ...mapState([
      'drawer'
    ]),
    ...mapGetters([
      'selectedNote'
    ])
  },
  methods: {
    ...mapMutations([
      'changeNavDrawer'
    ])
  }
}
</script>
