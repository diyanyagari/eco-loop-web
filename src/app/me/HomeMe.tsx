/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SvgShimmer } from "@/shared/components/SvgComponents";
import { Leaf, X, Check } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";
import SectionActivity from "./homepageComponents/SectionActivity";
import SectionCategories from "./homepageComponents/SectionCategories";

const SectionTrashScanner = dynamic(
  () => import("./homepageComponents/SectionTrashScanner"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[260px] w-full bg-white mb-6 flex flex-col gap-6 border py-6 rounded-3xl shadow-sm">
        <div className="p-6">
          <SvgShimmer className="w-full mb-4 h-6 rounded-lg" />
          <SvgShimmer className="w-full mb-6 h-12 rounded-lg" />
          <SvgShimmer className="w-full h-10 rounded-lg" />
        </div>
      </div>
    ),
  }
);

export default function MeHomePage() {
  const [scanStatus, setScanStatus] = React.useState<
    null | "success" | "failed"
  >(null);

  return (
    <div className="relative">
      <div className="fixed left-0 bg-emerald-50 top-0 w-full mb-4 flex items-center justify-center">
        <div className="max-w-sm w-full p-4 pt-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">EcoRecycle</h1>
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
              <Leaf className="h-4 w-4 text-emerald-500" />
            </div>
            <span className="font-medium text-emerald-500">495 pts</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4 pt-20">
        {/* <div className="w-full mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">EcoRecycle</h1>
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
              <Leaf className="h-4 w-4 text-emerald-500" />
            </div>
            <span className="font-medium text-emerald-500">495 pts</span>
          </div>
        </div> */}
        <SectionCategories />

        <SectionTrashScanner />

        {scanStatus && (
          <Card
            className={`mb-6 overflow-hidden rounded-3xl border-none ${
              scanStatus === "success" ? "bg-green-50" : "bg-red-50"
            } shadow-sm`}
          >
            <CardContent className="p-6">
              <div className="flex items-center">
                <div
                  className={`mr-4 flex h-12 w-12 items-center justify-center rounded-full ${
                    scanStatus === "success" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {scanStatus === "success" ? (
                    <Check className="h-6 w-6 text-green-500" />
                  ) : (
                    <X className="h-6 w-6 text-red-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    {scanStatus === "success" ? "Success!" : "Failed!"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {scanStatus === "success"
                      ? "Your recycling deposit has been recorded successfully."
                      : "Unable to scan QR code. Please try again."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <SectionActivity />
      </div>
    </div>
  );
}
