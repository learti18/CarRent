import { createContext, useContext, useCallback, useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { LOCATIONS } from "../common/constants";
import { useSearchParams } from "react-router-dom";

const defaultValues = {
  rental: {
    pickup: {
      location: LOCATIONS[0],
      date: new Date().toISOString().split("T")[0],
      time: new Date().getHours() + ":00",
    },
    dropoff: {
      location: LOCATIONS[0],
      date: new Date(new Date().setDate(new Date().getDate() + 2))
        .toISOString()
        .split("T")[0],
      time: new Date().getHours() + ":00",
    },
  },
  filters: [],
  priceRange: { min: 20, max: 300 },
  sortOption: "default"
};

export const SearchFormContext = createContext({});

export function SearchFormProvider({ children }) {
  const methods = useForm({ defaultValues });
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState({
    pageNumber: 1,
    pageSize: 10
  });

  // Get form values
  const { watch, setValue, getValues } = methods;
  const filters = watch("filters");
  const rental = watch("rental");
  const priceRange = watch("priceRange");
  const sortOption = watch("sortOption");

  // Build query params from form state
  const buildQueryParams = useCallback(() => {
    const params = {
      pageNumber: 1,
      pageSize: 10
    };
    
    // Handle body types
    if (Array.isArray(filters)) {
      // Find body types in the array
      const bodyTypes = filters.filter(item => 
        ["sport", "suv", "mpv", "sedan", "coupe", "hatchback"].includes(item)
      );
      
      // Map to backend-expected values
      if (bodyTypes.length === 1) {
        const typeMap = {
          "sport": "Sports Car",
          "suv": "SUV",
          "mpv": "Van", 
          "sedan": "Sedan",
          "coupe": "Coupe",
          "hatchback": "Hatchback"
        };
        params.bodyType = typeMap[bodyTypes[0]];
      }
      
      // Handle capacity
      if (filters.includes("2person")) params.capacity = 2;
      if (filters.includes("4person")) params.capacity = 4;
      if (filters.includes("6person")) params.capacity = 6;
      if (filters.includes("8person")) params.capacity = 8;
    }
    
    // Handle price range
    if (priceRange) {
      params.minPrice = Number(priceRange.min);
      params.maxPrice = Number(priceRange.max);
      
      // Only include if different from default
      if (params.minPrice === 20 && params.maxPrice === 300) {
        delete params.minPrice;
        delete params.maxPrice;
      }
    }
    
    // Handle dates
    if (rental?.pickup?.date) {
      params.pickupDate = rental.pickup.date;
    }
    
    if (rental?.dropoff?.date) {
      params.dropoffDate = rental.dropoff.date;
    }
    
    // Handle time
    if (rental?.pickup?.time) {
      params.pickupTime = rental.pickup.time;
    }
    
    if (rental?.dropoff?.time) {
      params.dropoffTime = rental.dropoff.time;
    }
    
    // Handle location
    if (rental?.pickup?.location) {
      if (typeof rental.pickup.location === 'string') {
        params.location = rental.pickup.location;
      } else if (rental.pickup.location?.name) {
        params.location = rental.pickup.location.name;
      }
    }
    
    // Handle sorting
    if (sortOption === "price_asc") {
      params.sortBy = "price";
      params.sortOrder = "asc";
    } else if (sortOption === "price_desc") {
      params.sortBy = "price";
      params.sortOrder = "desc";
    }
    
    return params;
  }, [filters, rental, priceRange, sortOption]);
  
  // Update query params when form state changes
  useEffect(() => {
    const newParams = buildQueryParams();
    if (JSON.stringify(newParams) !== JSON.stringify(queryParams)) {
      setQueryParams(newParams);
      
      // Update URL params
      const urlParams = new URLSearchParams();
      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          urlParams.set(key, String(value));
        }
      });
      
      setSearchParams(urlParams, { replace: true });
    }
  }, [filters, rental, priceRange, sortOption, buildQueryParams, queryParams, setSearchParams]);
  
  // Load values from URL on initial load
  useEffect(() => {
    const urlFilters = searchParams.get('filters');
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    const pickupDate = searchParams.get('pickupDate');
    const dropoffDate = searchParams.get('dropoffDate');
    
    // Set filters
    if (urlFilters) {
      const filterArray = urlFilters.split(',');
      setValue('filters', filterArray);
    }
    
    // Set price range from URL if available
    if (priceMin || priceMax) {
      setValue('priceRange', {
        min: Number(priceMin) || 20,
        max: Number(priceMax) || 300
      });
    }
    
    // Set dates
    if (pickupDate) {
      setValue('rental.pickup.date', pickupDate);
    }
    
    if (dropoffDate) {
      setValue('rental.dropoff.date', dropoffDate);
    }
    
    // Ensure price range is set
    const currentValues = getValues();
    if (!currentValues.priceRange) {
      setValue('priceRange', { min: 20, max: 300 });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  // Handle location data changes
  const handleLocationChange = useCallback((type, data) => {
    // Apply the changes to the form
    setValue(`rental.${type}`, data, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
    
    // Force immediate update of queryParams for date changes
    if (data.date) {
      // Manually build new query params to force an update
      const newParams = buildQueryParams();
      
      // Only update if there's an actual change
      if (JSON.stringify(newParams) !== JSON.stringify(queryParams)) {
        setQueryParams(newParams);
        
        // Update URL params immediately for date changes
        const urlParams = new URLSearchParams();
        Object.entries(newParams).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            urlParams.set(key, String(value));
          }
        });
        
        setSearchParams(urlParams, { replace: true });
      }
    }
  }, [setValue, getValues, buildQueryParams, queryParams, setQueryParams, setSearchParams]);
  
  // Handle sort option changes
  const handleSortChange = useCallback((option) => {
    setValue('sortOption', option);
  }, [setValue]);
  
  // Provide context value
  const contextValue = {
    ...methods,
    handleLocationChange,
    handleSortChange,
    queryParams
  };

  return (
    <SearchFormContext.Provider value={contextValue}>
      <FormProvider {...methods}>{children}</FormProvider>
    </SearchFormContext.Provider>
  );
}

export const useSearchForm = () => {
  const context = useContext(SearchFormContext);
  if (!context) {
    throw new Error("useSearchForm must be used within a SearchFormProvider");
  }
  return context;
};
