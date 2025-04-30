// LocalStorage utility functions
function getNotes() {
    return JSON.parse(localStorage.getItem("custom_notes") || "[]");
  }
  
  function saveNote(note) {
    const notes = getNotes();
    notes.push(note);
    localStorage.setItem("custom_notes", JSON.stringify(notes));
  }
  