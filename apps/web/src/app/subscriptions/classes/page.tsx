import Heading from '@components/common/Heading';
import React from 'react';
import { FiPlus } from 'react-icons/fi';

const Classes = () => {
  const icon = <FiPlus aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />;
  return (
    <div>
      <Heading title="Classes" action="Add new class" href="/subscriptions/classes/add" icon={icon} />
    </div>
  );
};

export default Classes;
