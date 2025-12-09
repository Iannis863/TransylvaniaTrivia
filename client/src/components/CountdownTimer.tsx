import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

function getNextTuesday(): Date {
  const now = new Date();
  const dayOfWeek = now.getDay();
  
  let daysUntilTuesday = (2 - dayOfWeek + 7) % 7;
  
  if (daysUntilTuesday === 0) {
    if (now.getHours() >= 20) {
      daysUntilTuesday = 7;
    }
  }
  
  if (daysUntilTuesday === 0 && dayOfWeek !== 2) {
    daysUntilTuesday = 7;
  }
  
  const nextTuesday = new Date(now);
  nextTuesday.setDate(now.getDate() + daysUntilTuesday);
  nextTuesday.setHours(20, 0, 0, 0);
  
  return nextTuesday;
}

function formatTimeUnit(value: number): string {
  return value.toString().padStart(2, "0");
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const nextQuizDate = getNextTuesday();
      const now = new Date();
      const difference = nextQuizDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 
          className="font-heading text-3xl md:text-4xl tracking-wider mb-2"
          data-testid="text-countdown-title"
        >
          NEXT QUIZ NIGHT
        </h2>
        <p className="text-muted-foreground mb-8">Every Tuesday at 20:00</p>
        
        <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-xl mx-auto">
          {timeUnits.map((unit) => (
            <Card 
              key={unit.label}
              className="border border-purple-500/30 bg-purple-500/5"
              data-testid={`card-countdown-${unit.label.toLowerCase()}`}
            >
              <CardContent className="p-3 md:p-6">
                <div className="font-heading text-3xl md:text-5xl text-purple-400">
                  {formatTimeUnit(unit.value)}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1 tracking-wider">
                  {unit.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
