import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { MessageCircle, Sparkles, Shield, Zap } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-background to-brand-100 dark:from-background dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-200/20 dark:bg-brand-800/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-brand-300/20 dark:bg-brand-700/20 blur-3xl" />
      </div>

      {/* Theme switcher */}
      {/* #160C2B */}
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>

      {/* Main content */}
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400">
              <MessageCircle className="h-8 w-8" />
              <span className="text-2xl font-bold">mChat</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Intelligent conversations,{" "}
              <span className="gradient-text">reimagined</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-muted-foreground max-w-lg max-lg:mx-auto">
              Experience the future of AI-powered conversations with our
              advanced chatbot platform. Secure, intuitive, and designed for
              modern workflows.
            </p>
          </div>
{/* done */}
       
        </div>

        {/* Right side - Auth form */}
        <div className="flex justify-center lg:justify-end">
          {isLogin ? (
            <LoginForm onToggleMode={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleMode={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
}
