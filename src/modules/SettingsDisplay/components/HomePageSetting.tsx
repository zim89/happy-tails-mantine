'use client';

import { useForm, isNotEmpty } from '@mantine/form';
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { ChevronDown, Info, UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import { FileInput, Select, Tooltip } from '@mantine/core';

import classes from '../classes.module.css';
import { cn } from '@/shared/lib/utils';
import {
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useFindManyQuery,
  useUpdateBannerMutation,
} from '@/shared/api/bannerApi';
import { useSelectProducts } from '@/shared/hooks/useSelectProducts';
import { publishImage } from '@/shared/lib/requests';
import { CustomSelectDropdown } from './CustomSelectDropdown';
import { useSelectCategories } from '@/shared/hooks/useSelectCategories';
import { useSelectPosts } from '@/shared/hooks/useSelectPosts';
import { findImageSource } from '../lib/helpers';
import {
  brandNotification,
  getImageSource,
  isAxiosQueryError,
  validateFile,
} from '@/shared/lib/helpers';
import { handleError as handleDispatchError } from '@/shared/helpers/error.helpers';
import { SITE_DOMAIN } from '@/shared/constants/env.const';
import {
  TOO_LARGE_PAYLOAD,
  UNSUPPORTED_TYPE,
} from '@/shared/constants/httpCodes';
import { HomePageSettingSkeleton } from './skeletons/HomePageSettingSkeleton';
import BrandBox from '@/components/BrandBox';
import { toast } from 'react-toastify';

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
  const [updateBanner] = useUpdateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  const products = useSelectProducts((state) => state);
  const categories = useSelectCategories((state) => state);
  const posts = useSelectPosts((state) => state);

  const bannerPreview1 = useRef<PreviewImage>({ name: '', path: '', id: null });
  const bannerPreview2 = useRef<PreviewImage>({ name: '', path: '', id: null });
  const bannerPreview3 = useRef<PreviewImage>({ name: '', path: '', id: null });
  const bannerPreview4 = useRef<PreviewImage>({ name: '', path: '', id: null });

  // These are used to create select options
  const productsPages = useMemo(() => {
    return products.map((product) => {
      const prefix = SITE_DOMAIN;

      return prefix + '/products/' + product.id;
    });
  }, [products.length]);

  const categoriesPages = useMemo(() => {
    return categories.map((cat) => {
      const prefix = SITE_DOMAIN;

      return prefix + '/' + cat.path;
    });
  }, [categories.length]);

  const postsPages = useMemo(() => {
    return posts.map((post) => {
      const prefix = SITE_DOMAIN;

      return prefix + '/blog/' + post.id;
    });
  }, [posts.length]);

  const bannerMap: { [P in string]: MutableRefObject<PreviewImage> } = useMemo(
    () => ({
      banner_1: bannerPreview1,
      banner_2: bannerPreview2,
      banner_3: bannerPreview3,
      banner_4: bannerPreview4,
    }),
    [bannerPreview1, bannerPreview2, bannerPreview3, bannerPreview4]
  );

  // Converts an array of banners into FormValues object
  const initialValues = useCallback(
    () =>
      data &&
      data.content.reduce((acc, banner) => {
        if (banner.name in bannerMap) {
          // This id will be used for PUT request
          bannerMap[banner.name].current.id = banner.id;
          return {
            ...acc,
            [banner.name]: banner.imagePath,
            [`product_link_${banner.name[banner.name.length - 1]}`]:
              banner.productPath,
          };
        }

        return { ...acc, ...banner };
      }, {}),

    [data, data?.content, data?.content.length]
  );

  const form = useForm<FormValues>({
    initialValues: {
      product_link_1: '',
      product_link_2: '',
      product_link_3: '',
      product_link_4: '',
      banner_1: null,
      banner_2: null,
      banner_3: null,
      banner_4: null,
    },

    onValuesChange(values) {
      [bannerPreview1, bannerPreview2, bannerPreview3, bannerPreview4].forEach(
        (banner, index) => {
          const bannerProp = `banner_${index + 1}` as const;
          const bannerValue = values[bannerProp];

          if (bannerValue) {
            const validationError = validateFile(bannerValue);

            if (validationError) {
              return form.setFieldError(bannerProp, `${validationError.data}`);
            }
          }

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

  // Set server response as form's values
  useEffect(() => {
    const initial = initialValues();

    if (data && initial) {
      form.initialize(initial);
    }
  }, [data]);

  if (error)
    return (
      <p>
        {
          'Whoops, it should not have happened. our experts are already fixing this.'
        }
      </p>
    );

  if (isLoading) return <HomePageSettingSkeleton />;

  const processBannerDeletion = async (
    ref: MutableRefObject<PreviewImage>,
    index: number
  ) => {
    const refName = `banner_${index}`;
    const linkProp = `product_link_${index}`;
    const candidateId = ref.current.id;

    if (candidateId) {
      const copyRef = {
        path: ref.current.path,
        name: ref.current.name,
        id: ref.current.id,
      };

      ref.current = {
        path: null,
        name: null,
        id: null,
      };

      form.setValues((prev) => ({
        ...prev,
        [refName]: null,
        [linkProp]: null,
      }));

      try {
        await deleteBanner({ id: candidateId }).unwrap();
      } catch (err) {
        ref.current = copyRef;
        handleDispatchError(err, toast.error);
      }
    }
  };

  const clearFile = async (
    ref: MutableRefObject<PreviewImage>,
    index: number
  ) => {
    try {
      brandNotification('SUCCESS', `Banner ${index} removed successfully`);

      await processBannerDeletion(ref, index);
    } catch (err) {
      handleDispatchError(err, toast.error);
    }
  };

  const processBannerUploading = async (
    id: number,
    op: 'POST' | 'PUT',
    imageLink: string
  ) => {
    const linkProp = `product_link_${id}` as const;
    const productPath = form.getValues()[linkProp];
    const bannerProp = `banner_${id}` as const;
    const bannerId = bannerMap[bannerProp].current.id;

    form.resetTouched();
    brandNotification(
      'SUCCESS',
      op === 'POST'
        ? `Banner #${id} added successfully`
        : `Banner #${id} updated successfully`
    );

    if (op === 'POST') {
      await createBanner({
        name: bannerProp,
        imagePath: imageLink,
        productPath,
        type: 'SCROLL',
      }).unwrap();
    } else if (bannerId) {
      await updateBanner({
        id: bannerId,
        name: bannerProp,
        imagePath: imageLink,
        productPath,
        type: 'SCROLL',
      }).unwrap();
    } else throw new Error('Id is missing!');
  };

  const handleUploadBanner = async (id: number, op: 'POST' | 'PUT') => {
    // Check whether the link is fulfilled before a request
    const linkProp = `product_link_${id}` as const;

    const { hasError: bannerHasError } = form.validateField(`banner_${id}`);
    const { hasError: linkHasError } = form.validateField(linkProp);

    try {
      if (!bannerHasError && !linkHasError) {
        const bannerProp = `banner_${id}` as const;
        // As I'm calling form.onChange() imperatively in callback fn,
        // I have to call getValues() instead of accessing form.values prop
        const image = form.getValues()[bannerProp];
        const imageLink = await getImageSource(image, bannerProp);

        await processBannerUploading(id, op, imageLink);
      }
    } catch (err) {
      handleError(err, id);
    }
  };

  const handleError = (err: unknown, id: number) => {
    if (isAxiosQueryError(err)) {
      if (err.status === UNSUPPORTED_TYPE || err.status === TOO_LARGE_PAYLOAD) {
        form.setFieldValue(`banner_${id}`, null);
        form.setFieldError(`banner_${id}`, `${err.data}`);
      } else {
        handleDispatchError(err, toast.error);
      }
    }
  };

  return (
    <>
      <BrandBox title='Banners'>
        <form>
          {[bannerPreview1, bannerPreview2, bannerPreview3, bannerPreview4].map(
            (banner, index) => (
              <div
                key={index}
                className='mt-4 flex flex-col items-end gap-3 md:flex-row md:gap-6 md:first:mt-0'
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
                          placeholder='Max file size 5 MB'
                          {...form.getInputProps(`banner_${index + 1}`)}
                          onChange={(evt) => {
                            const { onChange } = form.getInputProps(
                              `banner_${index + 1}`
                            );

                            // Call the main change event handler
                            onChange(evt);
                            handleUploadBanner(index + 1, 'POST');
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
                    <div>
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
                      <div className={classes.previewWrapper}>
                        <Image
                          className={classes.previewImage}
                          width={32}
                          height={32}
                          src={banner.current.path}
                          alt={`${banner.current.name}`}
                        />
                        <p>{banner.current.name}</p>
                        <button
                          type='reset'
                          className={classes.clearImage}
                          onClick={() => clearFile(banner, index + 1)}
                        >
                          <X size={14} alignmentBaseline='central' />
                        </button>
                      </div>
                      {form?.errors[`banner_${index + 1}`] && (
                        <div className='relative'>
                          <p className='form-error -left-[128px]'>
                            {form.errors[`banner_${index + 1}`]}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <Select
                  {...form.getInputProps(`product_link_${index + 1}`)}
                  label='Link to a page'
                  data={productsPages
                    .concat(postsPages)
                    .concat(categoriesPages)}
                  styles={{
                    wrapper: {
                      height: 40,
                    },
                  }}
                  classNames={{
                    root: 'form-root w-full',
                    label: 'form-label',
                    wrapper:
                      'flex border border-brand-grey-400 rounded-sm px-2 gap-2 focus:outline outline-2 bg-primary m-0',
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
                  renderOption={({ option, checked }) => {
                    const imagePath = findImageSource({
                      targetString: option.label,
                      categories,
                      posts,
                      products,
                    });

                    return (
                      CustomSelectDropdown &&
                      imagePath &&
                      CustomSelectDropdown({
                        option,
                        checked,
                        imagePath,
                      })
                    );
                  }}
                  onChange={(evt) => {
                    const { onChange } = form.getInputProps(
                      `product_link_${index + 1}`
                    );
                    onChange(evt);
                    handleUploadBanner(
                      index + 1,
                      form.isTouched(`banner_${index + 1}`) ? 'POST' : 'PUT'
                    );
                  }}
                />
              </div>
            )
          )}
        </form>
      </BrandBox>
    </>
  );
};
