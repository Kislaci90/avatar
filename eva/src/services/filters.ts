export type Filter = {
    properties: string[];
    searchTerm: string;
    locationAmenities: string[];
    cities: string[];
    surfaceTypes: string[];
    venueTypes: string[];
};

export const handleFilterChange = <K extends keyof Filter>(
    filters: Filter,
    field: K,
    value: string | string[],
    checked?: boolean
): Filter => {
    const current = filters[field];

    if (Array.isArray(current)) {
        if (typeof checked === "boolean") {
            return {
                ...filters,
                [field]: checked
                    ? [...current, value as string]
                    : current.filter(v => v !== value)
            };
        }

        if (Array.isArray(value)) {
            return {...filters, [field]: value};
        }

        return {
            ...filters,
            [field]: [...current, value as string]
        };
    }

    return {
        ...filters,
        [field]: value as string
    };
};

