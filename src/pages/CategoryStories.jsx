import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getStoriesByCategory, getCategoryById, getCategoryName } from '../data/stories';
import { ArrowLeft, ChevronRight, Clock, Users } from 'lucide-react';

export default function CategoryStories() {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const language = searchParams.get('lang') || localStorage.getItem('storyLanguage') || 'en';

  const category = getCategoryById(categoryId);
  const categoryStories = getStoriesByCategory(categoryId, language);

  const getBackText = () => {
    switch(language) {
      case 'hi': return 'श्रेणियों पर वापस';
      case 'pa': return 'ਸ਼੍ਰੇਣੀਆਂ ਤੇ ਵਾਪਸ';
      default: return 'Back to Categories';
    }
  };

  const getNoStoriesText = () => {
    switch(language) {
      case 'hi': return 'इस श्रेणी में अभी कोई कहानी नहीं है';
      case 'pa': return 'ਇਸ ਸ਼੍ਰੇਣੀ ਵਿੱਚ ਅਜੇ ਕੋਈ ਕਹਾਣੀ ਨਹੀਂ ਹੈ';
      default: return 'No stories in this category yet';
    }
  };

  if (!category) {
    return (
      <div className="stories-page">
        <Link to="/" className="back-btn">
          <ArrowLeft size={20} />
          {getBackText()}
        </Link>
        <div className="page-header">
          <h1>Category Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="stories-page">
      <Link to="/" className="back-btn">
        <ArrowLeft size={20} />
        {getBackText()}
      </Link>

      <div className="page-header">
        <h1>{category.emoji} {getCategoryName(category, language)}</h1>
        <p>{categoryStories.length} {language === 'hi' ? 'कहानियाँ' : language === 'pa' ? 'ਕਹਾਣੀਆਂ' : 'stories'}</p>
      </div>

      {categoryStories.length > 0 ? (
        <div className="stories-list">
          {categoryStories.map((story) => (
            <Link
              key={story.id}
              to={`/story/${story.id}`}
              className="story-card"
            >
              <div
                className="story-card-icon"
                style={{ backgroundColor: category.color }}
              >
                {story.icon}
              </div>

              <div className="story-card-content">
                <h3 className="story-card-title">{story.title}</h3>
                <p className="story-card-desc">{story.description}</p>
                <div className="story-card-meta">
                  <span><Clock size={14} /> {story.readingTime}</span>
                  <span><Users size={14} /> {story.ageRange} {language === 'hi' ? 'साल' : language === 'pa' ? 'ਸਾਲ' : 'years'}</span>
                </div>
              </div>

              <ChevronRight size={24} className="story-card-arrow" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-stories">
          <p>{getNoStoriesText()}</p>
        </div>
      )}
    </div>
  );
}
