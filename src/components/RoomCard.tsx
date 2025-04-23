
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RoomCardProps {
  type: "premium" | "standard";
  onSelect: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ type, onSelect }) => {
  const isPremium = type === "premium";
  
  return (
    <Card className={`w-full max-w-md ${isPremium ? "border-secondary border-2" : ""}`}>
      <CardHeader className={isPremium ? "bg-secondary/10" : ""}>
        <CardTitle className={`text-xl ${isPremium ? "text-secondary-foreground" : ""}`}>
          {isPremium ? "Premium Room" : "Standard Room"}
        </CardTitle>
        <CardDescription>
          {isPremium 
            ? "Luxury accommodation with premium amenities" 
            : "Comfortable stay at an affordable price"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-48 bg-gray-200 rounded-md mb-4 overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ 
              backgroundImage: `url(${isPremium 
                ? "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
                : "https://images.unsplash.com/photo-1631049552240-59c37f38802b?auto=format&fit=crop&w=800&q=80"})` 
            }}
          ></div>
        </div>
        <ul className="space-y-2">
          {isPremium ? (
            <>
              <li className="flex items-center gap-2">
                <span className="text-secondary">✓</span> King-size bed
              </li>
              <li className="flex items-center gap-2">
                <span className="text-secondary">✓</span> Ocean view
              </li>
              <li className="flex items-center gap-2">
                <span className="text-secondary">✓</span> Mini bar
              </li>
              <li className="flex items-center gap-2">
                <span className="text-secondary">✓</span> Room service
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Queen-size bed
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Garden view
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Free Wi-Fi
              </li>
            </>
          )}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          {isPremium ? "$199" : "$99"}<span className="text-sm text-muted-foreground"> /night</span>
        </div>
        <Button 
          onClick={onSelect}
          className={isPremium ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground" : ""}
        >
          Select Room
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
