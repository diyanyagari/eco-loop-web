import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    success: true,
    message: "Categories retrieved successfully",
    offset: 0,
    totalItems: 2,
    itemsPerPage: 10,
    data: [
      {
        id: 1,
        name: "Plastic",
        points: 25,
        icon: "bottle", // or use "Recycle" if using Lucide icons
        active: true,
        description:
          "Plastic materials like bottles, containers, and packaging.",
        created_at: "2025-03-15T16:33:12.230Z",
      },
      {
        id: 2,
        name: "Paper",
        points: 20,
        icon: "file-text",
        active: true,
        description:
          "Paper waste such as newspapers, magazines, and office paper.",
        created_at: "2025-03-15T16:33:12.230Z",
      },
      {
        id: 3,
        name: "Glass",
        points: 30,
        icon: "glass", // custom icon or asset path
        active: true,
        description: "Glass items like bottles, jars, and broken glass.",
        created_at: "2025-03-15T16:33:12.230Z",
      },
      {
        id: 4,
        name: "Metal",
        points: 35,
        icon: "metal", // custom icon or use something like "shield" from Lucide
        active: true,
        description: "Aluminum, steel, and other recyclable metal waste.",
        created_at: "2025-03-15T16:33:12.230Z",
      },
      {
        id: 5,
        name: "Electronics",
        points: 50,
        icon: "cpu",
        active: true,
        description:
          "Electronic waste including phones, chargers, and small gadgets.",
        created_at: "2025-03-15T16:33:12.230Z",
      },
    ],
  });
}
