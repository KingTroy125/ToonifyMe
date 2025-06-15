import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FormEvent, useState } from "react"
import { toast } from "@/components/ui/use-toast"

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  isSignUp?: boolean;
}

export function LoginForm({
  className,
  isSignUp = false,
  ...props
}: LoginFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get the redirect path from location state or default to home
  const from = location.state?.from?.pathname || "/";
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login/signup process
    setTimeout(() => {
      // For demo purposes, create a simple token
      const token = `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      
      // Store token in localStorage
      localStorage.setItem("toonifyMe_userToken", token);
      
      // Store user info
      localStorage.setItem("toonifyMe_userInfo", JSON.stringify({
        email,
        name: isSignUp ? (document.getElementById('name') as HTMLInputElement)?.value : "User",
        isActive: true,
        createdAt: new Date().toISOString()
      }));
      
      setIsLoading(false);
      
      // Show success message
      toast({
        title: isSignUp ? "Account created!" : "Welcome back!",
        description: isSignUp 
          ? "Your account has been created and you are now logged in."
          : "You have successfully logged in.",
      });
      
      // Redirect to the page they tried to visit or style selection if it was a direct login
      if (isSignUp) {
        navigate('/style-selection');
      } else {
        navigate(from === '/' ? '/style-selection' : from);
      }
    }, 1500);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          {isSignUp ? "Create an account" : "Welcome back"}
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          {isSignUp ? "Sign up with your Apple or Google account" : "Login with your Apple or Google account"}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <div className="flex flex-col gap-4">
            <Button type="button" variant="outline" className="w-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-5 w-5">
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              {isSignUp ? "Sign up with Apple" : "Login with Apple"}
            </Button>
            <Button type="button" variant="outline" className="w-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-5 w-5">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              {isSignUp ? "Sign up with Google" : "Login with Google"}
            </Button>
          </div>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-white px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-visible:ring-black"
              />
            </div>
            {isSignUp && (
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="focus-visible:ring-black"
                />
              </div>
            )}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {!isSignUp && (
                  <Link
                    to="/forgot-password"
                    className="ml-auto text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    Forgot your password?
                  </Link>
                )}
              </div>
              <Input 
                id="password" 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus-visible:ring-black"
              />
            </div>
            {isSignUp && (
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  required 
                  className="focus-visible:ring-black"
                />
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isSignUp ? "Signing up..." : "Logging in..."}
                </span>
              ) : (
                <>{isSignUp ? "Sign up" : "Login"}</>
              )}
            </Button>
          </div>
          <div className="text-center text-sm text-gray-600">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <Link to="/login" className="text-black hover:underline font-medium">
                  Login
                </Link>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-black hover:underline font-medium">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </form>
      <div className="text-center text-xs text-gray-500">
        By clicking continue, you agree to our{" "}
        <Link to="/terms" className="text-gray-700 hover:text-black transition-colors">Terms of Service</Link>{" "}
        and{" "}
        <Link to="/privacy" className="text-gray-700 hover:text-black transition-colors">Privacy Policy</Link>.
      </div>
    </div>
  )
}
