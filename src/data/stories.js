// Combined Stories Index
import { categories, languages } from './categories';
import { storiesEn } from './stories-en';
import { storiesEn2 } from './stories-en-2';
import { storiesHi } from './stories-hi';
import { storiesHi2 } from './stories-hi-2';
import { storiesPa } from './stories-pa';
import { storiesPa2 } from './stories-pa-2';

// All stories combined
const allStories = {
  en: [...storiesEn, ...storiesEn2],
  hi: [...storiesHi, ...storiesHi2],
  pa: [...storiesPa, ...storiesPa2],
};

// Get all stories for a language
export function getStoriesByLanguage(lang = 'en') {
  return allStories[lang] || allStories.en;
}

// Get stories by category and language
export function getStoriesByCategory(categoryId, lang = 'en') {
  const stories = getStoriesByLanguage(lang);
  return stories.filter(story => story.category === categoryId);
}

// Get a story by ID (searches all languages)
export function getStoryById(storyId) {
  for (const lang of Object.keys(allStories)) {
    const story = allStories[lang].find(s => s.id === storyId);
    if (story) {
      return { ...story, language: lang };
    }
  }
  return null;
}

// Get category by ID
export function getCategoryById(categoryId) {
  return categories.find(cat => cat.id === categoryId);
}

// Get category name by language
export function getCategoryName(category, lang = 'en') {
  if (!category) return '';
  return category.name[lang] || category.name.en;
}

// Count stories per category per language
export function getStoryCounts(lang = 'en') {
  const stories = getStoriesByLanguage(lang);
  const counts = {};
  categories.forEach(cat => {
    counts[cat.id] = stories.filter(s => s.category === cat.id).length;
  });
  return counts;
}

// Get total story count
export function getTotalStoryCount() {
  let total = 0;
  Object.values(allStories).forEach(stories => {
    total += stories.length;
  });
  return total;
}

export { categories, languages };
