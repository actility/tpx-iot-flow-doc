import React from 'react';
import Paginator from '@theme-original/DocItem/Paginator';
import FeedbackWidget from '@site/src/components/Feedback';

export default function PaginatorWrapper(props) {
  return (
    <>
        <Paginator {...props} />
        <FeedbackWidget />
    </>
  );
}
