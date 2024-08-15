'use client';

import FormInput from '@components/common/FormInput';
import Heading from '@components/common/Heading';
import ImageUpload from '@components/common/ImageUpload';
import { useFormik } from 'formik';
import React from 'react';
import type { DataProps, SetSubmitting } from '@repo/types/DataProps';
import { FiChevronLeft } from 'react-icons/fi';

const initialValues = {
  activityName: '',
  activityType: 'FREE',
  slotsLimit: '0',
  thumbFile: '',
  programs: [],
  hallIds: [],
  enabled: 'true',
};

const AddClass = () => {
  const onSubmit = async (data: DataProps, { setSubmitting }: SetSubmitting) => {
    console.log(data);
    setSubmitting(false);
  };
  const {
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    onSubmit,
    enableReinitialize: true,
    validateOnChange: false,
  });

  return (
    <>
      <Heading
        title="Add a class"
        action="Go back"
        href="/subscriptions/classes"
        icon={<FiChevronLeft aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />}
      />
      <div className="bg-white w-full rounded-xl p-5">
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <div className="flex flex-col flex-1 justify-center">
              <FormInput label="Name" name="name" onChange={handleChange} />
              <FormInput label="Label" name="label" className="mt-2" onChange={handleChange} />
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="btn btn-secondary rounded-xl flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary rounded-xl flex-1" >
                  Add class
                </button>
              </div>
            </div>
            <ImageUpload />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddClass;
