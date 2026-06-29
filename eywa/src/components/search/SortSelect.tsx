import {MenuItem, OutlinedInput, Select, Stack} from "@mui/material";
import {ArrowDownward, ArrowUpward} from "@mui/icons-material";
import {useTranslation} from "react-i18next";

interface SortSelectProps {
    setSort: (value: (((prevState: string) => string) | string)) => void,
    sort?: string
}

export function SortSelect({setSort, sort}: Readonly<SortSelectProps>) {
    const {t} = useTranslation();

    const sortingOptions = [
        {value: "DISTANCE_ASC", label: t('locations.nearestLocation'), icon: <ArrowUpward/>},
        {value: "DISTANCE_DESC", label: t('locations.farthestLocation'), icon: <ArrowDownward/>},
    ]

    return (
        <Select
            labelId="sort-multiple-checkbox-label"
            id="sort-multiple-checkbox"
            sx={{mb: 3}}
            size="small"
            value={sort}
            onChange={e => setSort(String(e.target.value))}
            input={<OutlinedInput label={t('locations.locationSort')}/>}
        >
            {sortingOptions.map((sort) => (
                <MenuItem key={sort.value} value={sort.value}>
                    <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                        {sort.icon}
                        {sort.label}
                    </Stack>
                </MenuItem>
            ))}
        </Select>
    );
}