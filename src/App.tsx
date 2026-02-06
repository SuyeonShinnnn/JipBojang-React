import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import NotiPage from './pages/notification/NotiPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/notify" element={<NotiPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
