import {Grid} from "@mui/material";
import {useTranslation} from "react-i18next";
import {type Filter} from "../../services/filters.ts";
import {useEffect, useState} from "react";
import {GetSearchFiltersDocument, type GetSearchFiltersQuery} from "../../generated/graphql.ts";
import {useQuery} from "@apollo/client/react";
import {graphql} from "../../generated";
import {FilterCheckboxList} from "./FilterCheckboxList.tsx";
import {
    getLocationAmenityIcon,
    getVenuePropertyIcon,
    getVenueTypeIcon,
    getSurfaceTypeIcon
} from "../PropertyMap.tsx";

graphql(`
    query GetSearchFilters {
        getSearchFilters {
            cities
            locationAmenities
            surfaceTypes
            venueTypes
            venueProperties
        }
    }
`);

interface AdvancedFilterProps {
    filters: Filter,
    handleFilterChange: <K extends keyof Filter>(field: K, value: (string | string[]), checked?: boolean) => void
}

export function AdvancedFilter({filters, handleFilterChange}: Readonly<AdvancedFilterProps>) {
    const {t} = useTranslation();
    const [searchFilters, setSearchFilters] = useState<GetSearchFiltersQuery>({
        getSearchFilters: {
            cities: [],
            locationAmenities: [],
            surfaceTypes: [],
            venueTypes: [],
            venueProperties: [],
        }
    } as GetSearchFiltersQuery);

    const {data: searchFiltersData} = useQuery(GetSearchFiltersDocument);

    useEffect(() => {
        if (searchFiltersData?.getSearchFilters) {
            setSearchFilters(searchFiltersData);
        }
    }, [searchFiltersData]);

    return (
        <Grid container spacing={2}>
            <Grid size={{xs: 12}}>
                <FilterCheckboxList itemList={searchFilters?.getSearchFilters.cities}
                                    selectedItems={filters.cities}
                                    onFilterChange={(newValue) => handleFilterChange('cities', newValue)}
                                    label={t('locations.cities')}
                                    translationKey=""/>
            </Grid>
            <Grid size={{xs: 12}}>
                <FilterCheckboxList itemList={searchFilters?.getSearchFilters.locationAmenities}
                                selectedItems={filters.locationAmenities}
                                onFilterChange={(newValue) => handleFilterChange('locationAmenities', newValue)}
                                label={t('locations.locationProperty')}
                                translationKey="locations.property"
                                getIconFunction={getLocationAmenityIcon}/>
            </Grid>
            <Grid size={{xs: 12}}>
                <FilterCheckboxList itemList={searchFilters?.getSearchFilters.venueProperties}
                                selectedItems={filters.properties}
                                onFilterChange={(newValue) => handleFilterChange('properties', newValue)}
                                label={t('pitches.properties')}
                                translationKey="pitches.pitchPropertyOptions"
                                getIconFunction={getVenuePropertyIcon}/>
            </Grid>
            <Grid size={{xs: 12}}>
                <FilterCheckboxList itemList={searchFilters?.getSearchFilters.surfaceTypes}
                                selectedItems={filters.surfaceTypes}
                                onFilterChange={(newValue) => handleFilterChange('surfaceTypes', newValue)}
                                label={t('pitches.surfaceType')}
                                translationKey="pitches.surfaceTypeOptions"
                                getIconFunction={getSurfaceTypeIcon}/>
            </Grid>
            <Grid size={{xs: 12}}>
                <FilterCheckboxList itemList={searchFilters?.getSearchFilters.venueTypes}
                                selectedItems={filters.venueTypes}
                                onFilterChange={(newValue) => handleFilterChange('venueTypes', newValue)}
                                label={t('pitches.pitchType')}
                                translationKey="pitches.pitchTypeOptions"
                                getIconFunction={getVenueTypeIcon}/>
            </Grid>
        </Grid>
    );
}