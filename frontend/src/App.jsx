
import { useContext } from 'react';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Context } from './context/Context.js';
import SingleQuestion from './pages/SingleQuestion';
import Profile from './pages/Profile';
import UserSettings from './pages/UserSettings';
import QuestionBoard from './components/QuestionBoard';
import SingleAnnouncement from './pages/SingleAnnouncement';
import QuestionsPage from './pages/QuestionsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';



function App() {
  const theme = createTheme();
  const { user } = useContext(Context);

  return (
    <ThemeProvider theme={theme}>
      <Router>

        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/register">{user ? <Home /> : <Register />}</Route>

          <Route path="/login">  {user ? <Home /> : <Login />}</Route>
          <Route path="/profile">  {user ? <Profile /> : <Home />}</Route>
          <Route path="/questionBoard"> {user ? <QuestionBoard /> : <Login />}</Route>
          <Route path="/posts">  <QuestionsPage /> </Route>
          <Route path="/ants">  <AnnouncementsPage /> </Route>
          <Route path="/questionBoard"> {user ? <QuestionBoard /> : <Login />}</Route>
          <Route path="/userSettings"> {user ? <UserSettings /> : <Register />}</Route>
          <Route path="/post/:postid">{user ? <SingleQuestion /> : <SingleQuestion />}</Route>
          <Route path="/announcement/:antid">{user ? <SingleAnnouncement
          /> : <SingleAnnouncement />}</Route>


        </Switch>
      </Router>
    </ThemeProvider>



  );
}

export default App;
