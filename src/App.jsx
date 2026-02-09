import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CategoryStories from './pages/CategoryStories';
import StoryReader from './pages/StoryReader';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<CategoryStories />} />
            <Route path="/story/:storyId" element={<StoryReader />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
