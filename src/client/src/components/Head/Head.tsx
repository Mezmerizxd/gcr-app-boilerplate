import { Helmet } from 'react-helmet-async';

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet title={title ? `${title} | GCR-App-Boilerplate` : undefined} defaultTitle="GCR-App-Boilerplate">
      <meta name="description" content={description} />
    </Helmet>
  );
};
