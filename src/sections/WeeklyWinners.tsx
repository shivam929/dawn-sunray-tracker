import { useState, useMemo } from 'react';
import { Calendar, Trophy, Users, Gamepad2, Brain, Swords, MessageSquare, Star, ChevronDown } from 'lucide-react';
import type { SunrayRecord, WeeklyWinnersData, EventCategory } from '@/types';
import { groupWinnersByEventType, getUniqueWinnersCount } from '@/hooks/useSunrayData';

interface WeeklyWinnersProps {
  weeklyWinners: WeeklyWinnersData;
  availableWeeks: string[];
}

// Event type icons mapping
const getEventIcon = (eventType: string) => {
  const type = eventType.toLowerCase();
  if (type.includes('rumble') || type.includes('royale')) return <Swords className="w-5 h-5" />;
  if (type.includes('poker')) return <Gamepad2 className="w-5 h-5" />;
  if (type.includes('chess')) return <Brain className="w-5 h-5" />;
  if (type.includes('quiz')) return <Brain className="w-5 h-5" />;
  if (type.includes('mvp') || type.includes('community')) return <Star className="w-5 h-5" />;
  if (type.includes('twitter') || type.includes('x signal')) return <MessageSquare className="w-5 h-5" />;
  if (type.includes('tetris')) return <Gamepad2 className="w-5 h-5" />;
  if (type.includes('gartic')) return <Gamepad2 className="w-5 h-5" />;
  if (type.includes('crossword')) return <Brain className="w-5 h-5" />;
  if (type.includes('karaoke')) return <MessageSquare className="w-5 h-5" />;
  return <Trophy className="w-5 h-5" />;
};

// Format date for display
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

export function WeeklyWinners({ weeklyWinners, availableWeeks }: WeeklyWinnersProps) {
  const [selectedWeek, setSelectedWeek] = useState<string>(availableWeeks[0] || '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get winners for selected week
  const currentWinners = useMemo(() => {
    return weeklyWinners[selectedWeek] || [];
  }, [weeklyWinners, selectedWeek]);

  // Group by event type
  const eventCategories = useMemo((): EventCategory[] => {
    return groupWinnersByEventType(currentWinners);
  }, [currentWinners]);

  // Stats
  const totalWinners = currentWinners.length;
  const uniqueWinners = useMemo(() => getUniqueWinnersCount(currentWinners), [currentWinners]);
  const eventTypesCount = eventCategories.length;

  // Extract ceremony number from notes
  const getCeremonyInfo = (winners: SunrayRecord[]): string => {
    if (winners.length === 0) return '';
    const notes = winners[0]?.Notes || '';
    const match = notes.match(/Sunrise Ceremony (\d+)/);
    return match ? `Sunrise Ceremony ${match[1]}` : '';
  };

  return (
    <section id="winners" className="section-container relative">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient-orange">Weekly</span>{' '}
            <span className="text-white">Winners</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Celebrate the champions of DAWN events. Browse through past ceremonies to see all winners.
          </p>
        </div>

        {/* Week Selector */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 px-6 py-3 glass-card rounded-xl hover:bg-white/10 transition-colors"
            >
              <Calendar className="w-5 h-5 text-orange-400" />
              <span className="text-white font-medium">
                {formatDate(selectedWeek)}
              </span>
              {getCeremonyInfo(currentWinners) && (
                <span className="text-orange-400 text-sm">
                  — {getCeremonyInfo(currentWinners)}
                </span>
              )}
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl overflow-hidden z-50 max-h-80 overflow-y-auto">
                {availableWeeks.map((week) => (
                  <button
                    key={week}
                    onClick={() => {
                      setSelectedWeek(week);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-6 py-3 hover:bg-orange-500/10 transition-colors ${
                      selectedWeek === week ? 'bg-orange-500/20' : ''
                    }`}
                  >
                    <span className="text-white">{formatDate(week)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card rounded-xl p-4 text-center">
            <Trophy className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{totalWinners}</p>
            <p className="text-gray-500 text-sm">Total Winners</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <Users className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{uniqueWinners}</p>
            <p className="text-gray-500 text-sm">Unique Winners</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <Gamepad2 className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{eventTypesCount}</p>
            <p className="text-gray-500 text-sm">Event Types</p>
          </div>
        </div>

        {/* Event Categories */}
        <div className="space-y-6">
          {eventCategories.map((category) => (
            <div key={category.name} className="glass-card rounded-xl overflow-hidden">
              {/* Category Header */}
              <div className="px-6 py-4 bg-orange-500/10 border-b border-orange-500/20">
                <div className="flex items-center gap-3">
                  <div className="text-orange-400">
                    {getEventIcon(category.name)}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                  <span className="ml-auto text-gray-400 text-sm">
                    {category.winners.length} winners
                  </span>
                </div>
              </div>

              {/* Winners Grid */}
              <div className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {category.winners.map((winner, index) => (
                    <div
                      key={`${winner['Discord Name']}-${index}`}
                      className="flex items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-orange-500/10 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-400 text-xs font-bold">
                          {winner['Discord Name'].charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-white text-sm truncate">
                        {winner['Discord Name']}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Winners State */}
        {eventCategories.length === 0 && (
          <div className="glass-card rounded-xl p-12 text-center">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No winners data available for this week.</p>
          </div>
        )}
      </div>
    </section>
  );
}
