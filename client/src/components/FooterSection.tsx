import { MapPin, Clock, Users } from "lucide-react";
import { SiInstagram, SiTiktok, SiFacebook } from "react-icons/si";
import { Button } from "@/components/ui/button";

export default function FooterSection() {
  return (
    <footer className="py-16 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 
              className="font-heading text-2xl tracking-wider mb-6 text-purple-400"
              data-testid="text-venue-title"
            >
              VENUE
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Insomnia Restaurant</p>
                  <p className="text-muted-foreground text-sm">Strada Universitatii nr 2</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Every Tuesday at 20:00</p>
                  <p className="text-muted-foreground text-sm">Don't be late - the quiz starts on time!</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Team Size: Max 5 People</p>
                  <p className="text-muted-foreground text-sm">Gather your smartest friends!</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 
              className="font-heading text-2xl tracking-wider mb-6 text-purple-400"
              data-testid="text-connect-title"
            >
              FOLLOW US
            </h3>
            <p className="text-muted-foreground mb-6">
              Follow us for quiz night announcements, teasers, and behind-the-scenes fun!
            </p>
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://www.instagram.com/transylvaniatrivia/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="gap-2"
                  data-testid="button-instagram"
                >
                  <SiInstagram className="w-5 h-5" />
                  Instagram
                </Button>
              </a>
              <a 
                href="https://www.tiktok.com/@transylvaniatrivia" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="gap-2"
                  data-testid="button-tiktok"
                >
                  <SiTiktok className="w-5 h-5" />
                  TikTok
                </Button>
              </a>
              <a 
                href="https://www.facebook.com/share/1AXKd9KwTt/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="gap-2"
                  data-testid="button-facebook"
                >
                  <SiFacebook className="w-5 h-5" />
                  Facebook
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            TransylvaniaTrivia at Insomnia Restaurant
          </p>
        </div>
      </div>
    </footer>
  );
}
