import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Trophy, Medal, Award, X, Sparkles } from 'lucide-react';
import type { ProcessedUser } from '@/types';
import { getTierConfig, getTierColor } from '@/types';

interface SunraysCheckerProps {
  users: ProcessedUser[];
}

export function SunraysChecker({ users }: SunraysCheckerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<ProcessedUser | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter users based on search query
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return users
      .filter(user => 
        user.username.toLowerCase().includes(query)
      )
      .slice(0, 8);
  }, [searchQuery, users]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get rank icon based on global rank
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 rank-1" />;
    if (rank === 2) return <Medal className="w-5 h-5 rank-2" />;
    if (rank === 3) return <Award className="w-5 h-5 rank-3" />;
    return <span className="text-gray-400 font-mono text-sm">#{rank}</span>;
  };

  const handleUserSelect = (user: ProcessedUser) => {
    setSelectedUser(user);
    setSearchQuery(user.username);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedUser(null);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const tierConfig = selectedUser ? getTierConfig(selectedUser.tier) : null;

  return (
    <section id="checker" className="section-container min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 text-sm font-medium">Sunrays Tracker</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient-orange">Check Your</span>
            <br />
            <span className="text-white">Sunrays Status</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Search for your Discord username to view your tier, rank, and Sunrays balance.
          </p>
        </div>

        {/* Search Container */}
        <div ref={searchRef} className="relative">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
                if (selectedUser) setSelectedUser(null);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Enter your Discord username..."
              className="search-input text-lg"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl overflow-hidden z-50">
              <div className="max-h-80 overflow-y-auto">
                {suggestions.map((user) => (
                  <button
                    key={user.username}
                    onClick={() => handleUserSelect(user)}
                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-orange-500/10 transition-colors border-b border-white/5 last:border-0"
                  >
                    {/* Rank */}
                    <div className="w-10 flex justify-center">
                      {getRankIcon(user.globalRank)}
                    </div>
                    
                    {/* Username */}
                    <span className="flex-1 text-left text-white font-medium truncate">
                      {user.username}
                    </span>
                    
                    {/* Sunrays */}
                    <span className="text-orange-400 font-semibold">
                      {user.sunrays} ☀️
                    </span>
                    
                    {/* Tier Badge */}
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${getTierColor(user.tier)}20`,
                        color: getTierColor(user.tier),
                      }}
                    >
                      {user.tier}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {showSuggestions && searchQuery && suggestions.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl p-4 text-center">
              <p className="text-gray-400">No users found matching &quot;{searchQuery}&quot;</p>
            </div>
          )}
        </div>

        {/* User Card */}
        {selectedUser && tierConfig && (
          <div className="mt-8 fade-in">
            <div className="glass-card rounded-2xl overflow-hidden">
              {/* Card Header with Tier Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={tierConfig.image}
                  alt={tierConfig.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2"
                    style={{
                      backgroundColor: `${getTierColor(selectedUser.tier)}30`,
                      color: getTierColor(selectedUser.tier),
                      border: `1px solid ${getTierColor(selectedUser.tier)}50`,
                    }}
                  >
                    {selectedUser.tier}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{selectedUser.username}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {/* Sunrays */}
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <p className="text-gray-400 text-sm mb-1">Sunrays</p>
                    <p className="text-2xl font-bold text-orange-400">
                      {selectedUser.sunrays}
                    </p>
                  </div>

                  {/* Global Rank */}
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <p className="text-gray-400 text-sm mb-1">Global Rank</p>
                    <div className="flex items-center justify-center gap-2">
                      {selectedUser.globalRank <= 3 ? (
                        getRankIcon(selectedUser.globalRank)
                      ) : null}
                      <p className={`text-2xl font-bold ${
                        selectedUser.globalRank === 1 ? 'text-yellow-400' :
                        selectedUser.globalRank === 2 ? 'text-gray-300' :
                        selectedUser.globalRank === 3 ? 'text-amber-600' :
                        'text-white'
                      }`}>
                        #{selectedUser.globalRank}
                      </p>
                    </div>
                  </div>

                  {/* Tier Position */}
                  <div className="text-center p-4 rounded-xl bg-white/5">
                    <p className="text-gray-400 text-sm mb-1">Tier Position</p>
                    <p className="text-2xl font-bold text-white">
                      {selectedUser.sunrays >= 35 ? 'Elite' :
                       selectedUser.sunrays >= 30 ? 'Top 1%' :
                       selectedUser.sunrays >= 25 ? 'Top 5%' :
                       selectedUser.sunrays >= 20 ? 'Top 10%' :
                       selectedUser.sunrays >= 15 ? 'Top 20%' :
                       selectedUser.sunrays >= 10 ? 'Top 30%' :
                       selectedUser.sunrays >= 5 ? 'Top 50%' : 'Rising'}
                    </p>
                  </div>
                </div>

                {/* Tier Description */}
                <div className="mt-4 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                  <p className="text-gray-300 text-center">
                    {tierConfig.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Summary */}
        <div className="mt-10 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient-orange">{users.length}</p>
            <p className="text-gray-500 text-sm">Total Users</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient-orange">
              {Math.max(...users.map(u => u.sunrays), 0)}
            </p>
            <p className="text-gray-500 text-sm">Highest Sunrays</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient-orange">8</p>
            <p className="text-gray-500 text-sm">Tiers</p>
          </div>
        </div>
      </div>
    </section>
  );
}
