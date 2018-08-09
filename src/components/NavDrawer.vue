<template>
  <v-navigation-drawer :value="drawer" fixed clipped floating>
    <v-list dense two-line>
      <v-subheader class="mt-3 grey--text text--darken-1">ACTIONS</v-subheader>
      <v-list-tile class="mt-3" @click="importNotes">
        <v-list-tile-action>
          <v-icon>cloud_download</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Import Notes</v-list-tile-title>
      </v-list-tile>
      <v-list-tile class="mt-3" @click="exportNotes">
        <v-list-tile-action>
          <v-icon>cloud_upload</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Export Notes</v-list-tile-title>
      </v-list-tile>
      <v-subheader class="mt-3 grey--text text--darken-1">NOTES LIST</v-subheader>
      <v-list>
        <v-list-tile v-for="note of sortedNotes" :key="note.text" @click="selectNote(note)"
          :class="{selected: note === selectedNote}">
          <v-list-tile-action>
            <v-icon>featured_play_list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{note.title}}
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon v-if="note.favorite">star</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'NavDrawer',
  computed: {
    ...mapState([
      'drawer',
      'notes'
    ]),
    ...mapGetters([
      'selectedNote',
      'sortedNotes'
    ])
  },
  methods: {
    ...mapMutations([
      'selectNote',
      'loadNotes'
    ]),
    importNotes () {
      console.log('Importing notes...')
      this.$http.get('/notes.json')
        .then(response => {
          // Only if data is not empty
          if (response.data.length > 0) {
            // reload local notes
            this.loadNotes(response.data)
            // set localStorage
            localStorage.setItem('savedNotes', JSON.stringify(response.data))
          }
        })
        .catch((error) => {
          console.error('Error:', JSON.stringify(error))
        })
    },
    exportNotes () {
      console.log('Exporting notes...')
      const exportNotesBlob = new Blob([JSON.stringify(this.notes)], { type: 'application/json' })
      const event = document.createEvent('MouseEvent')
      const a = document.createElement('a')
      a.download = 'notes.json'
      a.href = window.URL.createObjectURL(exportNotesBlob)
      a.dataset.downloadurl = ['application/json', a.download, a.href].join(':')
      event.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(event)
    }
  }
}
</script>
