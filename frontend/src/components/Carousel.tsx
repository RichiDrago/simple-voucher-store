import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// Icons
import arrowLeft from "/icons/arrow-left.svg";
import arrowRight from "/icons/arrow-right.svg";

type ImageCarouselProps = {
    images: string[];
    className?: string;
    imageClassName?: string;
};

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className = "", imageClassName = "" }) => {
    // Hooks
    const { t } = useTranslation();
    // State
    const [index, setIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="flex min-h-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-center italic">{t("components.carousel.noImage")}</p>
            </div>
        );
    }

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* Back */}
            <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 z-10 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
            >
                <img src={arrowLeft} className="size-4 invert" alt="prev" />
            </button>

            {/* Image */}
            <img src={images[index]} alt={`image-${index}`} className={`max-h-80 rounded-lg object-contain shadow-md ${imageClassName}`} />

            {/* Next */}
            <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 z-10 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
            >
                <img src={arrowRight} className="size-4 invert" alt="next" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 flex space-x-1">
                {images.map((_, i) => (
                    <span key={i} className={`h-2 w-2 rounded-full transition ${i === index ? "bg-white" : "bg-white/40"}`}></span>
                ))}
            </div>
        </div>
    );
};
