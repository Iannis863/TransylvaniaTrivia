import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, Mail, Phone, Calendar, ArrowLeft } from "lucide-react";

interface TeamRegistration {
  id: number;
  teamName: string;
  captainName: string;
  email: string;
  phoneNumber: string | null;
  memberCount: number;
  createdAt: string;
}

export default function Admin() {
  const { data: registrations, isLoading } = useQuery<TeamRegistration[]>({
    queryKey: ["/api/registrations"],
  });

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
          <>
            <p className="text-muted-foreground mb-6" data-testid="text-team-count">
              {registrations.length} team{registrations.length !== 1 ? "s" : ""} registered
            </p>
            <div className="space-y-4">
              {registrations.map((team) => (
                <Card key={team.id} className="border border-purple-500/30" data-testid={`card-team-${team.id}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-lg">{team.teamName}</span>
                      <span className="text-sm font-normal text-purple-400">
                        {team.memberCount} member{team.memberCount !== 1 ? "s" : ""}
                      </span>
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
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
