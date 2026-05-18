let notes = JSON.parse(
    localStorage.getItem("notes")
) || [];

function saveNotes() {

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

}

function displayNotes(filteredNotes = notes) {

    const notesContainer =
    document.getElementById("notesContainer");

    notesContainer.innerHTML = "";

    filteredNotes.forEach((note) => {

        notesContainer.innerHTML += `

        <div class="note">

            <h3>${note.title}</h3>

            <p>${note.text}</p>

            <small>
                ${note.date}
            </small>

            <div class="note-buttons">

                <button class="edit-btn"
                        onclick="editNote(${note.id})">

                    Edit

                </button>

                <button class="delete-btn"
                        onclick="deleteNote(${note.id})">

                    Delete

                </button>

            </div>

        </div>

        `;

    });

}

function addNote() {

    const title =
    document.getElementById("noteTitle")
    .value.trim();

    const text =
    document.getElementById("noteText")
    .value.trim();

    if (title === "" || text === "") {

        alert("Please fill all fields");

        return;

    }

    const note = {

        id: Date.now(),

        title: title,

        text: text,

        date:
        new Date()
        .toLocaleString()

    };

    notes.unshift(note);

    saveNotes();

    displayNotes();

    clearInputs();

}

function deleteNote(id) {

    notes = notes.filter(note =>
        note.id !== id
    );

    saveNotes();

    displayNotes();

}

function editNote(id) {

    const note =
    notes.find(note =>
        note.id === id
    );

    document.getElementById("noteTitle")
    .value = note.title;

    document.getElementById("noteText")
    .value = note.text;

    deleteNote(id);

}

function searchNotes() {

    const searchValue =
    document.getElementById("searchInput")
    .value
    .toLowerCase();

    const filteredNotes =
    notes.filter(note =>

        note.title
        .toLowerCase()
        .includes(searchValue)

        ||

        note.text
        .toLowerCase()
        .includes(searchValue)

    );

    displayNotes(filteredNotes);

}

function clearInputs() {

    document.getElementById("noteTitle")
    .value = "";

    document.getElementById("noteText")
    .value = "";

}

displayNotes();