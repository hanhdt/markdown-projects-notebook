/* global localStorage */

import Vue from 'vue'
import Vuex from 'vuex'
import marked from 'marked'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    drawer: false,
    notes: JSON.parse(localStorage.getItem('savedNotes')) || [],
    selectedId: localStorage.getItem('selectedId') || null
  },
  getters: {
    addButtonTitle (state) {
      return state.notes.length + ' note(s) already'
    },
    charactersCount (state, getter) {
      if (getter.selectedNote) {
        return getter.selectedNote.content.split('').length
      }
      return 0
    },
    linesCount (state, getter) {
      if (getter.selectedNote) {
        return getter.selectedNote.content.split(/\r\n|\r|\n/).length
      }
      return 0
    },
    notePreview (state, getter) {
      return getter.selectedNote ? marked(getter.selectedNote.content) : ''
    },
    selectedNote (state) {
      return state.notes.find(note => note.id === state.selectedId)
    },
    sortedNotes (state) {
      return state.notes.slice()
        .sort((a, b) => a.created - b.created)
        .sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1)
    },
    wordsCount (state, getter) {
      if (getter.selectedNote) {
        let s = getter.selectedNote.content
        // Turn new line characters into white-spaces
        s = s.replace(/\n/g, ' ')
        // Exclude start and end white-spaces
        s = s.replace(/(^\s*)|(\s*$)/gi, '')
        // Turn 2 or more duplicate white-spaces into 1
        s = s.replace(/\s\s+/gi, ' ')
        return s.split(' ').length
      }
      return 0
    }
  },
  mutations: {
    addNote (state) {
      const time = Date.now()
      const note = {
        id: String(time),
        title: 'New note ' + (state.notes.length + 1),
        content: '**Hi!** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
        created: time,
        favorite: false
      }
      // Add to the list
      state.notes.push(note)
    },
    loadNotes (state, notes) {
      if (notes.length > 0) {
        state.notes = notes
      }
    },
    selectNote (state, note) {
      state.selectedId = note.id
    },
    changeNavDrawer (state) {
      state.drawer = !state.drawer
    },
    favoriteNote (state, note) {
      note.favorite = !note.favorite
    },
    removeNote (state, note) {
      if (note) {
        const index = state.notes.indexOf(note)
        if (index !== -1) {
          state.notes.splice(index, 1)
          state.selectedId = null
          localStorage.setItem('selectedId', null)
        }
      }
    }
  },
  actions: {

  }
})

export default store
