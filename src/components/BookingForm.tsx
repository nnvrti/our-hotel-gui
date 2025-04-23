
import React from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

interface BookingFormProps {
  roomType: "premium" | "standard";
  onSubmit: (data: BookingFormData) => void;
}

export interface BookingFormData {
  fullName: string;
  idNumber: string;
  phoneNumber: string;
  checkInDate: Date;
  checkOutDate: Date;
}

const BookingForm: React.FC<BookingFormProps> = ({ roomType, onSubmit }) => {
  const isPremium = roomType === "premium";
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<BookingFormData>();
  const checkInDate = watch("checkInDate");
  const checkOutDate = watch("checkOutDate");
  
  const onFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });
  
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className={`${isPremium ? "text-secondary-foreground" : ""}`}>
          Book Your {isPremium ? "Premium" : "Standard"} Room
        </CardTitle>
        <CardDescription>
          Please fill in your details to complete the booking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input 
              id="fullName"
              placeholder="Enter your full name"
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="idNumber">ID/Passport Number</Label>
            <Input 
              id="idNumber"
              placeholder="Enter your ID or passport number"
              {...register("idNumber", { required: "ID/Passport number is required" })}
            />
            {errors.idNumber && <p className="text-sm text-destructive">{errors.idNumber.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input 
              id="phoneNumber"
              placeholder="Enter your phone number"
              {...register("phoneNumber", { required: "Phone number is required" })}
            />
            {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Check-in Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkInDate ? format(checkInDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={(date) => setValue("checkInDate", date as Date)}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Check-out Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOutDate ? format(checkOutDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={(date) => setValue("checkOutDate", date as Date)}
                    disabled={(date) => date < (checkInDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <CardFooter className="px-0 pt-4">
            <Button 
              type="submit" 
              className={`w-full ${isPremium ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground" : ""}`}
            >
              Confirm Booking
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
