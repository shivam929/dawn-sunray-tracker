import { useState, useMemo } from 'react';
import { Trophy, Medal, Award, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import type { ProcessedUser } from '@/types';
import { getTierColor } from '@/types';

interface LeaderboardProps {
  users: ProcessedUser[];
}

const ITEMS_PER_PAGE = 20;

export function Leaderboard({ users }: LeaderboardProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter users by search
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    return users.filter(user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  // Paginate users
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Get rank icon
  const getRankDisplay = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 rank-1" />;
    if (rank === 2) return <Medal className="w-5 h-5 rank-2" />;
    if (rank === 3) return <Award className="w-5 h-5 rank-3" />;
    return <span className="text-gray-500 font-mono">#{rank}</span>;
  };

  // Handle page change
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <section id="leaderboard" className="section-container relative">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient-orange">Global</span>{' '}
            <span className="text-white">Leaderboard</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See where you stand among the DAWN community. Rankings are updated based on total Sunrays earned.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search username..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="premium-table">
              <thead>
                <tr>
                  <th className="w-20 text-center">Rank</th>
                  <th>Username</th>
                  <th className="w-32">Tier</th>
                  <th className="w-28 text-right">Sunrays</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                    <tr key={user.username} className="group">
                      <td className="text-center">
                        <div className="flex justify-center">
                          {getRankDisplay(user.globalRank)}
                        </div>
                      </td>
                      <td>
                        <span className="text-white font-medium group-hover:text-orange-400 transition-colors">
                          {user.username}
                        </span>
                      </td>
                      <td>
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: `${getTierColor(user.tier)}20`,
                            color: getTierColor(user.tier),
                          }}
                        >
                          {user.tier}
                        </span>
                      </td>
                      <td className="text-right">
                        <span className="text-orange-400 font-semibold">
                          {user.sunrays}
                        </span>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {paginatedUsers.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-gray-400">No users found matching your search.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-500/20 hover:border-orange-500/30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="text-gray-500 px-2">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => goToPage(page as number)}
                  className={`min-w-[40px] h-10 px-3 rounded-lg font-medium transition-all ${
                    currentPage === page
                      ? 'bg-orange-500 text-black'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-orange-500/20 hover:border-orange-500/30'
                  }`}
                >
                  {page}
                </button>
              )
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-500/20 hover:border-orange-500/30 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Results Info */}
        <div className="mt-4 text-center text-gray-500 text-sm">
          Showing {startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} users
        </div>
      </div>
    </section>
  );
}
