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

    filteredNotes.forEach((note, index) => {

        notesContainer.innerHTML += `

        <div class="note">

            <h3>${note.title}</h3>

            <p>${note.text}</p>

            <div class="note-buttons">

                <button class="edit-btn"
                        onclick="editNote(${index})">
                    Edit
                </button>

                <button class="delete-btn"
                        onclick="deleteNote(${index})">
                    Delete
                </button>

            </div>

        </div>

        `;

    });

}

function addNote() {

    const title =
        document.getElementById("noteTitle").value;

    const text =
        document.getElementById("noteText").value;

    if (title === "" || text === "") {

        alert("Please fill all fields");

        return;

    }

    notes.push({

        title: title,
        text: text

    });

    saveNotes();

    displayNotes();

    document.getElementById("noteTitle").value = "";

    document.getElementById("noteText").value = "";

}

function deleteNote(index) {

    notes.splice(index, 1);

    saveNotes();

    displayNotes();

}

function editNote(index) {

    document.getElementById("noteTitle").value =
        notes[index].title;

    document.getElementById("noteText").value =
        notes[index].text;

    deleteNote(index);

}

function searchNotes() {

    const searchValue =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const filteredNotes = notes.filter((note) => {

        return (

            note.title.toLowerCase()
            .includes(searchValue)

            ||

            note.text.toLowerCase()
            .includes(searchValue)

        );

    });

    displayNotes(filteredNotes);

}

displayNotes();