import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Coins, RefreshCw } from "lucide-react";

const mechanics = [
  {
    id: "joker",
    title: "The Joker",
    description: "Each team receives a physical Joker card. Play it before any round to DOUBLE all points earned in that round. Use it wisely - you only get one!",
    icon: Sparkles,
    color: "text-purple-400",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/5",
  },
  {
    id: "gamble",
    title: "The Final Gamble",
    description: "The ultimate question. Wager any amount of your total points. Get it right and double your bet. Get it wrong and lose it all. High risk, high reward!",
    icon: Coins,
    color: "text-amber-400",
    borderColor: "border-amber-500/30",
    bgColor: "bg-amber-500/5",
  },
  {
    id: "swap",
    title: "Swap & Mark",
    description: "Industry-standard grading: Teams write answers on paper, then swap sheets with neighbors to check. Swap back to verify, then submit before the break.",
    icon: RefreshCw,
    color: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    bgColor: "bg-cyan-500/5",
  },
];

export default function MechanicsSection() {
  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <h2 
          className="font-heading text-4xl md:text-5xl text-center mb-4 tracking-wider"
          data-testid="text-mechanics-title"
        >
          SPECIAL MECHANICS
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          Unique twists that make our quiz night unforgettable
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {mechanics.map((mechanic) => (
            <Card 
              key={mechanic.id}
              className={`border ${mechanic.borderColor} ${mechanic.bgColor}`}
              data-testid={`card-mechanic-${mechanic.id}`}
            >
              <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                <div className={`w-16 h-16 rounded-full bg-background border ${mechanic.borderColor} flex items-center justify-center`}>
                  <mechanic.icon className={`w-8 h-8 ${mechanic.color}`} />
                </div>
                <h3 className={`font-heading text-2xl tracking-wide ${mechanic.color}`}>
                  {mechanic.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {mechanic.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
