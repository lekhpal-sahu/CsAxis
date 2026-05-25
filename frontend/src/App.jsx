import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Roadmap from './pages/Roadmap';
import Login from './pages/Login';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('dark');
  const [viewMode, setViewMode] = useState('grid');

  React.useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // Extended mock state for resources (6 items)
  const [resources, setResources] = useState([
    {
      id: 3,
      title: 'Stanford CS229: Machine Learning Course',
      url: 'https://www.youtube.com/watch?v=jGwO_UgTS7I',
      tag: 'dev-aiml-ml',
      timeAgo: '1 day ago',
      votes: 356,
      comments: 102,
      userVote: 0
    },

    {
      id: 9,
      title: 'Deep Learning Specialization - Andrew Ng',
      url: 'https://www.youtube.com/watch?v=CS4cs9xVecg',
      tag: 'dev-aiml-dl',
      timeAgo: '2 days ago',
      votes: 890,
      comments: 115,
      userVote: 0
    },
    { id: 10, title: 'AI/ML Playlist 1', url: 'https://youtube.com/playlist?list=PLKnIA16_RmvZ41tjbKB2ZnwchfniNsMuQ', tag: 'dev-aiml-ml', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 11, title: 'AI/ML Playlist 2', url: 'https://youtube.com/playlist?list=PLKnIA16_Rmvboy8bmDCjwNHgTaYH2puK7', tag: 'dev-aiml-ml', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 12, title: 'AI/ML Playlist 3', url: 'https://youtube.com/playlist?list=PLKnIA16_RmvZo7fp5kkIth6nRTeQQsjfX', tag: 'dev-aiml-ml', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 13, title: 'AI/ML Playlist 4', url: 'https://youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYQuBfsVkjoLcJgxHH', tag: 'dev-aiml-ml', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 14, title: 'System Design Course', url: 'https://youtube.com/playlist?list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT', tag: 'system-design', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 15, title: 'DSA C++ Course', url: 'https://youtube.com/playlist?list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT', tag: 'dsa-cpp', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 16, title: 'Striver\'s A2Z DSA Sheet', url: 'https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z', tag: 'dsa-all', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 16, title: 'Python Neetcode', url: 'https://neetcode.com', tag: 'dsa-python', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 17, title: 'Python Playlist', url: 'https://youtube.com/playlist?list=PLu71SKxNbfoAMcPw8uJXxjeLwYQV8MkpQ', tag: 'dsa-python', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 18, title: 'DSA Java ', url: 'https://youtu.be/xwI5OBEnsZU', tag: 'dsa-java', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 19, title: 'CS50 playlist 1', url: 'https://youtube.com/playlist?list=PLhQjrBD2T380hlTqAU8HfvVepCcjCqTg6', tag: 'dev-basics-cs50', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 20, title: 'CS50 playlist 2', url: 'https://youtube.com/playlist?list=PLhQjrBD2T381PopUTYtMSstgk-hsTGkVm', tag: 'dev-basics-cs50', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 21, title: 'CS50 playlist 3', url: 'https://youtube.com/playlist?list=PLhQjrBD2T382v1MBjNOhPu9SiJ1fsD4C0', tag: 'dev-basics-cs50', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 22, title: 'CS50 playlist 4', url: 'https://youtube.com/playlist?list=PLhQjrBD2T3817j24-GogXmWqO5Q5vYy0V', tag: 'dev-basics-cs50', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 23, title: 'Web Dev Tutorial 1', url: 'https://youtu.be/3LRZRSIh_KE', tag: 'dev-web', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 24, title: 'Web Dev Tutorial 2', url: 'https://youtube.com/playlist?list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW', tag: 'dev-web', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 25, title: 'Web Dev Tutorial 3', url: 'https://youtube.com/playlist?list=PLu71SKxNbfoBkkr8lblqtsJvxrw3j1tWC', tag: 'dev-web', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 26, title: 'Web Dev Tutorial 4', url: 'https://youtube.com/playlist?list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37', tag: 'dev-web', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 27, title: 'Web Dev Tutorial 5', url: 'https://youtube.com/playlist?list=PLu71SKxNbfoBsMugTFALhdLlZ5VOqCg2s', tag: 'dev-web', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 28, title: 'Core CS Subjects One Shot 1', url: 'https://youtu.be/IPvYjXCsTg8', tag: 'core-cs', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 29, title: 'Core CS Subjects One Shot 2', url: 'https://youtu.be/dl00fOOYLOM', tag: 'core-cs', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 30, title: 'Core CS Subjects One Shot 3', url: 'https://youtu.be/3obEP8eLsCw', tag: 'core-cs', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 31, title: 'GATE Resources Spreadsheet 1', url: 'https://docs.google.com/spreadsheets/u/0/d/1deRNsCI8WpGyEv7HbPUs65VEbeDTcUvZV4db1hB8gv8/htmlview', tag: 'gate-general', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 },
    { id: 32, title: 'GATE Resources Spreadsheet 2', url: 'https://docs.google.com/spreadsheets/u/0/d/1VciaNd1WZc4MuAXHmipVunKoCWkDcCpWsM1M2MSrV0Y/htmlview', tag: 'gate-general', timeAgo: 'Just now', votes: 1, comments: 0, userVote: 0 }
  ]);

  const handleUpvote = (id) => {
    setResources(prev => prev.map(res => {
      if (res.id === id) {
        if (res.userVote === 1) {
          return { ...res, votes: res.votes - 1, userVote: 0 };
        } else if (res.userVote === -1) {
          return { ...res, votes: res.votes + 2, userVote: 1 };
        } else {
          return { ...res, votes: res.votes + 1, userVote: 1 };
        }
      }
      return res;
    }));
  };

  const handleDownvote = (id) => {
    setResources(prev => prev.map(res => {
      if (res.id === id) {
        if (res.userVote === -1) {
          return { ...res, votes: res.votes + 1, userVote: 0 };
        } else if (res.userVote === 1) {
          return { ...res, votes: res.votes - 2, userVote: -1 };
        } else {
          return { ...res, votes: res.votes - 1, userVote: -1 };
        }
      }
      return res;
    }));
  };

  // Filter resources based on search query (search globally)
  const matchingResources = resources.filter(res =>
    searchQuery ? res.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        matchingResources={matchingResources}
      />
      <main>
        <div style={{ maxWidth: '1200px', margin: '0 auto 1rem', display: 'flex', justifyContent: 'flex-end', padding: '0 1rem' }}>
          <div className="glass-panel" style={{ display: 'flex', padding: '0.2rem', borderRadius: '8px', zIndex: 10, position: 'relative' }}>
            <button
              className={`btn ${viewMode === 'list' ? 'text-accent' : ''}`}
              style={{ padding: '0.4rem 0.8rem', background: viewMode === 'list' ? 'var(--surface-hover)' : 'transparent', borderRadius: '4px' }}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
            <button
              className={`btn ${viewMode === 'grid' ? 'text-accent' : ''}`}
              style={{ padding: '0.4rem 0.8rem', background: viewMode === 'grid' ? 'var(--surface-hover)' : 'transparent', borderRadius: '4px' }}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
          </div>
        </div>

        <Routes>
          <Route path="/" element={
            <Home
              resources={matchingResources}
              filter={null}
              viewMode={viewMode}
              onUpvote={handleUpvote}
              onDownvote={handleDownvote}
            />
          } />
          <Route path="/roadmap/:topic" element={
            <Roadmap
              resources={matchingResources}
              viewMode={viewMode}
              onUpvote={handleUpvote}
              onDownvote={handleDownvote}
            />
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
