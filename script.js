const noteForm = document.getElementById("noteForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notesSection = document.getElementById("notesSection");
const addNoteSection = document.getElementById("addNoteSection");
const notesList = document.getElementById("notesList");
const spinner = document.getElementById("spinner");
const errorBanner = document.getElementById("errorBanner");

document.getElementById("addNoteTab").addEventListener("click", () => {
  addNoteSection.classList.remove("d-none");
  notesSection.classList.add("d-none");
});

document.getElementById("viewNotesTab").addEventListener("click", () => {
  addNoteSection.classList.add("d-none");
  notesSection.classList.remove("d-none");
  loadNotes();
});

// Save Note
noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  spinner.classList.remove("d-none");
  errorBanner.classList.add("d-none");

  const note = {
    title: titleInput.value,
    content: contentInput.value,
    createdAt: new Date().toISOString(),
  };

  try {
    saveNote(note);
    titleInput.value = "";
    contentInput.value = "";
    // Why I chose useState + this submit handler: basic form handling is enough with plain JS
  } catch (error) {
    errorBanner.classList.remove("d-none");
  } finally {
    spinner.classList.add("d-none");
  }
});

// Load Notes
function loadNotes() {
  notesList.innerHTML = "";
  const notes = getNotes();

  notes.forEach((note) => {
    const card = document.createElement("div");
    card.className = "col-md-4";
    card.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${note.title}</h5>
          <p class="card-text">${note.content.slice(0, 100)}...</p>
        </div>
      </div>
    `;
    notesList.appendChild(card);
  });

  // Why useEffect to sync storage → state: load notes from storage only when needed
}
