'use client'

import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {ProvinceContextType, ProvinceProviderProps, ProvincesWithDistricts} from "@/app/common";

// Data structure for provinces and their districts
const provincesWithDistricts:ProvincesWithDistricts = {
    "Province A": ["District A1", "District A2", "District A3"],
    "Province B": ["District B1", "District B2", "District B3"],
};

// Context to share the selected province across components
const ProvinceContext = createContext<ProvinceContextType>({
    currentProvince: '',
    setCurrentProvince: () => {},
});

// Provider component for the context
const ProvinceProvider: React.FC<ProvinceProviderProps> = ({ children }) => {
    const [currentProvince, setCurrentProvince] = useState('');
    const value = { currentProvince, setCurrentProvince };

    return <ProvinceContext.Provider value={value}>{children}</ProvinceContext.Provider>;
};

// Custom hook to use the province context more easily
const useProvince = () => useContext(ProvinceContext);

// Component for selecting a province
const ProvinceSelector = () => {
    const { currentProvince, setCurrentProvince } = useProvince();
    return (
        <select value={currentProvince} onChange={(e) => setCurrentProvince(e.target.value)}>
            <option value="">Select Province</option>
            {Object.keys(provincesWithDistricts).map((province) => (
                <option key={province} value={province}>{province}</option>
            ))}
        </select>
    );
};

// Component for selecting a district, which reacts to changes in the selected province
const DistrictSelector = () => {
    const { currentProvince } = useProvince();
    const [currentDistrict, setCurrentDistrict] = useState('');

    useEffect(() => {
        // Reset district when province changes
        setCurrentDistrict('');
    }, [currentProvince]);

    return (
        <select
            value={currentDistrict}
            onChange={(e) => setCurrentDistrict(e.target.value)}
            disabled={!currentProvince}
        >
            <option value="">Select District</option>
            {currentProvince && provincesWithDistricts[currentProvince].map((district) => (
                <option key={district} value={district}>{district}</option>
            ))}
        </select>
    );
};

// Main App component
const App = () => {
    return (
        <ProvinceProvider>
            <div>
                <h1>Select Your Location</h1>
                <ProvinceSelector />
                <DistrictSelector />
                {/* Additional selectors for further hierarchical levels (e.g., cities) can be added following the same pattern */}
            </div>
        </ProvinceProvider>
    );
};

export default App;
