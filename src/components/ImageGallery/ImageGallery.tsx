import { useKeenSlider } from "keen-slider/react";
import ThumbnailPlugin from "./ThumbnailPlugin";

interface Props {
  images?: string[];
  noProductImg?: string;
}

export const ImageGallery = ({ images, noProductImg }: Props) => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: 1,
      spacing: 10,
    },
  });

  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 2,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)],
  );

  return (
    <div className="overflow-hidden">
      {images ? (
        <div className="flex flex-col gap-2">
          <div ref={sliderRef} className="keen-slider h-full">
            {images.map((i) => (
              <div className="keen-slider__slide flex justify-center ">
                <img src={i} alt="" className="h-80 rounded-xl" />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <div ref={thumbnailRef} className="keen-slider thumbnail">
              {images.map((i) => (
                <div className="keen-slider__slide flex justify-center">
                  <img src={i} alt="" className="h-32 rounded-xl" />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center h-full">
          <img src={noProductImg} alt="" className="h-80" />
        </div>
      )}
    </div>
  );
};
