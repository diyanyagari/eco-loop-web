/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useUserDataContext } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { createData, fetchData } from "@/lib/api-helper";
import { Bank } from "@/types/bank";
import React from "react";
import { toast } from "sonner";
import QRScanner from "./QRScanner";
import { useSession } from "next-auth/react";

export default function MeHomePage() {
  const [resultQR, setResultQR] = React.useState<Bank | null>(null);
  const [isValidQR, setIsValidQR] = React.useState<boolean>(false);
  const [dataBank, setDataBank] = React.useState<Bank>();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [dataWeight, setDataWeight] = React.useState<number>(1.0);
  const { setGLoading, user } = useUserDataContext();

  const submitTransactionData = async () => {
    setGLoading(true);
    try {
      const payload = {
        userId: user.id,
        locationId: dataBank?.id,
        weight: dataWeight,
      };
      const response = await createData(`/transactions`, payload);
      if (!response.success || !response.data || response.data.length === 0) {
        toast.warning("Bank sampah tidak ditemukan", {
          position: "top-center",
        });
        throw new Error("Gagal mengambil data bank - Data tidak ditemukan");
      }

      closeDrawer();
    } catch (err) {
      console.error((err as Error).message);
      toast.error("Terjadi Kesalahan", {
        position: "top-center",
      });
    } finally {
      setGLoading(false);
    }
  };

  const fetchBankData = async (qrId: string) => {
    setGLoading(true);
    try {
      const response = await fetchData(`/bank-location/${qrId}`);
      if (!response.success || !response.data || response.data.length === 0) {
        throw new Error("Gagal mengambil data bank - Data tidak ditemukan");
      }

      const bankData: Bank = response.data[0];
      setDataBank(bankData);
      setIsValidQR(true);
      setIsDrawerOpen(true);
    } catch (err) {
      console.error((err as Error).message);
    } finally {
      setGLoading(false);
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setDataBank(undefined);
    setIsValidQR(false);
    setResultQR(null);
  };

  const increaseWeight = () => {
    if (dataWeight < 4.9) {
      setDataWeight((prev) => prev + 0.1);
    }
  };

  const decreaseWeight = () => {
    if (dataWeight > 0.1) {
      setDataWeight((prev) => prev - 0.1);
    }
  };

  const setWeightByNumber = (value: number) => {
    setDataWeight((prev) => {
      const decimalPart = prev % 1;
      const count = value + decimalPart;
      if (count > 5.0) return 5.0;
      return value + decimalPart;
    });
  };

  return (
    <div className="p-6 h-[calc(100dvh-100px)]">
      <h1 className="text-xl font-bold mb-4 text-center">Bank Sampah Aseek</h1>
      <QRScanner
        onScan={(data) => {
          try {
            if (!data) return;

            // Function to check if a string is valid JSON
            const isJSON = (str: string) => {
              try {
                const parsed = JSON.parse(str);
                return typeof parsed === "object" && parsed !== null;
              } catch (e) {
                return false;
              }
            };

            if (isJSON(data)) {
              const parsedData = JSON.parse(data);

              // Ensure it contains `qr_code`
              if ("qr_code" in parsedData) {
                setResultQR(parsedData);
                fetchBankData(parsedData.qr_code);
              } else {
                toast.error("Maaf, QR tidak valid!", {
                  position: "top-center",
                });
              }
            } else {
              toast.error("Maaf, QR tidak valid!", {
                position: "top-center",
              });
            }

            // const parsedData: Bank = JSON.parse(data);
            // setResultQR(parsedData);
            // fetchBankData(parsedData.qr_code);
          } catch (error) {
            toast.warning("Maaf, QR tidak valid!", {
              position: "top-center",
            });
            console.error("Failed to parse QR data", error);
          }
        }}
      />

      {/* Bottom Drawer */}
      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onClose={() => {
          //   setSelectedFamily(undefined);
          setDataWeight(1.0);
        }}
        dismissible
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{dataBank?.name}</DrawerTitle>
            <DrawerDescription>{dataBank?.address}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-10">
                <div className="flex flex-row items-center gap-5 justify-center">
                  <Button
                    onClick={decreaseWeight}
                    className="text-4xl"
                    variant="ghost"
                    disabled={dataWeight < 0.1}
                  >
                    -
                  </Button>
                  <div className="relative">
                    <div className="absolute left-1/2 -translate-x-1/2 -top-9">
                      Kg
                    </div>
                    <div className="dark:bg-white flex items-center justify-center tracking-wider font-semibold text-lg p-4 aspect-square h-16 w-16 rounded-2xl dark:text-[#202122] bg-[#020617]">
                      {dataWeight.toFixed(1)}
                    </div>
                  </div>
                  <Button
                    onClick={increaseWeight}
                    className="text-4xl"
                    variant="ghost"
                    disabled={dataWeight > 4.9}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex flex-row gap-7 items-center mt-4 justify-center">
                <Button
                  onClick={() => setWeightByNumber(1)}
                  className="aspect-square p-3 w-14 h-14 text-lg"
                >
                  1 Kg
                </Button>
                <Button
                  onClick={() => setWeightByNumber(2)}
                  className="aspect-square p-3 w-14 h-14 text-lg"
                >
                  2 Kg
                </Button>
                <Button
                  onClick={() => setWeightByNumber(3)}
                  className="aspect-square p-3 w-14 h-14 text-lg"
                >
                  3 Kg
                </Button>
                <Button
                  onClick={() => setWeightByNumber(4)}
                  className="aspect-square p-3 w-14 h-14 text-lg"
                >
                  4 Kg
                </Button>
                <Button
                  onClick={() => setWeightByNumber(5)}
                  className="aspect-square p-3 w-14 h-14 text-lg"
                >
                  5 Kg
                </Button>
              </div>
              <Button onClick={submitTransactionData}>Simpan</Button>
              <Button onClick={closeDrawer} variant="ghost">
                Tutup
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
