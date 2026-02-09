import { Link } from 'react-router-dom';
import { Home, BookOpen } from 'lucide-react';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-emoji">📚</span>
          <span className="logo-text">Story Time</span>
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">
            <Home size={20} />
            <span>Home</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
