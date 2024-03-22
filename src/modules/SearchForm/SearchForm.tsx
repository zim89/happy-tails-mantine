import { Field } from "./ui/Field";

export default function SearchForm() {
  return (
    <div className='mb-8 space-y-4 md:mx-auto md:mb-12 md:w-[458px] lg:mb-16 lg:w-[572px]'>
      <h2 className='heading text-center'>Search results</h2>
      <Field />
    </div>
  );
}
