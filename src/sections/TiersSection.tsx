import { useState } from 'react';
import { ChevronDown, Users, Trophy, Medal, Award } from 'lucide-react';
import type { TierType, ProcessedUser } from '@/types';
import { TIER_CONFIGS, getTierColor } from '@/types';

interface TiersSectionProps {
  tierCounts: Record<TierType, number>;
  tierUsers: Record<TierType, ProcessedUser[]>;
  totalUsers: number;
}

export function TiersSection({ tierCounts, tierUsers, totalUsers }: TiersSectionProps) {
  const [expandedTier, setExpandedTier] = useState<TierType | null>(null);

  const toggleTier = (tier: TierType) => {
    setExpandedTier(expandedTier === tier ? null : tier);
  };

  // Get rank icon
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-4 h-4 rank-1" />;
    if (rank === 2) return <Medal className="w-4 h-4 rank-2" />;
    if (rank === 3) return <Award className="w-4 h-4 rank-3" />;
    return null;
  };

  // Calculate max count for bar scaling
  const maxCount = Math.max(...Object.values(tierCounts));

  return (
    <section id="tiers" className="section-container relative">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient-orange">Tier</span>{' '}
            <span className="text-white">System</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Advance through the tiers by earning Sunrays from DAWN events. Each tier unlocks new recognition and rewards.
          </p>
        </div>

        {/* Tier Distribution Bars */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-400" />
            Tier Distribution
          </h3>
          <div className="glass-card rounded-xl p-6">
            <div className="space-y-4">
              {TIER_CONFIGS.map((tier) => {
                const count = tierCounts[tier.name] || 0;
                const percentage = totalUsers > 0 ? (count / totalUsers) * 100 : 0;
                const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;

                return (
                  <div key={tier.name} className="flex items-center gap-4">
                    <div className="w-32 md:w-40 flex-shrink-0">
                      <span className="text-sm text-gray-300">{tier.name}</span>
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${barWidth}%`,
                            backgroundColor: getTierColor(tier.name),
                            boxShadow: `0 0 10px ${getTierColor(tier.name)}50`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-400 w-16 text-right">
                        {count}
                      </span>
                      <span className="text-xs text-gray-500 w-12 text-right">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIER_CONFIGS.map((tier) => {
            const count = tierCounts[tier.name] || 0;
            const isExpanded = expandedTier === tier.name;
            const users = tierUsers[tier.name] || [];

            return (
              <div
                key={tier.name}
                className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'md:col-span-2 lg:col-span-4' : ''
                }`}
              >
                {/* Card Header */}
                <div
                  onClick={() => toggleTier(tier.name)}
                  className="relative cursor-pointer group"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={tier.image}
                      alt={tier.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-2"
                          style={{
                            backgroundColor: `${getTierColor(tier.name)}30`,
                            color: getTierColor(tier.name),
                          }}
                        >
                          {tier.minSunrays}-{tier.maxSunrays === Infinity ? '+' : tier.maxSunrays} Sunrays
                        </span>
                        <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                        <p className="text-gray-400 text-sm">{tier.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: getTierColor(tier.name) }}>
                          {count}
                        </p>
                        <p className="text-gray-500 text-xs">holders</p>
                      </div>
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute top-4 right-4">
                    <ChevronDown
                      className={`w-6 h-6 text-white transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="p-4 border-t border-white/10 fade-in">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white">
                        {tier.name} Holders
                      </h4>
                      <span className="text-gray-400 text-sm">
                        {count} total
                      </span>
                    </div>

                    {users.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                        {users.map((user) => (
                          <div
                            key={user.username}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-orange-500/10 transition-colors"
                          >
                            <div className="w-8 flex justify-center">
                              {getRankIcon(user.globalRank) || (
                                <span className="text-gray-500 text-xs">#{user.globalRank}</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">
                                {user.username}
                              </p>
                              <p className="text-orange-400 text-xs">
                                {user.sunrays} Sunrays
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        No holders in this tier yet.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
