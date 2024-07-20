'use client';

import { useForm, isNotEmpty } from '@mantine/form';
import { MutableRefObject, useEffect, useMemo, useRef } from 'react';
import { ChevronDown, Info, UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import { FileInput, Select, Tooltip } from '@mantine/core';

import classes from '../classes.module.css';
import { cn } from '@/shared/lib/utils';
import {
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useFindManyQuery,
} from '@/shared/api/bannerApi';
import Loader from '@/components/Loader';
import { useSelectProducts } from '@/shared/hooks/useSelectProducts';
import { publishImage } from '@/shared/lib/requests';
import { CustomSelectDropdown } from './CustomSelectDropdown';

type PreviewImage = {
  id: number | null;
  name: string | null;
  path: string | null;
};

type FormValues = {
  [P in `banner_${number}`]: File | null | string;
} & {
  [P in `product_link_${number}`]: string;
};

export const HomePageSetting = () => {
  const { data, isLoading, error } = useFindManyQuery({});
  const [createBanner] = useCreateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();
  const products = useSelectProducts((state) => state);

  const bannerPreview1 = useRef<PreviewImage>({ name: '', path: '', id: null });
  const bannerPreview2 = useRef<PreviewImage>({ name: '', path: '', id: null });
  const bannerPreview3 = useRef<PreviewImage>({ name: '', path: '', id: null });
  const bannerPreview4 = useRef<PreviewImage>({ name: '', path: '', id: null });

  const productsPages = useMemo(() => {
    return products.map((product) => {
      const prefix =
        process.env.NODE_ENV !== 'production'
          ? 'http://localhost:3000'
          : process.env.NEXT_PUBLIC_SITE_DOMAIN;

      return prefix + '/products/' + product.id;
    });
  }, [products.length]);

  const form = useForm<FormValues>({
    initialValues: {
      banner_1: null,
      product_link_1: '',
      banner_2: null,
      product_link_2: '',
      banner_3: null,
      product_link_3: '',
      banner_4: null,
      product_link_4: '',
    },

    onValuesChange(values) {
      [bannerPreview1, bannerPreview2, bannerPreview3, bannerPreview4].forEach(
        (banner, index) => {
          const bannerProp = `banner_${index + 1}` as const;
          const bannerValue = values[bannerProp];

          if (bannerValue instanceof File && banner.current) {
            banner.current.path = URL.createObjectURL(bannerValue);
            banner.current.name = `Banner ${index + 1}`;
          } else if (typeof bannerValue === 'string' && banner.current) {
            banner.current.path = bannerValue;
            banner.current.name = `Banner ${index + 1}`;
          }
        }
      );
    },

    validate: {
      product_link_1: isNotEmpty('The link is required'),
      product_link_2: isNotEmpty('The link is required'),
      product_link_3: isNotEmpty('The link is required'),
      product_link_4: isNotEmpty('The link is required'),

      banner_1: isNotEmpty('The banner is required'),
      banner_2: isNotEmpty('The banner is required'),
      banner_3: isNotEmpty('The banner is required'),
      banner_4: isNotEmpty('The banner is required'),
    },
  });

  const bannerMap: { [P in string]: MutableRefObject<PreviewImage> } = useMemo(
    () => ({
      banner_1: bannerPreview1,
      banner_2: bannerPreview2,
      banner_3: bannerPreview3,
      banner_4: bannerPreview4,
    }),
    [bannerPreview1, bannerPreview2, bannerPreview3, bannerPreview4]
  );

  useEffect(() => {
    if (!data?.content.length) return;

    data.content.forEach((banner) => {
      if (banner.name in bannerMap) {
        bannerMap[banner.name].current.id = banner.id;
        form.setFieldValue(banner.name, banner.imagePath);
      }
    });
  }, [data?.content]);

  if (error)
    return (
      <p>
        {
          'Whoops, it should not have happened. our experts are already fixing this.'
        }
      </p>
    );
  if (isLoading) return <Loader size={128} />;

  const clearFile = async (
    ref: MutableRefObject<PreviewImage>,
    refName: string
  ) => {
    try {
      const candidateId = ref.current.id;

      ref.current = {
        path: null,
        name: null,
        id: null,
      };

      candidateId && (await deleteBanner({ id: candidateId }).unwrap());
      form.setFieldValue(refName, null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUploadBanner = async (id: number) => {
    // Check whether the link is fulfilled before a request
    const linkProp = `product_link_${id}` as const;

    const { hasError: bannerHasError } = form.validateField(`banner_${id}`);
    const { hasError: linkHasError } = form.validateField(linkProp);

    try {
      if (!bannerHasError && !linkHasError) {
        const bannerProp = `banner_${id}` as const;
        const image = form.values[bannerProp];

        let imageLink = 'https://placehold.co/1200x800.png';

        if (process.env.NODE_ENV === 'production' && image instanceof File) {
          imageLink = await publishImage(image, bannerProp);
        }

        await createBanner({
          name: bannerProp,
          imagePath: imageLink,
          productPath: form.values[linkProp],
        }).unwrap();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className='mt-8 overflow-clip rounded-t border border-brand-grey-300 bg-white'>
        <h3 className='bg-brand-grey-300 p-4 text-xl font-bold'>Banners</h3>
        <div className='p-4'>
          {[bannerPreview1, bannerPreview2, bannerPreview3, bannerPreview4].map(
            (banner, index) => (
              <div
                key={index}
                className='mt-4 flex flex-col items-end md:flex-row md:gap-6 md:first:mt-0'
              >
                <div className='w-full md:max-w-[480px]'>
                  {!banner.current?.path ? (
                    <div className={classes.upload}>
                      <p className='mb-1 flex items-center gap-1 text-sm'>
                        <span>Image</span>
                        <Tooltip
                          label='.jpeg,.jpg,.png,.gif,.apng,.tiff'
                          withArrow
                        >
                          <Info
                            size={16}
                            className='-mb-[3px] cursor-pointer'
                            color='#5A5A5A'
                          />
                        </Tooltip>
                      </p>
                      <div>
                        <label htmlFor={`banner-image-${index}`}>
                          <UploadCloud color='white' />
                          <span>Select Image</span>
                        </label>
                        <FileInput
                          id={`banner-image-${index}`}
                          w='100%'
                          placeholder='Max file size 500 kB'
                          {...form.getInputProps(`banner_${index + 1}`)}
                          onChange={(evt) => {
                            const { onChange } = form.getInputProps(
                              `banner_${index + 1}`
                            );

                            // Call the main change event handler
                            onChange(evt);

                            handleUploadBanner(index + 1);
                          }}
                          accept='.png,.jpeg,.gif,.webp'
                          styles={{
                            input: { height: '100%' },
                          }}
                          classNames={{
                            root: 'form-root',
                            wrapper: classes.fileWrapper,
                            error: 'form-error -left-[144px] -bottom-[1rem]',
                            input: cn(
                              'form-input whitespace-nowrap',
                              classes.fileInput,
                              form?.errors[`banner_${index + 1}`] &&
                                'form-error--input h-full'
                            ),
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className={classes.previewWrapper}>
                      <Image
                        className={classes.previewImage}
                        width={32}
                        height={32}
                        src={banner.current.path}
                        alt=''
                      />
                      <p>{banner.current.name}</p>
                      <button
                        className={classes.clearImage}
                        onClick={() => clearFile(banner, `banner_${index + 1}`)}
                      >
                        <X size={14} alignmentBaseline='central' />
                      </button>
                    </div>
                  )}
                </div>
                <Select
                  {...form.getInputProps(`product_link_${index + 1}`)}
                  data={productsPages}
                  styles={{
                    wrapper: {
                      height: 40,
                    },
                  }}
                  classNames={{
                    root: 'form-root w-full',
                    label: 'form-label',
                    wrapper:
                      'flex border border-brand-grey-400 rounded-sm px-2 gap-2 focus:outline outline-2 bg-primary',
                    section: 'static w-auto text-secondary whitespace-nowrap',
                    option: 'text-xs',
                    input: cn(
                      'form-input h-full border-0 p-0 underline outline-none',
                      form?.errors[`product_link_${index + 1}`] &&
                        'form-error--input'
                    ),
                    error: 'form-error',
                  }}
                  rightSection={<ChevronDown color='black' size={16} />}
                  renderOption={CustomSelectDropdown}
                  onChange={(evt) => {
                    const { onChange } = form.getInputProps(
                      `product_link_${index + 1}`
                    );
                    onChange(evt);
                    handleUploadBanner(index + 1);
                  }}
                />
              </div>
            )
          )}
        </div>
      </form>
    </>
  );
};
