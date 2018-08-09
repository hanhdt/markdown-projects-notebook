<template>
  <v-app id="NoteApp" dark>
    <nav-drawer></nav-drawer>
    <tool-bar></tool-bar>
      <v-content id="NoteBody" class="scroll-y">
        <v-container fluid fill-height>
          <v-layout justify-center>
            <template v-if="selectedNote">
              <main-editor></main-editor>
              <v-divider vertical inset></v-divider>
              <preview-note></preview-note>
            </template>
            <v-btn
              @click="addNote"
              :title="addButtonTitle"
              fixed
              dark
              fab
              bottom
              right
              color="green">
              <v-icon>add</v-icon>
            </v-btn>
          </v-layout>
        </v-container>
      </v-content>
    <app-footer/>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import NavDrawer from '@/components/NavDrawer'
import ToolBar from '@/components/ToolBar'
import MainEditor from '@/components/MainEditor'
import PreviewNote from '@/components/PreviewNote'
import AppFooter from '@/components/AppFooter'

export default {
  name: 'NoteApp',
  computed: {
    ...mapState([
      'selectedId'
    ]),
    ...mapGetters([
      'addButtonTitle',
      'selectedNote'
    ])
  },
  methods: {
    ...mapMutations([
      'addNote'
    ]),
    saveNotes (notes) {
      console.log('saving notes:', notes)
      localStorage.setItem('savedNotes', JSON.stringify(notes))
      this.reportOperation('saving notes')
    },
    saveNote (note) {
      if (note) {
        console.log('saving note:', note)
        let savedNotes = JSON.parse(localStorage.getItem('savedNotes'))
        savedNotes.forEach(savedNote => {
          if (savedNote.id === note.id) {
            savedNote.title = note.title
            savedNote.content = note.content
            savedNote.favorite = note.favorite
          }
        })
        localStorage.setItem('savedNotes', JSON.stringify(savedNotes))
        this.reportOperation('saving single note')
      }
    },
    reportOperation (opName) {
      console.log('The', opName, 'operation was completed!')
    }
  },
  components: {
    NavDrawer,
    ToolBar,
    MainEditor,
    PreviewNote,
    AppFooter
  },
  watch: {
    notes: 'saveNotes',
    selectedNote: {
      handler: 'saveNote',
      deep: true
    },
    selectedId (val) {
      localStorage.setItem('selectedId', val)
    }
  }
}
</script>

<style lang="scss">
.selected {
  background: #40b883;
  color: white;
}

input,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  box-sizing: border-box;
  outline: none !important;
}

.toolbar {
  padding: 8px;
  box-sizing: border-box;
  .toolbar--note-title {
    min-width: 300px;
    margin-right: 5px;
  }
}

.status-bar {
  color: #999;
  font-style: italic;
  .value {
    color: #ddd;
  }
}

textarea {
  resize: none;
  border: none;
  box-sizing: border-box;
  margin: 0 4px;
  font-family: monospace;
}

textarea, .notes, .preview {
  flex: auto 1 1;
  overflow: auto;
}

.preview {
  padding: 12px;
  box-sizing: border-box;
  border-left: solid 4px #f8f8f8;
}

.preview p:first-child {
  margin-top: 0;
}

h1,
h2,
h3 {
  margin: 10px 0 4px;
  color: #40b883;
}

h1 {
  font-size: 2em;
}

h2 {
  font-size: 1.5em;
}

h3 {
  font-size: 1.2em;
}

h4 {
  font-size: 1.1em;
  font-weight: normal;
}
</style>
