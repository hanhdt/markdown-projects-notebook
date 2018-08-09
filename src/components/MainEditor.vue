<template>
  <v-flex md6 sm12 xs12 mr-3>
    <v-text-field v-model="selectedNote.title" label="Note title"></v-text-field>
    <v-divider></v-divider>
    <v-textarea v-model="selectedNote.content"
      box
      full-width
      auto-grow>
    </v-textarea>
    <v-divider></v-divider>
    <v-card flat>
      <v-card-text class="caption font-weight-medium font-italic">
        <span class="date">
          <span class="value">{{ selectedNote.created | date }}</span>
        </span>
        <span class="lines">
          <span class="label"> L: </span>
          <span class="value">{{ linesCount }}</span>
        </span>
        <span class="words">
          <span class="label"> W: </span>
          <span class="value">{{ wordsCount }}</span>
        </span>
        <span class="characters">
          <span class="label"> Ch: </span>
          <span class="value">{{ charactersCount }}</span>
        </span>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="favoriteNote" title="Favorite note" color="success" fab small>
          <v-icon>{{ selectedNote.favorite ? 'star' : 'star_border' }}</v-icon>
        </v-btn>
        <v-btn @click="removeNote" title="Remove note" color="error" fab small>
          <v-icon>delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MainEditor',
  computed: {
    ...mapGetters([
      'charactersCount',
      'linesCount',
      'selectedNote',
      'wordsCount'
    ])
  },
  methods: {
    ...mapMutations({
      'updatefavoriteNote': 'favoriteNote',
      'removeNoteContent': 'removeNote'
    }),
    removeNote () {
      if (confirm(`Delete the ${this.selectedNote.title} ?`)) {
        this.removeNoteContent(this.selectedNote)
      }
    },
    favoriteNote () {
      this.updatefavoriteNote(this.selectedNote)
    }
  }
}
</script>
