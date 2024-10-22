"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";

import settingImg from "../../../../../assets/icons/settingImg.svg";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import "./imageGallery.css";

import Image from "next/image";
import { IPictures } from "@/app/types";

export const SelectImage = ({ pictures }: any) => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1024);
  const imageGalleryRef = useRef<any>(null);
  const onClickHandler = () => {
    if (imageGalleryRef.current === null) return;

    imageGalleryRef.current.toggleFullScreen();
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 1024);
    };
  }, []);

  const images = pictures.map((item: IPictures) => ({
    original: item.url,
    thumbnail: item.url,
  }));

  if (pictures?.length === 0) {
    return <p>Нет картинок</p>;
  }

  return (
    <div className={styles.container}>
      <ImageGallery
        onClick={onClickHandler}
        ref={imageGalleryRef}
        showFullscreenButton={false}
        items={images}
        thumbnailPosition="left"
        showPlayButton={false}
        showThumbnails={isWideScreen}
        showNav={isWideScreen ? false : true}
        lazyLoad={true}
      />
    </div>
  );
};
