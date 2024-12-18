'use client';

import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { FileInput } from '@mantine/core';
import { useField } from '@mantine/form';
import { useEffect, useState } from 'react';

import {
  useCategoriesQuery,
  useUpdateCategoryMutation,
} from '@/shared/api/categoryApi';
import { Category } from '@/shared/types/types';
import { Droppable } from '@/components/Droppable';
import { Draggable } from '@/components/Draggable';
import CategoryBadge from '@/modules/Categories/components/CategoryBadge';
import { SliderSkeleton } from '@/modules/Categories/components/SliderSkeleton';
import { cn } from '@/shared/lib/utils';
import {
  getImageSource,
  handleDispatchError,
  isErrorDataString,
  validateFile,
} from '@/shared/lib/helpers';
import {
  BADGE_HEIGHT,
  TCategoryBadge,
  parseCoordinates,
} from '@/shared/helpers/coords.helpers';
import {
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useGetByTypeQuery,
} from '@/shared/api/bannerApi';

export const EditableCategoriesPresentation = () => {
  const { data: categories, isLoading: categoriesAreLoading } =
    useCategoriesQuery({});
  const { data: banners, isLoading: bannerIsLoading } = useGetByTypeQuery({
    page: 0,
    size: 1,
    type: 'FIXED',
  });
  const [dispatch] = useUpdateCategoryMutation();
  const [createBanner] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();
  const [categoriesCoords, setCategoriesCoords] = useState<TCategoryBadge[]>(
    []
  );
  const { getInputProps, error, getValue, setError, reset } = useField({
    initialValue: null as File | null,
  });

  useEffect(() => {
    if (categories?.content && categories.content.length > 0) {
      setCategoriesCoords(parseCoordinates(categories.content));
    }
  }, [categories?.content]);

  const imageInputValue = getValue();

  useEffect(() => {
    (async () => {
      try {
        if (imageInputValue && banners) {
          const validationError = validateFile(imageInputValue);
          if (validationError) {
            const msg = isErrorDataString(validationError.data)
              ? validationError.data
              : validationError.data.message;

            setError(msg);
            toast.error(msg);

            return;
          }

          const imageSrc = await getImageSource(
            imageInputValue,
            'banner_5',
            '/images/categories-dog.png'
          );

          if (banners.content[0] && banners.content[0].name === 'banner_5') {
            await updateBanner({
              id: banners.content[0].id,
              imagePath: imageSrc,
              productPath: '/',
              name: 'banner_5',
              type: 'FIXED',
            });
          } else {
            await createBanner({
              imagePath: imageSrc,
              productPath: '/',
              name: 'banner_5',
              type: 'FIXED',
            }).unwrap();
          }

          toast.success('Image successfully uploaded!');
        }
      } catch (err) {
        handleDispatchError(err, {
          position: 'top-right',
        });
      } finally {
        reset();
      }
    })();
  }, [imageInputValue, banners]);

  if (categoriesAreLoading || bannerIsLoading || !categories)
    return <SliderSkeleton />;

  async function handleDragEnd(event: DragEndEvent) {
    try {
      const candidate = categories?.content.find(
        (c) => c.id.toString() === event.active.id
      );

      if (candidate) {
        const { newX, newY } = {
          newX: candidate.coordinateOnBannerX + event.delta.x,
          newY:
            candidate.coordinateOnBannerY + (event.delta.y + BADGE_HEIGHT / 2),
        };

        const updatedCategory: Category = {
          ...candidate,
          coordinateOnBannerX: newX,
          coordinateOnBannerY: newY,
        };

        if (newX > 0 && newX < 1280 && newY > 0 && newY < 720) {
          setCategoriesCoords((prev) =>
            prev.map((cat) => {
              if (cat.id === updatedCategory.id) {
                cat.x = newX;
                cat.y = newY;
              }
              return cat;
            })
          );

          await dispatch({ req: updatedCategory }).unwrap();
        }
      }
    } catch (err) {
      console.error('Error updating category coordinates:', err);
      handleDispatchError(err, {
        position: 'top-right',
      });
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Droppable
        id='droppable'
        className='relative mx-auto h-[721px] w-full max-w-screen-lg'
      >
        <div className='absolute -top-7 z-20 inline-flex w-full justify-between rounded-t-md bg-brand-yellow px-2 py-3 text-sm font-semibold text-yellow-600'>
          <p className='w-44'>Editable</p>
          <p>Drag to reposition the badge anywhere on the image</p>
          <p className='w-44'>Logged in as Administrator</p>
        </div>
        {banners?.content && banners.content[0]?.name === 'banner_5' && (
          <Image
            src={
              banners.content[0]?.imagePath
                ? banners.content[0]?.imagePath
                : '/images/categories-dog.png'
            }
            alt='Big photo with variety of things around. Including all categories available in the shop.'
            fill
          />
        )}
        {categoriesCoords.map((cat) => (
          <Draggable id={`${cat.id}`} key={cat.id}>
            <CategoryBadge
              type='badge'
              key={cat.path}
              name={cat.name}
              path={`/${cat.name.toLowerCase()}`}
              position={{
                x: cat.x,
                y: cat.y,
              }}
            />
          </Draggable>
        ))}
        <div className='absolute -bottom-7 z-20 inline-flex w-full items-center justify-between rounded-b-md bg-brand-yellow px-2 py-1 text-sm font-semibold text-yellow-600'>
          <span className='w-[8.188rem]'>Editable</span>
          <p>
            Use the file input to the right for changing the background image
          </p>
          <FileInput
            id='image'
            placeholder='Max file size 5 MB'
            accept='.png, .jpeg, .gif, .webp'
            {...getInputProps()}
            classNames={{
              root: 'form-root',
              input: cn(
                'w-[8.188rem] px-3 py-0 font-inter text-xs font-semibold',
                'form-input',
                error && 'form-error--input'
              ),
              error: 'hidden',
            }}
          />
        </div>
      </Droppable>
    </DndContext>
  );
};
