import { Button } from "@/components/ui/button";
import { MessageCircle, Home, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-background to-brand-100 dark:from-background dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-200/20 dark:bg-brand-800/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-brand-300/20 dark:bg-brand-700/20 blur-3xl" />
      </div>

      <div className="text-center space-y-8 max-w-md mx-auto">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400">
            <MessageCircle className="h-12 w-12" />
            <span className="text-3xl font-bold">mChat</span>
          </div>
        </div>

        {/* 404 Content */}
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-muted-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Page not found
          </h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button asChild className="gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
