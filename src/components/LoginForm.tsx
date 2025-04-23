
import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

interface LoginFormData {
  username: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginFormData>();
  
  const onSubmit = (data: LoginFormData) => {
    // Hardcoded credentials as per requirements
    if (data.username === "admin" && data.password === "password") {
      onLogin(data.username, data.password);
    } else {
      setError("username", {
        type: "manual",
        message: "Invalid username or password"
      });
      setError("password", {
        type: "manual",
        message: "Invalid username or password"
      });
    }
  };
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Employee Login</CardTitle>
        <CardDescription>Enter your credentials to access the dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username"
              placeholder="Enter your username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>
          
          <CardFooter className="px-0">
            <Button type="submit" className="w-full">Login</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
