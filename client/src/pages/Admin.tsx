import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, Mail, Phone, Calendar, ArrowLeft, Trash2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface TeamRegistration {
  id: number;
  teamName: string;
  captainName: string;
  email: string;
  phoneNumber: string | null;
  memberCount: number;
  createdAt: string;
}

function getNextTuesday(date: Date): Date {
  const result = new Date(date);
  const dayOfWeek = result.getDay();
  const daysUntilTuesday = dayOfWeek <= 2 ? 2 - dayOfWeek : 9 - dayOfWeek;
  result.setDate(result.getDate() + daysUntilTuesday);
  result.setHours(20, 0, 0, 0);
  return result;
}

function getEventTuesday(registrationDate: Date): Date {
  const regDate = new Date(registrationDate);
  const dayOfWeek = regDate.getDay();
  
  if (dayOfWeek === 2) {
    const eventTime = new Date(regDate);
    eventTime.setHours(20, 0, 0, 0);
    if (regDate < eventTime) {
      return eventTime;
    }
  }
  
  return getNextTuesday(regDate);
}

function formatEventDate(date: Date): string {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

function groupByEvent(registrations: TeamRegistration[]): Array<[string, TeamRegistration[]]> {
  const groups = new Map<string, TeamRegistration[]>();
  
  registrations.forEach(reg => {
    const eventDate = getEventTuesday(new Date(reg.createdAt));
    const key = eventDate.toISOString().split('T')[0];
    
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(reg);
  });
  
  const sortedGroups = Array.from(groups.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  
  return sortedGroups;
}

function TeamCard({ team }: { team: TeamRegistration }) {
  const { toast } = useToast();
  
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/registrations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/registrations"] });
      toast({
        title: "Team deleted",
        description: `${team.teamName} has been removed.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete team. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${team.teamName}?`)) {
      deleteMutation.mutate(String(team.id));
    }
  };

  return (
    <Card className="border border-purple-500/30" data-testid={`card-team-${team.id}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-lg">{team.teamName}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-normal text-purple-400">
              {team.memberCount} member{team.memberCount !== 1 ? "s" : ""}
            </span>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              data-testid={`button-delete-team-${team.id}`}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-cyan-400" />
          <span>Captain: {team.captainName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-cyan-400" />
          <span>{team.email}</span>
        </div>
        {team.phoneNumber && (
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-cyan-400" />
            <span>{team.phoneNumber}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Registered: {new Date(team.createdAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Admin() {
  const { data: registrations, isLoading } = useQuery<TeamRegistration[]>({
    queryKey: ["/api/registrations"],
  });

  const groupedRegistrations = registrations ? groupByEvent(registrations) : [];
  const upcomingTuesday = getNextTuesday(new Date());
  const upcomingKey = upcomingTuesday.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="icon" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 
            className="font-heading text-3xl md:text-4xl tracking-wider"
            data-testid="text-admin-title"
          >
            REGISTERED TEAMS
          </h1>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading registrations...
          </div>
        ) : !registrations || registrations.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No teams registered yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-12">
            {groupedRegistrations.map(([dateKey, teams]) => {
              const eventDate = new Date(dateKey + 'T20:00:00');
              const isUpcoming = dateKey >= upcomingKey;
              const isPast = dateKey < upcomingKey;
              
              return (
                <div key={dateKey} data-testid={`event-section-${dateKey}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className={`w-5 h-5 ${isUpcoming ? 'text-green-400' : 'text-muted-foreground'}`} />
                    <h2 className="font-heading text-xl tracking-wider">
                      {isUpcoming ? 'UPCOMING: ' : ''}{formatEventDate(eventDate)}
                    </h2>
                    {isUpcoming && (
                      <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/30">
                        This Week
                      </span>
                    )}
                    {isPast && (
                      <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                        Past Event
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {teams.length} team{teams.length !== 1 ? "s" : ""} registered
                  </p>
                  <div className="space-y-4">
                    {teams.map((team: TeamRegistration) => (
                      <TeamCard key={team.id} team={team} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
