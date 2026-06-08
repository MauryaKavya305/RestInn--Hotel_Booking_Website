import dotenv from "dotenv";
import connectDB from "../configs/db.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

dotenv.config();

const OWNER_ID = "user_3C4szwK2zTNy0x9f5UTUC89565k";

const hotels = [
  {
    name: "The Taj Mahal Palace",
    city: "Mumbai",
    country: "India",
  },
  {
    name: "Oberoi Amarvilas",
    city: "Agra",
    country: "India",
  },
  {
    name: "Rambagh Palace",
    city: "Jaipur",
    country: "India",
  },
  {
    name: "ITC Grand Chola",
    city: "Chennai",
    country: "India",
  },
  {
    name: "The Leela Palace",
    city: "Udaipur",
    country: "India",
  },
  {
    name: "JW Marriott",
    city: "Bangalore",
    country: "India",
  },
  {
    name: "Radisson Blu",
    city: "Goa",
    country: "India",
  },
  {
    name: "Park Hyatt",
    city: "Hyderabad",
    country: "India",
  },
  {
    name: "Zostel",
    city: "Manali",
    country: "India",
  },
  {
    name: "Evolve Back",
    city: "Coorg",
    country: "India",
  },
  {
    name: "Taj Falaknuma Palace",
    city: "Hyderabad",
    country: "India",
  },
  {
    name: "The Leela Palace New Delhi",
    city: "New Delhi",
    country: "India",
  },
  {
    name: "ITC Maurya",
    city: "New Delhi",
    country: "India",
  },
  {
    name: "The Lalit Mumbai",
    city: "Mumbai",
    country: "India",
  },
  {
    name: "Taj Lake Palace",
    city: "Udaipur",
    country: "India",
  },
  {
    name: "Wildflower Hall",
    city: "Shimla",
    country: "India",
  },
  {
    name: "Taj Bekal Resort & Spa",
    city: "Kerala",
    country: "India",
  },
  {
    name: "Grand Hyatt Goa",
    city: "Goa",
    country: "India",
  },
  {
    name: "Taj Coromandel",
    city: "Chennai",
    country: "India",
  },
  {
    name: "Hyatt Regency",
    city: "New Delhi",
    country: "India",
  },
  {
    name: "The Park Kolkata",
    city: "Kolkata",
    country: "India",
  },
  {
    name: "Novotel Imagica",
    city: "Khopoli",
    country: "India",
  },
  {
    name: "Radisson Blu Plaza",
    city: "New Delhi",
    country: "India",
  },
  {
    name: "Taj Bengal",
    city: "Kolkata",
    country: "India",
  },
  {
    name: "The Oberoi Gurgaon",
    city: "Gurgaon",
    country: "India",
  },
  {
    name: "The Westin Pune",
    city: "Pune",
    country: "India",
  },
  {
    name: "Taj MG Road",
    city: "Bangalore",
    country: "India",
  },
  {
    name: "The Claridges",
    city: "New Delhi",
    country: "India",
  },
  {
    name: "Taj Aravali Resort",
    city: "Udaipur",
    country: "India",
  },
  {
    name: "The Leela Kovalam",
    city: "Kerala",
    country: "India",
  },
  {
    name: "Vivanta Dal View",
    city: "Srinagar",
    country: "India",
  },
  {
    name: "Mayfair Lagoon",
    city: "Bhubaneswar",
    country: "India",
  },
  {
    name: "Taj Fisherman's Cove",
    city: "Chennai",
    country: "India",
  },
  {
    name: "The Oberoi Mumbai",
    city: "Mumbai",
    country: "India",
  },
  {
    name: "ITC Gardenia",
    city: "Bangalore",
    country: "India",
  },
  {
    name: "Neemrana Fort Palace",
    city: "Neemrana",
    country: "India",
  },
  {
    name: "The Khyber Himalayan Resort",
    city: "Gulmarg",
    country: "India",
  },
  {
    name: "Taj Rishikesh Resort",
    city: "Rishikesh",
    country: "India",
  },
  {
    name: "Fairmont Jaipur",
    city: "Jaipur",
    country: "India",
  },
  {
    name: "Grand Hyatt Kochi",
    city: "Kochi",
    country: "India",
  },
];

const seedData = async () => {
  try {
    await connectDB();
  // console.log(`Hotels to create: ${hotels.length}`);

    console.log("Connected to MongoDB");

    // DELETE AFTER CONNECTION
    await Room.deleteMany({});
    await Hotel.deleteMany({});

    console.log("Old data removed");

    for (const hotelData of hotels) {

      const hotel = await Hotel.create({
        ...hotelData,
        contact: "+91-9999999999",
        owner: OWNER_ID,
      });

      const basePrice = Math.floor(Math.random() * 6000) + 2500;

      await Room.create([
        {
          hotel: hotel._id,
          roomType: "Standard Room",
          pricePerNight: basePrice,
          amenities: ["WiFi", "AC", "TV"],
          images: [],
        },
        {
          hotel: hotel._id,
          roomType: "Deluxe Room",
          pricePerNight: basePrice + 3000,
          amenities: ["WiFi", "AC", "TV", "Breakfast"],
          images: [],
        },
        {
          hotel: hotel._id,
          roomType: "Executive Suite",
          pricePerNight: basePrice + 6000,
          amenities: ["WiFi", "AC", "TV", "Breakfast", "Pool", "Spa"],
          images: [],
        },
      ]);

      console.log(`Created: ${hotel.name}`);
    }

    console.log("Seeding completed successfully");
    process.exit(0);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// await Room.deleteMany({});
// await Hotel.deleteMany({});

seedData();