import { cn } from "@/lib/utils";
import { useLocation } from "wouter";

export function BottomNav() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "Tips", path: "/tips" },
    { label: "Workflow", path: "/guides" },
    { label: "Favorites", path: "/favorites" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border/50">
      <div className="flex items-center justify-around h-12 px-1">
        {navItems.map((item) => {
          const isActive = 
            item.path === "/" 
              ? location === "/" 
              : location.startsWith(item.path);

          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              className={cn(
                "flex items-center justify-center flex-1 h-full text-xs font-medium transition-colors px-1",
                isActive 
                  ? "text-primary font-semibold" 
                  : "text-muted-foreground"
              )}
              aria-label={item.label}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
