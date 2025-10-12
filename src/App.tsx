import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { UniversitiesPage } from './components/UniversitiesPage';
import { UniversityDetail } from './components/UniversityDetail';
import { FacultiesPage } from './components/FacultiesPage';
import { AuthPage } from './components/AuthPage';
import { ProfilePage } from './components/ProfilePage';
import { AdminLoginPage } from './components/AdminLoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { ComparePage } from './components/ComparePage';
import { Footer } from './components/Footer';

interface University {
  id: number;
  name: string;
  arabicName: string;
  city: string;
  type: 'Public' | 'Private';
  founded: number;
  students: string;
  ranking: number;
  image: string;
  programs: string[];
  tuitionRange: string;
  rating: number;
  description: string;
}

interface User {
  name: string;
  email: string;
  role: 'student' | 'admin';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handlePageChange = (page: string) => {
    // Protect admin routes
    if (page === 'admin-dashboard' && (!isAuthenticated || user?.role !== 'admin')) {
      setCurrentPage('admin-login');
      return;
    }
    
    // Protect profile route
    if (page === 'profile' && !isAuthenticated) {
      setCurrentPage('login');
      return;
    }
    
    setCurrentPage(page);
    setSelectedUniversity(null);
  };

  const handleUniversitySelect = (university: University) => {
    setSelectedUniversity(university);
    setCurrentPage('university-detail');
  };

  const handleBackToUniversities = () => {
    setSelectedUniversity(null);
    setCurrentPage('universities');
  };

  const handleLogin = (email: string, role: 'student' | 'admin') => {
    setUser({
      name: role === 'admin' ? 'Admin User' : 'Student User',
      email: email,
      role: role,
    });
    setIsAuthenticated(true);
    setCurrentPage(role === 'admin' ? 'admin-dashboard' : 'home');
  };

  const handleAdminLogin = (email: string) => {
    setUser({
      name: 'Admin User',
      email: email,
      role: 'admin',
    });
    setIsAuthenticated(true);
    setCurrentPage('admin-dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero onPageChange={handlePageChange} />;
      case 'universities':
        return <UniversitiesPage onUniversitySelect={handleUniversitySelect} />;
      case 'university-detail':
        return selectedUniversity ? (
          <UniversityDetail 
            university={selectedUniversity} 
            onBack={handleBackToUniversities} 
          />
        ) : (
          <UniversitiesPage onUniversitySelect={handleUniversitySelect} />
        );
      case 'faculties':
        return <FacultiesPage />;
      case 'compare':
        return <ComparePage />;
      case 'login':
        return <AuthPage onLogin={handleLogin} onPageChange={handlePageChange} />;
      case 'profile':
        return user ? <ProfilePage user={user} /> : <AuthPage onLogin={handleLogin} onPageChange={handlePageChange} />;
      case 'admin-login':
        return <AdminLoginPage onAdminLogin={handleAdminLogin} onPageChange={handlePageChange} />;
      case 'admin-dashboard':
        return isAuthenticated && user?.role === 'admin' ? (
          <AdminDashboard />
        ) : (
          <AdminLoginPage onAdminLogin={handleAdminLogin} onPageChange={handlePageChange} />
        );
      case 'about':
        return <AboutPage onPageChange={handlePageChange} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <Hero onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
      <main>
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}