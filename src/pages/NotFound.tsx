import { Link } from "react-router-dom";
import { Home, MessageSquare } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        {/* 404 */}
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary 
                     text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            to="/chat"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-muted 
                     text-foreground rounded-lg font-medium hover:bg-muted/80 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            Start Chatting
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
