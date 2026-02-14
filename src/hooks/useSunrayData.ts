import { useState, useEffect, useMemo } from 'react';
import type { 
  LeaderboardEntry, 
  SunrayRecord, 
  ProcessedUser, 
  TierType, 
  WeeklyWinnersData,
  EventCategory
} from '@/types';
import { calculateTier } from '@/types';

interface UseSunrayDataReturn {
  users: ProcessedUser[];
  weeklyWinners: WeeklyWinnersData;
  availableWeeks: string[];
  tierCounts: Record<TierType, number>;
  tierUsers: Record<TierType, ProcessedUser[]>;
  totalUsers: number;
  isLoading: boolean;
  error: string | null;
}

export function useSunrayData(): UseSunrayDataReturn {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [allSunraysData, setAllSunraysData] = useState<SunrayRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch both JSON files
        const [leaderboardRes, allSunraysRes] = await Promise.all([
          fetch('/assets/leaderboard.json'),
          fetch('/assets/all_sunrays.json')
        ]);

        if (!leaderboardRes.ok || !allSunraysRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const leaderboard = await leaderboardRes.json();
        const allSunrays = await allSunraysRes.json();

        setLeaderboardData(leaderboard);
        setAllSunraysData(allSunrays);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Process users with global ranks and tiers
  const processedUsers = useMemo((): ProcessedUser[] => {
    if (!leaderboardData.length) return [];

    // Sort by sunrays descending and assign global ranks
    const sorted = [...leaderboardData]
      .sort((a, b) => b['Sun Rays'] - a['Sun Rays'])
      .map((entry, index) => ({
        username: entry['Discord Name'],
        sunrays: entry['Sun Rays'],
        tier: calculateTier(entry['Sun Rays']),
        globalRank: index + 1
      }));

    return sorted;
  }, [leaderboardData]);

  // Organize weekly winners by date
  const weeklyWinners = useMemo((): WeeklyWinnersData => {
    if (!allSunraysData.length) return {};

    const grouped: WeeklyWinnersData = {};
    
    allSunraysData.forEach(record => {
      const date = record.Date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(record);
    });

    return grouped;
  }, [allSunraysData]);

  // Get available weeks sorted (newest first)
  const availableWeeks = useMemo((): string[] => {
    const weeks = Object.keys(weeklyWinners);
    // Sort by date (newest first)
    return weeks.sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB.getTime() - dateA.getTime();
    });
  }, [weeklyWinners]);

  // Calculate tier counts
  const tierCounts = useMemo((): Record<TierType, number> => {
    const counts: Record<string, number> = {
      "Dawn Ascendant": 0,
      "Solar Sentinel": 0,
      "Keeper of the Flame": 0,
      "Luminary": 0,
      "Architect": 0,
      "Beacon": 0,
      "Trailblazer": 0,
      "Newcomer": 0,
    };

    processedUsers.forEach(user => {
      counts[user.tier] = (counts[user.tier] || 0) + 1;
    });

    return counts as Record<TierType, number>;
  }, [processedUsers]);

  // Group users by tier
  const tierUsers = useMemo((): Record<TierType, ProcessedUser[]> => {
    const grouped: Record<string, ProcessedUser[]> = {
      "Dawn Ascendant": [],
      "Solar Sentinel": [],
      "Keeper of the Flame": [],
      "Luminary": [],
      "Architect": [],
      "Beacon": [],
      "Trailblazer": [],
      "Newcomer": [],
    };

    processedUsers.forEach(user => {
      if (!grouped[user.tier]) {
        grouped[user.tier] = [];
      }
      grouped[user.tier].push(user);
    });

    return grouped as Record<TierType, ProcessedUser[]>;
  }, [processedUsers]);

  return {
    users: processedUsers,
    weeklyWinners,
    availableWeeks,
    tierCounts,
    tierUsers,
    totalUsers: processedUsers.length,
    isLoading,
    error
  };
}

// Helper function to group weekly winners by event type
export function groupWinnersByEventType(winners: SunrayRecord[]): EventCategory[] {
  const grouped: Record<string, SunrayRecord[]> = {};
  
  winners.forEach(winner => {
    const eventType = winner.Type;
    if (!grouped[eventType]) {
      grouped[eventType] = [];
    }
    grouped[eventType].push(winner);
  });

  return Object.entries(grouped)
    .map(([name, winners]) => ({ name, winners }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Helper function to get unique winners count
export function getUniqueWinnersCount(winners: SunrayRecord[]): number {
  const uniqueNames = new Set(winners.map(w => w['Discord Name']));
  return uniqueNames.size;
}
