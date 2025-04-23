import React, { useState } from "react";
import HotelLayout from "@/components/HotelLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import RoomCard from "@/components/RoomCard";
import BookingForm, { BookingFormData } from "@/components/BookingForm";
import LoginForm from "@/components/LoginForm";
import BookingTable, { mockBookings } from "@/components/BookingTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type Screen = 
  | "welcome"
  | "roomSelection" 
  | "bookingForm" 
  | "bookingConfirmation"
  | "employeeLogin"
  | "employeeDashboard";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [selectedRoomType, setSelectedRoomType] = useState<"premium" | "standard">("standard");
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [dashboardView, setDashboardView] = useState<"viewBookings" | "addBooking" | "manageRooms">("viewBookings");
  
  const handleRoleSelect = (role: "guest" | "employee") => {
    if (role === "guest") {
      setCurrentScreen("roomSelection");
    } else {
      setCurrentScreen("employeeLogin");
    }
  };
  
  const handleRoomSelect = (type: "premium" | "standard") => {
    setSelectedRoomType(type);
    setCurrentScreen("bookingForm");
  };
  
  const handleBookingSubmit = (data: BookingFormData) => {
    setBookingData(data);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setCurrentScreen("welcome");
    }, 3000);
  };
  
  const handleLogin = (username: string, password: string) => {
    setCurrentScreen("employeeDashboard");
  };
  
  const handleLogout = () => {
    setCurrentScreen("welcome");
  };
  
  const renderContent = () => {
    switch (currentScreen) {
      case "welcome":
        return (
          <div className="w-full max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 text-primary">Welcome to <span className="text-secondary">Stay</span>Easy</h1>
            <p className="text-lg mb-8">Please select how you would like to proceed:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Guest</CardTitle>
                  <CardDescription>Book a room for your stay</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-blue-50 rounded-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                      <circle cx="17" cy="7" r="5" />
                    </svg>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleRoleSelect("guest")} className="w-full">
                    Continue as Guest
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Employee</CardTitle>
                  <CardDescription>Access the management system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-blue-50 rounded-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleRoleSelect("employee")} className="w-full">
                    Login as Employee
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        );
        
      case "roomSelection":
        return (
          <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-center">Select Your Room</h2>
            <p className="text-center mb-8 text-muted-foreground">Choose the perfect room for your stay</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <RoomCard type="premium" onSelect={() => handleRoomSelect("premium")} />
              <RoomCard type="standard" onSelect={() => handleRoomSelect("standard")} />
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="outline" onClick={() => setCurrentScreen("welcome")}>Back to Welcome</Button>
            </div>
          </div>
        );
        
      case "bookingForm":
        return (
          <div className="w-full max-w-lg mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Book {selectedRoomType === "premium" ? "Premium" : "Standard"} Room
            </h2>
            
            <BookingForm roomType={selectedRoomType} onSubmit={handleBookingSubmit} />
            
            <div className="mt-4 text-center">
              <Button variant="outline" onClick={() => setCurrentScreen("roomSelection")}>Back to Room Selection</Button>
            </div>
          </div>
        );
        
      case "employeeLogin":
        return (
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Employee Login</h2>
            
            <LoginForm onLogin={handleLogin} />
            
            <div className="mt-4 text-center">
              <p className="mb-2 text-sm text-muted-foreground">Use: admin / password</p>
              <Button variant="outline" onClick={() => setCurrentScreen("welcome")}>Back to Welcome</Button>
            </div>
          </div>
        );
        
      case "employeeDashboard":
        return (
          <div className="w-full max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">### Hotel Management System UI Design</h2>
            <p className="text-muted-foreground mb-6">Welcome to the employee dashboard</p>
            
            <div className="bg-white shadow rounded-lg mb-6">
              <div className="flex border-b">
                <button 
                  className={`px-6 py-3 text-lg font-medium ${dashboardView === "viewBookings" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
                  onClick={() => setDashboardView("viewBookings")}
                >
                  View Bookings
                </button>
                <button 
                  className={`px-6 py-3 text-lg font-medium ${dashboardView === "addBooking" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
                  onClick={() => setDashboardView("addBooking")}
                >
                  Add Booking
                </button>
                <button 
                  className={`px-6 py-3 text-lg font-medium ${dashboardView === "manageRooms" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
                  onClick={() => setDashboardView("manageRooms")}
                >
                  Manage Rooms
                </button>
                <div className="flex-1"></div>
                <button 
                  className="px-6 py-3 text-lg font-medium text-destructive"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
              
              <div className="p-6">
                {dashboardView === "viewBookings" && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Current Bookings</h3>
                    <BookingTable bookings={mockBookings} />
                  </div>
                )}
                {dashboardView === "addBooking" && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">Add Booking Feature</h3>
                    <p className="text-muted-foreground mb-4">This feature is optional and can be implemented later.</p>
                  </div>
                )}
                {dashboardView === "manageRooms" && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">Manage Rooms Feature</h3>
                    <p className="text-muted-foreground mb-4">This feature is optional and can be implemented later.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Unknown screen</div>;
    }
  };
  
  return (
    <HotelLayout>
      {renderContent()}
      
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Confirmed!</DialogTitle>
            <DialogDescription>
              Your booking has been confirmed successfully.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-green-50 rounded-md border border-green-200 mb-4">
            <p className="text-green-800">
              Thank you, {bookingData?.fullName || "Guest"}! Your {selectedRoomType} room is booked from{" "}
              {bookingData?.checkInDate?.toLocaleDateString() || "check-in date"} to{" "}
              {bookingData?.checkOutDate?.toLocaleDateString() || "check-out date"}.
            </p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowConfirmation(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </HotelLayout>
  );
};

export default Index;
