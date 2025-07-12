"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";

interface Props {
  onHandleClick: () => void;
}

export default function OnboardingPage({ onHandleClick }: Props) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [direction, setDirection] = React.useState<"left" | "right">("right");

  const handleFinish = () => {
    // Save to localStorage
    const now = new Date().toISOString();
    localStorage.setItem("onboardingComplete", "true");
    localStorage.setItem("onboardingTimestamp", now);
    onHandleClick();
  };

  //   const slides = [
  //     {
  //       title: "Recycle Easier and More Effective",
  //       description:
  //         "Track your recycling progress and earn points for your contributions",
  //       image: "/placeholder.svg?height=200&width=200",
  //       color: "bg-emerald-500",
  //     },
  //     {
  //       title: "Deposit Anywhere & Anytime",
  //       description:
  //         "Find recycling centers near you and deposit your recyclables",
  //       image: "/placeholder.svg?height=200&width=200",
  //       color: "bg-emerald-500",
  //     },
  //     {
  //       title: "Help Save the Environment",
  //       description:
  //         "Make a positive impact on the planet with every recycling deposit",
  //       image: "/placeholder.svg?height=200&width=200",
  //       color: "bg-emerald-500",
  //     },
  //   ];

  const slides = [
    {
      title: "Daur Ulang Jadi Lebih Mudah & Efisien",
      description:
        "Pantau progres daur ulang Anda dan kumpulkan poin sebagai bentuk kontribusi terhadap lingkungan.",
      image: "/images/daur-ulang.svg",
    },
    {
      title: "Setor Sampah Kapan Saja, di Mana Saja",
      description:
        "Temukan lokasi drop point terdekat dan setor sampah daur ulang Anda dengan mudah dan cepat.",
      image: "/images/setor-sampah.svg",
    },
    {
      title: "Bersama Selamatkan Lingkungan",
      description:
        "Setiap langkah kecil Anda memberi dampak besar bagi bumi. Mari wujudkan masa depan yang lebih hijau.",
      image: "/images/selamatkan-lingkungan.svg",
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection("right");
      setCurrentSlide(currentSlide + 1);
    } else {
      handleFinish();
    }
  };

  const changeSlide = (destIndex: number) => {
    setDirection(destIndex > currentSlide ? "right" : "left");
    setCurrentSlide(destIndex);
  };

  const slideVariants = {
    initial: (dir: "left" | "right") => ({
      x: dir === "right" ? 100 : -100,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    }),
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-emerald-50">
      <div className="flex-1 flex overflow-hidden relative items-center">
        <div className="flex h-dvh pt-32 pb-20 flex-col items-center justify-between p-6 w-full relative">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col grow items-center w-full select-none"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                const swipeThreshold = 100; // Adjust sensitivity
                if (
                  info.offset.x < -swipeThreshold &&
                  currentSlide < slides.length - 1
                ) {
                  nextSlide(); // swipe left
                } else if (info.offset.x > swipeThreshold && currentSlide > 0) {
                  changeSlide(currentSlide - 1); // swipe right
                }
              }}
            >
              <div
                className={`flex h-fit w-fit items-center justify-center rounded-full bg-opacity-20`}
              >
                <Image
                  src={slides[currentSlide].image}
                  width={250}
                  height={250}
                  alt={slides[currentSlide].title}
                />
              </div>

              <div className="mb-2 text-center">
                <h2 className="mb-2 text-2xl font-bold text-gray-800">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {slides[currentSlide].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="w-full">
            <div className="mb-6 flex w-full justify-center space-x-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  onClick={() => changeSlide(index)}
                  className={`h-2 w-2 rounded-full cursor-pointer ${
                    index === currentSlide ? "bg-emerald-500" : "bg-emerald-200"
                  }`}
                />
              ))}
            </div>
            <Button
              type="button"
              onClick={nextSlide}
              className="w-full z-50 rounded-full bg-emerald-500 py-6 text-lg text-white font-medium hover:bg-emerald-600"
            >
              {currentSlide < slides.length - 1
                ? "Lanjutkan"
                : "Mulai Daur Ulang"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
