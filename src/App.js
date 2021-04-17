import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AddNote from "./components/AddNote";
import Navbar from "./components/Navbar";
import NoteDetails from "./components/NoteDetails";
import NotesList from "./components/NotesList";
import NotFound from "./components/NotFound";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div>
          <Switch>
            <Route exact path="/" component={NotesList} />
            <Route path="/add" component={AddNote} />
            <Route path="/notes/edit/:id" component={AddNote} />
            <Route path="/notes/:id" component={NoteDetails} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
