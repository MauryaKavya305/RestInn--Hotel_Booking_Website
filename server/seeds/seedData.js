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
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107019/taj-1_dydw3h.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107019/taj-2_qpv71h.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107019/taj-3_emffpe.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107018/taj-4_n8sehn.png"
    ]
  },
  {
    name: "Oberoi Amarvilas",
    city: "Agra",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107018/ob-1_moos4r.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107018/ob-2_dchbzq.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107018/ob-3_bl7z4g.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107017/ob-4_f0cnaq.png"
    ]
  },
  {
    name: "Rambagh Palace",
    city: "Jaipur",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107017/ram-1_bl3ghq.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107016/ram-2_cxn9rk.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107018/ram-3_z7ijdh.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107016/ram-4_xtglcw.png"
    ]
  },
  {
    name: "ITC Grand Chola",
    city: "Chennai",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107015/chola-1_sstl19.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107016/chola-2_hrohvb.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107015/chola-3_fmhb92.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107014/chola-4_hcbmyk.png"
    ]
  },
  {
    name: "The Leela Palace",
    city: "Udaipur",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107016/leela-1_cqbqmr.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107016/leela-2_g3idxm.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107015/leela-3_cps64k.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107014/leela-4_njwyqh.png"
    ]
  },
  {
    name: "JW Marriott",
    city: "Bangalore",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107013/jw-1_at7gpm.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107014/jw-2_fsgqda.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107014/jw-3_z3dnjg.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781107013/jw-4_isxfgc.png"
    ]
  },
  {
    name: "Radisson Blu",
    city: "Goa",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781111134/blu-1_sx3sub.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781111132/blu-2_lxpd1u.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781111133/blu-3_fvvkwt.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781111133/blu-4_pl7qgp.png"
    ]
  },
  {
    name: "Park Hyatt",
    city: "Hyderabad",
    country: "India",
    image: "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781111132/park-1_mzx25x.png",
    gallery: [
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781111132/park-2_ddqpwb.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781111131/park-3_r1mio6.png",
      "https://res.cloudinary.com/dd1uk0uzo/image/upload/v1781111132/park-4_mreb1w.png"
    ]
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