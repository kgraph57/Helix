import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Category from "@/pages/Category";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import PromptDetail from "./pages/PromptDetail";
import Guides from "./pages/Guides";
import GuideDetail from "./pages/GuideDetail";
import Legal from "./pages/Legal";
import Favorites from "./pages/Favorites";
import JournalFinderPage from "@/pages/JournalFinderPage";
import JournalDetail from "@/pages/JournalDetail";
import JournalCompare from "@/pages/JournalCompare";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function Router() {
  return (
    <WouterRouter hook={useHashLocation}>
      <Switch>
      <Route path="/" component={Home} />
      <Route path="" component={Home} />
      <Route path="/category/:id" component={Category} />
     <Route path={"/prompts/:id"} component={PromptDetail} />
      <Route path={"/guides"} component={Guides} />
      <Route path={"/guides/:id"} component={GuideDetail} />
      <Route path="/legal" component={Legal} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/journal-finder" component={JournalFinderPage} />
      <Route path="/journal/:id" component={JournalDetail} />
      <Route path="/journal-compare" component={JournalCompare} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster position="top-center" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
