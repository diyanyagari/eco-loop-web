import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDictionary } from "@/lib/getDictionary";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { Drawer } from "antd";
import { ArrowLeft, BarChart3, QrCode } from "lucide-react";
import React from "react";

export default function SectionTrashScanner() {
  const { homepage: dict } = getDictionary("id");
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const codeReaderRef = React.useRef<BrowserMultiFormatReader | null>(null);
  const [scannerControls, setScannerControls] =
    React.useState<IScannerControls | null>(null);

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    if (scannerControls) {
      scannerControls.stop();
      setScannerControls(null);
    }

    codeReaderRef.current = null;
  };

  const startCamera = async () => {
    if (!videoRef.current) return;

    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((d) => d.kind === "videoinput");
      if (!cameras.length) throw new Error("No camera found");

      const selected =
        cameras.find((d) => d.label.toLowerCase().includes("back")) ??
        cameras.at(-1);

      const controls = await codeReader.decodeFromVideoDevice(
        selected?.deviceId || "",
        videoRef.current,
        (result, error, readerControls) => {
          if (result) {
            readerControls.stop();
            setScannerControls(null);
            stopCamera();
            setOpenDrawer(false);
            // handle result.getText()
          }
        }
      );

      setScannerControls(controls);
    } catch (err) {
      console.error("Error starting camera", err);
      stopCamera();
    }
  };

  const openDrawerAndStart = () => {
    setOpenDrawer(true);
  };

  const closeDrawerAndStop = () => {
    stopCamera();
    setOpenDrawer(false);
  };

  return (
    <>
      <Card className="mb-6 overflow-hidden rounded-3xl border-none bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-800">
              {dict.recyclenow}
            </h2>
            <BarChart3 className="h-5 w-5 text-emerald-500" />
          </div>

          <p className="mb-6 text-gray-600">{dict.scanDescription}</p>

          <Button
            onClick={() => openDrawerAndStart()}
            className="w-full rounded-full bg-emerald-500 py-6 text-lg font-medium hover:bg-emerald-600"
          >
            <QrCode className="mr-2 h-5 w-5" />
            {dict.btnScan}
          </Button>
        </CardContent>
      </Card>
      <Drawer
        placement="right"
        open={openDrawer}
        onClose={closeDrawerAndStop}
        width="100vw" // makes it full width
        style={{ height: "100vh" }} // optional: ensure full height
        maskClosable={true} // optional: close on background click
        destroyOnHidden // optional: unmount on close
        closable={false}
        className=""
        styles={{
          header: {
            maxWidth: "24rem",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
          },
          body: {
            background: "linear-gradient(to top, #d1fae5 0%, #ffffff 100%)",
            padding: 0,
          },
        }}
      >
        <QRScannerContent
          videoRef={videoRef}
          openDrawer={openDrawer}
          startCamera={startCamera}
          stopCamera={stopCamera}
          closeDrawer={closeDrawerAndStop}
        />
      </Drawer>
    </>
  );
}

interface QRScannerContentProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  openDrawer: boolean;
  startCamera: () => void;
  stopCamera: () => void;
  closeDrawer: () => void;
}

function QRScannerContent({
  videoRef,
  openDrawer,
  startCamera,
  stopCamera,
  closeDrawer,
}: QRScannerContentProps) {
  React.useEffect(() => {
    if (openDrawer) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [openDrawer]);

  return (
    <div className="max-w-md flex flex-col h-full w-full mx-auto">
      <div className="relative h-full flex">
        <video ref={videoRef} className="w-full h-full object-cover inset-0" />
        {/* Animated scanning line */}
        {/* <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute left-0 w-full h-5 animate-scanline" />
        </div> */}
      </div>
      <div
        className={`relative grow flex items-end pt-3 pb-12 px-5 rounded-t-3xl
        before:content-[''] before:absolute before:w-full before:h-20 before:bg-[#d1fae5] before:-top-6 before:left-0 before:rounded-t-3xl`}
      >
        <Button
          onClick={closeDrawer}
          className="w-full relative z-10 rounded-full bg-emerald-500 py-6 text-lg font-medium hover:bg-emerald-600"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Batalkan
        </Button>
      </div>
    </div>
  );
}
