
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for bookings
export const mockBookings = [
  {
    id: "B001",
    guestName: "Jane Doe",
    roomType: "Premium",
    checkIn: "2025-05-01",
    checkOut: "2025-05-05",
    status: "Confirmed"
  },
  {
    id: "B002",
    guestName: "John Smith",
    roomType: "Standard",
    checkIn: "2025-05-02",
    checkOut: "2025-05-04",
    status: "Confirmed"
  },
  {
    id: "B003",
    guestName: "Alice Johnson",
    roomType: "Premium",
    checkIn: "2025-05-05",
    checkOut: "2025-05-10",
    status: "Pending"
  },
  {
    id: "B004",
    guestName: "Bob Brown",
    roomType: "Standard",
    checkIn: "2025-05-06",
    checkOut: "2025-05-08",
    status: "Confirmed"
  },
  {
    id: "B005",
    guestName: "Emma Wilson",
    roomType: "Premium",
    checkIn: "2025-05-07",
    checkOut: "2025-05-12",
    status: "Confirmed"
  }
];

interface BookingTableProps {
  bookings: typeof mockBookings;
}

const BookingTable: React.FC<BookingTableProps> = ({ bookings }) => {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Guest Name</TableHead>
            <TableHead>Room Type</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.id}</TableCell>
              <TableCell>{booking.guestName}</TableCell>
              <TableCell>{booking.roomType}</TableCell>
              <TableCell>{booking.checkIn}</TableCell>
              <TableCell>{booking.checkOut}</TableCell>
              <TableCell>
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                  booking.status === "Confirmed" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {booking.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingTable;
