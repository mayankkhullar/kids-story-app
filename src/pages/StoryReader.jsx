import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getStoryById, getCategoryById, getStoriesByCategory, getCategoryName } from '../data/stories';
import { ArrowLeft, ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';

export default function StoryReader() {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState('medium');

  const story = getStoryById(storyId);
  const language = story?.language || 'en';
  const category = story ? getCategoryById(story.category) : null;

  const getText = (key) => {
    const texts = {
      back: { en: 'Back to', hi: 'वापस', pa: 'ਵਾਪਸ' },
      notFound: { en: 'Story Not Found', hi: 'कहानी नहीं मिली', pa: 'ਕਹਾਣੀ ਨਹੀਂ ਮਿਲੀ' },
      notFoundDesc: { en: 'This story doesn\'t exist.', hi: 'यह कहानी मौजूद नहीं है।', pa: 'ਇਹ ਕਹਾਣੀ ਮੌਜੂਦ ਨਹੀਂ ਹੈ।' },
      home: { en: 'Go Home', hi: 'होम जाएं', pa: 'ਹੋਮ ਜਾਓ' },
      textSize: { en: 'Text Size:', hi: 'अक्षर का आकार:', pa: 'ਅੱਖਰ ਦਾ ਆਕਾਰ:' },
      moral: { en: 'What We Learned', hi: 'हमने क्या सीखा', pa: 'ਅਸੀਂ ਕੀ ਸਿੱਖਿਆ' },
      prev: { en: 'Previous Story', hi: 'पिछली कहानी', pa: 'ਪਿਛਲੀ ਕਹਾਣੀ' },
      next: { en: 'Next Story', hi: 'अगली कहानी', pa: 'ਅਗਲੀ ਕਹਾਣੀ' },
      more: { en: 'More Stories', hi: 'और कहानियाँ', pa: 'ਹੋਰ ਕਹਾਣੀਆਂ' },
      age: { en: 'Best for ages', hi: 'उम्र के लिए', pa: 'ਉਮਰ ਲਈ' },
    };
    return texts[key]?.[language] || texts[key]?.en || key;
  };

  if (!story) {
    return (
      <div className="story-reader">
        <Link to="/" className="back-btn">
          <ArrowLeft size={20} />
          {getText('home')}
        </Link>
        <div className="page-header" style={{ textAlign: 'center', marginTop: '60px' }}>
          <div style={{ fontSize: '72px', marginBottom: '20px' }}>📖❓</div>
          <h1>{getText('notFound')}</h1>
          <p>{getText('notFoundDesc')}</p>
        </div>
      </div>
    );
  }

  // Get next and previous stories in same category
  const categoryStories = getStoriesByCategory(story.category, language);
  const currentIndex = categoryStories.findIndex(s => s.id === story.id);
  const prevStory = currentIndex > 0 ? categoryStories[currentIndex - 1] : null;
  const nextStory = currentIndex < categoryStories.length - 1 ? categoryStories[currentIndex + 1] : null;

  const fontClass = `font-${fontSize}`;

  return (
    <div className="story-reader">
      <Link to={`/category/${story.category}?lang=${language}`} className="back-btn">
        <ArrowLeft size={20} />
        {getText('back')} {getCategoryName(category, language)}
      </Link>

      {/* Story Header */}
      <div className="story-header">
        <div
          className="story-icon-large"
          style={{ backgroundColor: category?.color }}
        >
          {story.icon}
        </div>
        <div
          className="category-badge"
          style={{ backgroundColor: category?.color }}
        >
          {category?.emoji} {getCategoryName(category, language)}
        </div>
        <h1>{story.title}</h1>
        <span className="age-badge">
          {getText('age')} {story.ageRange} | {story.readingTime}
        </span>
      </div>

      {/* Font Size Controls */}
      <div className="font-controls">
        <span>{getText('textSize')}</span>
        <button
          className={`font-btn ${fontSize === 'small' ? 'active' : ''}`}
          onClick={() => setFontSize('small')}
        >
          A
        </button>
        <button
          className={`font-btn ${fontSize === 'medium' ? 'active' : ''}`}
          onClick={() => setFontSize('medium')}
        >
          A
        </button>
        <button
          className={`font-btn ${fontSize === 'large' ? 'active' : ''}`}
          onClick={() => setFontSize('large')}
        >
          A
        </button>
      </div>

      {/* Story Content */}
      <div className={`story-content ${fontClass}`}>
        {story.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* Moral of the Story */}
      {story.moral && (
        <div className="story-moral">
          <h3>
            <Lightbulb size={24} />
            {getText('moral')}
          </h3>
          <p>{story.moral}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="story-nav">
        {prevStory ? (
          <Link to={`/story/${prevStory.id}`} className="nav-btn">
            <ChevronLeft size={20} />
            {getText('prev')}
          </Link>
        ) : (
          <div></div>
        )}

        {nextStory ? (
          <Link to={`/story/${nextStory.id}`} className="nav-btn primary">
            {getText('next')}
            <ChevronRight size={20} />
          </Link>
        ) : (
          <Link to={`/category/${story.category}?lang=${language}`} className="nav-btn primary">
            {getText('more')}
            <ChevronRight size={20} />
          </Link>
        )}
      </div>
    </div>
  );
}
