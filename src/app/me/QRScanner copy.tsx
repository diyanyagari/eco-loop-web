/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import Image from "next/image";
import React from "react";

interface QRScannerProps {
  onScan: (data: string) => void;
}

export default function QRScanner({ onScan }: QRScannerProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isScanning, setIsScanning] = React.useState(false);
  const [scannerControls, setScannerControls] =
    React.useState<IScannerControls | null>(null);

  React.useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  const startScanning = async () => {
    if (!videoRef.current) return;

    setIsScanning(true);

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices.length === 0) {
        console.error("No camera found!");
        return;
      }

      // Try to find the back camera
      let selectedDevice = videoDevices.find((device) =>
        device.label.toLowerCase().includes("back")
      );

      // If no "back" camera is found, fallback to the last available camera
      if (!selectedDevice) {
        selectedDevice = videoDevices[videoDevices.length - 1];
      }

      const selectedDeviceId = selectedDevice.deviceId;
      const codeReader = new BrowserMultiFormatReader();

      const controls = await codeReader.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current,
        (result, error, readerControls) => {
          if (result) {
            readerControls.stop();
            setScannerControls(null);
            stopScanning();
            onScan(result.getText());
          }
        }
      );

      setScannerControls(controls);
    } catch (error) {
      console.error("Error starting QR scanner:", error);
      stopScanning();
    }
  };

  const stopScanning = () => {
    if (scannerControls) {
      scannerControls.stop();
      setScannerControls(null);
    }
    setIsScanning(false);
  };

  return (
    <div className="flex flex-col justify-center gap-8 items-center h-full">
      <video
        ref={videoRef}
        className={`w-full h-80 max-w-md ${isScanning ? "block" : "hidden"}`}
      />
      <div
        className={`relative w-full h-80 ${isScanning ? "hidden" : "block"}`}
      >
        <Image
          src="/images/recycle.png"
          fill
          alt="recycle"
          style={{ objectFit: "contain" }}
        />
      </div>
      <Button
        onClick={isScanning ? stopScanning : startScanning}
        variant={isScanning ? "destructive" : "default"}
      >
        {isScanning ? "Stop Scan" : "Start Scan"}
      </Button>
    </div>
  );
}
