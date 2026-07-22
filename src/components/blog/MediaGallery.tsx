'use client';

import { useState, useEffect } from 'react';
import { CldImage } from 'next-cloudinary';
import { useToast } from '@/components/ui/ToastContext';
import {
  fetchImages,
  uploadImage,
  deleteImage,
} from '@/services/image-service';

interface MediaGalleryProps {
  onSelect: (
    url: string,
    cursorPosition?: { start: number; end: number }
  ) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  cursorPosition?: { start: number; end: number };
}

export default function MediaGallery({
  onSelect,
  fileInputRef,
  cursorPosition,
}: MediaGalleryProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { showToast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 12;

  const totalPages = Math.ceil(images.length / imagesPerPage);
  const paginatedImages = images.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const fetchedImages = await fetchImages();
      setImages(fetchedImages);
      setLoading(false);
    };
    loadImages();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const uploadedUrl = await uploadImage(file);
      if (uploadedUrl) {
        uploadedUrls.push(uploadedUrl);
      } else {
        showToast(`Failed to upload ${file.name}.`, 'error');
      }
    }

    if (uploadedUrls.length > 0) {
      setImages((prev) => [...uploadedUrls, ...prev]);
      setCurrentPage(1);
      showToast('Images uploaded successfully!', 'success');
    }
    setUploading(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (publicId: string) => {
    const success = await deleteImage(publicId);

    if (success) {
      setImages((prev) => prev.filter((url) => !url.includes(publicId)));
      showToast('Image deleted successfully!', 'success');
    } else {
      showToast('Failed to delete image.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="aspect-square animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800"
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="hidden"
      />
      {uploading && (
        <p
          className="bg-primary/10 text-primary mb-4 rounded-xl px-4 py-3 text-xs"
          aria-live="polite"
        >
          Uploading selected images…
        </p>
      )}
      {images.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-14 text-center dark:border-zinc-700">
          <p className="text-dark dark:text-light font-serif text-2xl italic">
            No images yet.
          </p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Upload an image to build your media library.
          </p>
        </div>
      ) : (
        <div className="grid max-h-[52vh] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3 md:grid-cols-4">
          {paginatedImages.map((url) => (
            <div
              key={url}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800"
            >
              <button
                type="button"
                className="h-full w-full"
                onClick={() => onSelect(url, cursorPosition)}
                aria-label="Insert this image"
              >
                <CldImage
                  src={url}
                  width="300"
                  height="300"
                  alt=""
                  className="h-full w-full object-cover transition duration-200 group-hover:brightness-75"
                />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const publicId = url
                    .split('/')
                    .slice(-2)
                    .join('/')
                    .split('.')[0];
                  if (publicId) handleDelete(publicId);
                }}
                className="text-light absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950/70 text-lg leading-none opacity-100 backdrop-blur-sm transition hover:bg-red-600 md:opacity-0 md:group-hover:opacity-100"
                aria-label="Delete image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className="mt-5 flex justify-center space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => handlePageClick(index + 1)}
              className={`h-8 min-w-8 rounded-full px-2 font-mono text-xs transition-colors ${
                currentPage === index + 1
                  ? 'bg-dark text-light dark:bg-light dark:text-dark'
                  : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400'
              }`}
              aria-label={`Media page ${index + 1}`}
              aria-current={currentPage === index + 1 ? 'page' : undefined}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
