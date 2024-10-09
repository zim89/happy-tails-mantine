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
import Loader from '@/components/Loader/Loader';
import { Category } from '@/shared/types/types';
import { Droppable } from '@/components/Droppable';
import { Draggable } from '@/components/Draggable';
import CategoryBadge from '@/modules/Categories/components/CategoryBadge';
import { cn } from '@/shared/lib/utils';
import {
  isAxiosQueryError,
  isErrorDataString,
  validateFile,
} from '@/shared/lib/helpers';
import {
  BADGE_HEIGHT,
  TCategoryBadge,
  parseCoordinates,
} from '@/shared/helpers/coords.helpers';

export const EditableCategoriesPresentation = () => {
  const { data, isLoading } = useCategoriesQuery({});
  const [dispatch] = useUpdateCategoryMutation();
  const [categoriesCoords, setCategoriesCoords] = useState<TCategoryBadge[]>(
    []
  );
  const { getInputProps, error, getValue, setError } = useField({
    initialValue: null as File | null,
  });

  useEffect(() => {
    if (data?.content && data.content.length > 0) {
      setCategoriesCoords(parseCoordinates(data.content));
    }
  }, [data?.content]);

  const imageInputValue = getValue();

  useEffect(() => {
    if (imageInputValue) {
      const validationError = validateFile(imageInputValue);
      if (validationError) {
        const msg = isErrorDataString(validationError.data)
          ? validationError.data
          : validationError.data.message;

        setError(msg);
        toast.error(msg);

        return;
      }

      toast.success('Image successfully uploaded!');
    }
  }, [imageInputValue]);

  if (isLoading || !data) return <Loader size={64} />;

  async function handleDragEnd(event: DragEndEvent) {
    try {
      const candidate = data?.content.find(
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

      if (isAxiosQueryError(err)) {
        toast.error(isErrorDataString(err.data) ? err.data : err.data.message);
      }
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Droppable
        id={'droppable'}
        className='relative mx-auto h-[721px] w-full max-w-screen-lg'
      >
        <div className='absolute -top-7 z-20 inline-flex w-full justify-between rounded-t-md bg-brand-yellow px-2 py-3 text-sm font-semibold text-yellow-600'>
          <p className='w-44'>Editable</p>
          <p>Drag to reposition the badge anywhere on the image</p>
          <p className='w-44'>Logged in as Administrator</p>
        </div>
        <Image
          src='/images/categories-dog.png'
          alt='big photo of a dog with variety of things around. Including leads, toys, cosmetics, collars, clothing and furniture.'
          fill
        />
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
            accept='.png,.jpeg,.gif,.webp'
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
