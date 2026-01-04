import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Joystick, Coins, PartyPopper, Ticket, Trophy, RefreshCw } from "lucide-react";

const rules = [
  {
    number: 1,
    title: "No Phones",
    description: "Keep your devices away. This is a battle of wits, not Google skills!",
    icon: Smartphone,
  },
  {
    number: 2,
    title: "The Joker Card",
    description: "5 rounds with 10 questions each. Use your Joker Card before any round to DOUBLE the points for that round!",
    icon: Joystick,
  },
  {
    number: 3,
    title: "The Wager",
    description: "The final question is brutal. Bet any amount of your points - win big or lose it all!",
    icon: Coins,
  },
  {
    number: 4,
    title: "Swap & Mark",
    description: "Teams write answers on paper, then swap sheets with neighbors to check. Swap back to verify, then submit before the break.",
    icon: RefreshCw,
  },
  {
    number: 5,
    title: "Last Place Picks",
    description: "The team in last place gets to choose a theme round for next week!",
    icon: Trophy,
  },
  {
    number: 6,
    title: "Have Fun!",
    description: "This is all about having a great time with friends. Enjoy the competition!",
    icon: PartyPopper,
  },
];

export default function RulesSection() {
  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <h2 
          className="font-heading text-4xl md:text-5xl text-center mb-4 tracking-wider"
          data-testid="text-rules-title"
        >
          THE RULES
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
          Simple rules for maximum fun
        </p>
        
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-md bg-amber-500/10 border border-amber-500/30" data-testid="entry-fee-badge">
            <Ticket className="w-6 h-6 text-amber-400" />
            <span className="font-heading text-xl tracking-wide text-amber-400">ENTRY FEE: 10 LEI PER PERSON</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rules.map((rule) => (
            <Card 
              key={rule.number}
              className={`border border-border ${rule.number === 6 ? 'md:col-span-2' : ''}`}
              data-testid={`card-rule-${rule.number}`}
            >
              <CardContent className={`p-6 flex gap-5 ${rule.number === 6 ? 'justify-center' : ''}`}>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <span className="font-heading text-xl text-purple-400">{rule.number}</span>
                </div>
                <div className={rule.number === 6 ? '' : 'flex-1'}>
                  <div className="flex items-center gap-2 mb-2">
                    <rule.icon className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-heading text-xl tracking-wide">{rule.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">{rule.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
