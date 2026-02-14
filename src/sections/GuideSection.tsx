import { Sun, Gamepad2, Brain, Swords, MessageSquare, Star, Twitter, Music, Puzzle, Trophy } from 'lucide-react';

interface EventType {
  icon: React.ReactNode;
  name: string;
  description: string;
  sunrays: string;
}

const eventTypes: EventType[] = [
  {
    icon: <Swords className="w-6 h-6" />,
    name: "Rumble Royale",
    description: "Battle it out in the arena and climb to the top of the leaderboard.",
    sunrays: "1 Sunray per win"
  },
  {
    icon: <Gamepad2 className="w-6 h-6" />,
    name: "Poker Tournaments",
    description: "Show your card skills in weekly poker tournaments.",
    sunrays: "1 Sunray for Top 20"
  },
  {
    icon: <Brain className="w-6 h-6" />,
    name: "Chess Competitions",
    description: "Strategic battles for the chess masters in the community.",
    sunrays: "1 Sunray for Top 10"
  },
  {
    icon: <Puzzle className="w-6 h-6" />,
    name: "Quizzes & Puzzles",
    description: "Test your knowledge with DAWN and crypto-themed quizzes.",
    sunrays: "1 Sunray for Top 10"
  },
  {
    icon: <Twitter className="w-6 h-6" />,
    name: "X Signal Sprint",
    description: "Engage with DAWN on X/Twitter and complete sprint challenges.",
    sunrays: "1 Sunray per sprint"
  },
  {
    icon: <Music className="w-6 h-6" />,
    name: "Karaoke Nights",
    description: "Show off your vocal talents in community karaoke events.",
    sunrays: "1 Sunray for winners"
  },
  {
    icon: <Gamepad2 className="w-6 h-6" />,
    name: "Tetris & Gartic",
    description: "Casual gaming competitions for quick fun and rewards.",
    sunrays: "1 Sunray for Top 5"
  },
  {
    icon: <Star className="w-6 h-6" />,
    name: "Community MVP",
    description: "Recognized for outstanding contributions to the community.",
    sunrays: "1 Sunray per recognition"
  },
];

const tierBenefits = [
  {
    tier: "Dawn Ascendant",
    sunrays: "35+",
    benefits: ["Elite community status", "Exclusive NFT rewards", "Priority access to events", "Direct team communication"]
  },
  {
    tier: "Solar Sentinel",
    sunrays: "30-34",
    benefits: ["Guardian recognition", "Special Discord role", "Early access to features", "Monthly rewards"]
  },
  {
    tier: "Keeper of the Flame",
    sunrays: "25-29",
    benefits: ["Respected member status", "Tier-specific channels", "Bonus event entries", "Community highlights"]
  },
  {
    tier: "Luminary",
    sunrays: "20-24",
    benefits: ["Shining member badge", "Increased visibility", "Event priority", "Special giveaways"]
  },
];

export function GuideSection() {
  return (
    <section id="guide" className="section-container relative">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient-orange">How to Earn</span>{' '}
            <span className="text-white">Sunrays</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Participate in DAWN events and activities to earn Sunrays. The more you engage, the higher you climb!
          </p>
        </div>

        {/* Event Types Grid */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Sun className="w-5 h-5 text-orange-400" />
            Event Types
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {eventTypes.map((event) => (
              <div
                key={event.name}
                className="glass-card rounded-xl p-5 hover:bg-orange-500/10 transition-all duration-300 group"
              >
                <div className="text-orange-400 mb-3 group-hover:scale-110 transition-transform">
                  {event.icon}
                </div>
                <h4 className="text-white font-semibold mb-2">{event.name}</h4>
                <p className="text-gray-400 text-sm mb-3">{event.description}</p>
                <span className="inline-block px-2 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium">
                  {event.sunrays}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tier Benefits */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-orange-400" />
            Tier Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tierBenefits.map((tier) => (
              <div
                key={tier.tier}
                className="glass-card rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-semibold">{tier.tier}</h4>
                  <span className="px-2 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium">
                    {tier.sunrays} Sunrays
                  </span>
                </div>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-400 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Getting Started CTA */}
        <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/10" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Earning?
            </h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Join the DAWN Discord community to participate in events, track your progress, and climb the tiers!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://discord.gg/dawn"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Join DAWN Discord
              </a>
              <a
                href="https://x.com/DAWN"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2"
              >
                <Twitter className="w-5 h-5" />
                Follow on X
              </a>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
              <Sun className="w-6 h-6 text-orange-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Participate Regularly</h4>
            <p className="text-gray-400 text-sm">
              Join weekly events consistently to build up your Sunrays over time.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-orange-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Engage with Community</h4>
            <p className="text-gray-400 text-sm">
              Active community members can earn MVP recognition and bonus Sunrays.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6 text-orange-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Climb the Tiers</h4>
            <p className="text-gray-400 text-sm">
              Higher tiers unlock exclusive benefits and recognition in the community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
