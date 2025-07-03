import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { Building, User, Lock } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(username, password);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    
    try {
      await loginWithGoogle();
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleDemoLogin = async (demoUsername: string, demoPassword: string) => {
    setIsLoading(true);
    
    try {
      await login(demoUsername, demoPassword);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">SmartSpace</h1>
          <p className="text-slate-600 mt-2">Workplace Management System</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>
            <p className="text-sm text-slate-600">Sign in to your account</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 text-base" 
                disabled={isLoading || isGoogleLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">Or continue with</span>
                </div>
              </div>
            </div>

            {/* Google Sign-in */}
            <Button 
              type="button"
              variant="outline"
              className="w-full h-11 text-base"
              disabled={isLoading || isGoogleLoading}
              onClick={handleGoogleLogin}
            >
              {isGoogleLoading ? (
                "Connecting to Google..."
              ) : (
                <>
                  <FaGoogle className="w-5 h-5 mr-2 text-red-500" />
                  Sign in with Google
                </>
              )}
            </Button>

            {/* Demo Login Buttons */}
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <h4 className="text-sm font-medium text-slate-700 mb-3">Quick Demo Login:</h4>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs h-8"
                  disabled={isLoading || isGoogleLoading}
                  onClick={() => handleDemoLogin('admin', 'admin123')}
                >
                  {isLoading ? '...' : 'Admin'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs h-8"
                  disabled={isLoading || isGoogleLoading}
                  onClick={() => handleDemoLogin('john.doe', 'user123')}
                >
                  {isLoading ? '...' : 'User'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs h-8"
                  disabled={isLoading || isGoogleLoading}
                  onClick={() => handleDemoLogin('jane.smith', 'manager123')}
                >
                  {isLoading ? '...' : 'Manager'}
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">
                Click a button for instant demo login with that role
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-500">
          <p>© 2025 SmartSpace Dashboard v1.0</p>
          <p>Secure workplace management solution</p>
        </div>
      </div>
    </div>
  );
}