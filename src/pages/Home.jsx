import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, languages, getStoryCounts, getTotalStoryCount, getCategoryName } from '../data/stories';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('storyLanguage') || 'en';
  });

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('storyLanguage', lang);
  };

  const storyCounts = getStoryCounts(language);
  const totalStories = getTotalStoryCount();

  const getTitle = () => {
    switch(language) {
      case 'hi': return 'कहानियों का समय';
      case 'pa': return 'ਕਹਾਣੀਆਂ ਦਾ ਵੇਲਾ';
      default: return 'Story Time';
    }
  };

  const getSubtitle = () => {
    switch(language) {
      case 'hi': return 'दादी-नानी की प्यारी कहानियाँ बच्चों के लिए';
      case 'pa': return 'ਦਾਦੀ-ਨਾਨੀ ਦੀਆਂ ਪਿਆਰੀਆਂ ਕਹਾਣੀਆਂ ਬੱਚਿਆਂ ਲਈ';
      default: return 'Beautiful stories for grandparents to read to their grandchildren';
    }
  };

  const getChooseText = () => {
    switch(language) {
      case 'hi': return 'कहानी का प्रकार चुनें';
      case 'pa': return 'ਕਹਾਣੀ ਦੀ ਕਿਸਮ ਚੁਣੋ';
      default: return 'Choose a Story Type';
    }
  };

  const getStoriesText = (count) => {
    switch(language) {
      case 'hi': return `${count} कहानियाँ`;
      case 'pa': return `${count} ਕਹਾਣੀਆਂ`;
      default: return `${count} stories`;
    }
  };

  return (
    <div className="home-page">
      {/* Language Selector */}
      <div className="language-selector">
        {languages.map((lang) => (
          <button
            key={lang.id}
            className={`lang-btn ${language === lang.id ? 'active' : ''}`}
            onClick={() => handleLanguageChange(lang.id)}
          >
            <span className="lang-flag">{lang.flag}</span>
            <span className="lang-name">{lang.name}</span>
          </button>
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            <Sparkles className="hero-icon" />
            {getTitle()}
            <Sparkles className="hero-icon" />
          </h1>
          <p>{getSubtitle()}</p>
          <div className="total-stories">
            {totalStories}+ {language === 'hi' ? 'कहानियाँ' : language === 'pa' ? 'ਕਹਾਣੀਆਂ' : 'Stories'}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <h2 className="section-title">{getChooseText()}</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}?lang=${language}`}
              className="category-card"
              style={{ backgroundColor: cat.color }}
            >
              <span className="category-emoji">{cat.emoji}</span>
              <span className="category-name">{getCategoryName(cat, language)}</span>
              <span className="category-count">
                {getStoriesText(storyCounts[cat.id] || 0)}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
