import { Header } from '@/sections/Header';
import { SunraysChecker } from '@/sections/SunraysChecker';
import { Leaderboard } from '@/sections/Leaderboard';
import { TiersSection } from '@/sections/TiersSection';
import { WeeklyWinners } from '@/sections/WeeklyWinners';
import { GuideSection } from '@/sections/GuideSection';
import { useSunrayData } from '@/hooks/useSunrayData';
import { Loader2 } from 'lucide-react';

function App() {
  const { 
    users, 
    weeklyWinners, 
    availableWeeks, 
    tierCounts, 
    tierUsers, 
    totalUsers, 
    isLoading, 
    error 
  } = useSunrayData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading Sunrays data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Failed to Load Data</h2>
          <p className="text-gray-400">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 btn-premium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main>
        <SunraysChecker users={users} />
        <Leaderboard users={users} />
        <TiersSection 
          tierCounts={tierCounts} 
          tierUsers={tierUsers} 
          totalUsers={totalUsers} 
        />
        <WeeklyWinners 
          weeklyWinners={weeklyWinners} 
          availableWeeks={availableWeeks} 
        />
        <GuideSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="DAWN Logo"
                className="h-6 w-auto"
              />
              <span className="text-white font-semibold">DAWN Sunrays Tracker</span>
            </div>
            
            <p className="text-gray-500 text-sm">
              Built with passion for the DAWN community
            </p>
            
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/Bunnyyxtan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 text-sm transition-colors"
              >
                Created by BUNNYY
              </a>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-gray-600 text-xs">
              This is a community-built tracker. Data is sourced from official DAWN announcements.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
