'use client';

import dynamic from 'next/dynamic';
import { FunctionComponent } from 'react';

const MapViewContent = dynamic(() => import('./map-view-content'), {
  ssr: false,
});

const MapView: FunctionComponent = () => {
  return <MapViewContent />;
};

export default MapView;
