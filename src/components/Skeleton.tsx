import React from 'react';
import ContentLoader, {
  IContentLoaderProps,
} from 'react-content-loader';

export const Skeleton: React.FC<IContentLoaderProps> = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={250}
    height={400}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="130" cy="130" r="130" />
    <rect x="0" y="278" rx="5" ry="5" width="280" height="27" />
    <rect x="7" y="321" rx="15" ry="15" width="260" height="88" />
    <rect x="0" y="431" rx="10" ry="10" width="91" height="27" />
    <rect x="120" y="428" rx="30" ry="30" width="153" height="45" />
  </ContentLoader>
);
