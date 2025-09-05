import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Search from './pages/Search';
import Health from './pages/Health';
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateProfile from "./components/CreateProfile";
import ViewProfile from "./components/ViewProfile";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/search" element={<Search />} />
          <Route path="/health" element={<Health />} />
          <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
  <Route path="/profile/create" element={<CreateProfile />} />
  <Route path="/profile/:id" element={<ViewProfile />} />
  <Route path="/profile/edit/:id" element={<EditProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;