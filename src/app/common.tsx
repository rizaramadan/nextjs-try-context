import React, { ReactNode } from 'react';
export interface ProvinceContextType {
    currentProvince: string;
    setCurrentProvince: (province: string) => void;
}

// Define a type for the props of the ProvinceProvider, including children
export interface ProvinceProviderProps {
    children: ReactNode; // This type accepts any valid React child (elements, strings, numbers, etc.)
}

export interface ProvincesWithDistricts {
    [key: string]: string[];
}
