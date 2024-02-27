import { useRef, useState } from "react";
import ReactImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import leftArrow from "../../assets/icons/arrow-left.png";
import rightArrow from "../../assets/icons/arrow-right.png";

interface IGalleryProps {
  images: ReactImageGalleryItem[];
}

export default function Gallery({ images }: IGalleryProps) {
  const gallery = useRef<HTMLDivElement>(null);
  const [cursorImg, setCursorImg] = useState<string>("");
  const [cursorVisible, setCursorVisible] = useState<boolean>(false);
  const [cursorX, setCursorX] = useState<number>(0);
  const [cursorY, setCursorY] = useState<number>(0);

  const moveCursor = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!gallery || !gallery.current) {
      return;
    }

    const mouseX = e.clientX - gallery.current.getBoundingClientRect().left;
    const mouseY = e.clientY - gallery.current.getBoundingClientRect().top;

    setCursorX(mouseX);
    setCursorY(mouseY);
  };

  const toggleCursor = (visible: boolean) => {
    setCursorVisible(visible);
  };

  return (
    <div
      ref={gallery}
      className="gallery"
      onMouseMove={moveCursor}
      onMouseLeave={() => toggleCursor(false)}
      onMouseOver={() => toggleCursor(true)}
    >
      <ReactImageGallery
        items={images}
        showBullets={false}
        showFullscreenButton={false}
        showPlayButton={false}
        lazyLoad={true}
        showIndex={true}
        renderLeftNav={(onClick, disabled) => (
          <button
            className="gallery__nav gallery__nav--left"
            onClick={onClick}
            onMouseOver={() => setCursorImg(leftArrow)}
            disabled={disabled}
          ></button>
        )}
        renderRightNav={(onClick, disabled) => (
          <button
            className="gallery__nav gallery__nav--right"
            onClick={onClick}
            onMouseOver={() => setCursorImg(rightArrow)}
            disabled={disabled}
          ></button>
        )}
      />
      {images.length > 1 && (
        <>
          <span
            style={{
              display: cursorVisible ? "block" : "none",
              left: cursorX,
              top: cursorY,
              transform: "translate(-50%, -50%)",
            }}
            className="gallery__cursor"
          >
            <img src={cursorImg} alt="cursor" />
          </span>
        </>
      )}
    </div>
  );
}
