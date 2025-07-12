/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useUserDataContext } from "@/components/AuthProvider";
import LoadingGlobalTypeModal from "@/components/LoadingGlobalTypeModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  CircleUser,
  CreditCard,
  FileText,
  HelpCircle,
  LogOut,
  Settings,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function MeProfilePage() {
  // const { user } = useUserDataContext();

  // Mock user data
  const user = {
    name: "John Doe",
    nik: "3201234567890001",
    address: "123 Green Street, Eco City",
    phone: "+62 812-3456-7890",
    totalPoints: 495,
    memberSince: "January 2025",
    avatar: "/placeholder.svg?height=100&width=100",
  };

  const menuItems = [
    {
      icon: Award,
      label: "My Rewards",
      color: "text-emerald-500",
      bgColor: "bg-emerald-100",
    },
    {
      icon: CreditCard,
      label: "Payment Methods",
      color: "text-emerald-500",
      bgColor: "bg-emerald-100",
    },
    {
      icon: FileText,
      label: "Terms & Conditions",
      color: "text-emerald-500",
      bgColor: "bg-emerald-100",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      color: "text-emerald-500",
      bgColor: "bg-emerald-100",
    },
    {
      icon: Settings,
      label: "Settings",
      color: "text-emerald-500",
      bgColor: "bg-emerald-100",
    },
  ];
  return (
    // <>
    //   {!user ? (
    //     <LoadingGlobalTypeModal />
    //   ) : (
    //     <div className="px-4 flex flex-col pt-16 h-[calc(100dvh-100px)]">
    //       <div className="flex flex-col items-center gap-3 justify-center">
    //         <CircleUser className="h-16 w-16" />
    //         <h1 className="text-2xl">{user.name}</h1>
    //       </div>
    //       <div className="flex flex-col gap-4 mt-10">
    //         <div className="flex flex-col">
    //           <div className="text-xs font-medium">NIK</div>
    //           <div>{user.nik}</div>
    //         </div>
    //         <div className="flex flex-col">
    //           <div className="text-xs font-medium">Email</div>
    //           <div>{user.email}</div>
    //         </div>
    //       </div>
    //       <div className="grow content-end mx-auto">
    //         <Button
    //           onClick={() => {
    //             signOut();
    //           }}
    //           className="mt-16"
    //         >
    //           <LogOut />
    //           Keluar
    //         </Button>
    //       </div>
    //     </div>
    //   )}
    // </>
    <div className="p-4 pt-6">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">Profile</h1>

      <Card className="mb-6 overflow-hidden rounded-3xl border-none bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="mr-4 h-16 w-16 overflow-hidden rounded-full bg-emerald-100">
              <Image
                src={user.avatar || "/placeholder.svg"}
                alt="Profile"
                className="h-full w-full object-cover"
                width={20}
                height={20}
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-500">
                Member since {user.memberSince}
              </p>
              <div className="mt-1 flex items-center">
                <div className="mr-1 h-3 w-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs text-emerald-500">
                  {user.totalPoints} points
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6 space-y-3">
        {menuItems.map((item, index) => (
          <Card
            key={index}
            className="overflow-hidden rounded-2xl border-none shadow-sm"
          >
            <CardContent className="p-0">
              <button className="flex w-full items-center justify-between p-4">
                <div className="flex items-center">
                  <div
                    className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full ${item.bgColor}`}
                  >
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <span className="font-medium text-gray-800">
                    {item.label}
                  </span>
                </div>
                <div className="text-gray-400">›</div>
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        variant="outline"
        className="flex w-full items-center justify-center gap-2 rounded-full py-6 border-red-200 !bg-white text-red-500 hover:text-red-600"
        // onClick={onLogout}
        onClick={() => {
          signOut();
        }}
      >
        <LogOut className="h-5 w-5" />
        <span className="font-medium">Logout</span>
      </Button>
    </div>
  );
}
