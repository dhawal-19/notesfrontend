import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import NotesService from "../services/NotesService";
const AddNote = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("programming");
  const [errors, setErrors] = useState(false);
  const history = useHistory();
  const saveNote = (e) => {
    e.preventDefault();
    if (!title || !body) {
      setErrors(true);
      return;
    }
    const note = { title, body, category, id };
    if (id) {
      NotesService.update(note)
        .then((response) => {
          history.push("/");
        })
        .catch((error) => {
          console.log("Something Went Wrong", error);
        });
    } else {
      NotesService.create(note)
        .then((response) => {
          history.push("/");
        })
        .catch((error) => {
          console.log("Something Went Wrong", error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      NotesService.get(id)
        .then((note) => {
          setTitle(note.data.title);
          setBody(note.data.body);
          setCategory(note.data.category);
        })
        .catch((error) => {
          console.log("Something Went Wrong.", error);
        });
    }
  }, []);
  return (
    <div className="create">
      <div className="text-center">
        <h5>{id ? "Update a Note" : "Add a New Note"}</h5>
        {errors && (
          <span style={{ color: "red", fontStyle: "italic" }}>
            Please enter the mandatory fields.
          </span>
        )}
      </div>

      <form>
        <div className="form-group">
          <label htmlFor="title">
            Note Title:<sup>*</sup>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">
            Note Description:<sup>*</sup>
          </label>
          <textarea
            id="body"
            className="form-control"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="body">Note Category:</label>
          <select
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="programming">Programming</option>
            <option value="vacation">Vacation</option>
            <option value="meeting">Meeting</option>
            <option value="blogging">Blogging</option>
          </select>
        </div>
        <div className="text-center">
          <button onClick={(e) => saveNote(e)}>
            {id ? "Update Note" : "Add Note"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;