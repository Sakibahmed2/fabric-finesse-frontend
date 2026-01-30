"use client";

import { useState, useEffect } from "react";

/**
 * A custom hook that debounces a value by the specified delay.
 * Useful for search inputs to prevent excessive API calls.
 * 
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 300ms)
 * @returns The debounced value
 * 
 * @example
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearch = useDebounce(searchTerm, 500);
 * 
 * useEffect(() => {
 *   // This will only run 500ms after the user stops typing
 *   fetchSearchResults(debouncedSearch);
 * }, [debouncedSearch]);
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Set up a timer to update the debounced value after the delay
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Clean up the timer if value changes before delay completes
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
