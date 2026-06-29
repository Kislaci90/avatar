import {Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, FormLabel} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import type React from "react";

interface ItemListFilterProps {
    itemList: Array<string>,
    selectedItems: string[],
    onFilterChange: (updatedItems: string[]) => void,
    label: string,
    translationKey: string,
    getIconFunction?: (item: string) => React.JSX.Element
}

export function FilterCheckboxList({
                                       itemList,
                                       selectedItems,
                                       onFilterChange,
                                       label,
                                       translationKey,
                                       getIconFunction
                                   }: Readonly<ItemListFilterProps>) {
    const {t} = useTranslation();
    const [showAll, setShowAll] = useState(false);

    const displayLimit = 5;
    const shouldShowLoadMore = itemList.length > displayLimit;
    const displayedItems = showAll ? itemList : itemList.slice(0, displayLimit);


    return (
        <>
            <FormLabel
                sx={{
                    fontWeight: 600,
                    mb: 2,
                    display: 'block',
                    fontSize: '1.2rem',
                    color: 'text.secondary'
                }}>{label}</FormLabel>
            <Divider sx={{mb: 2}}/>
            <Box sx={{
                display: 'flex',
                gap: 1.5,
                flexWrap: 'wrap',
                alignItems: 'center'
            }}>
                <FormGroup>
                    {displayedItems.map((property) => {
                        const isSelected = selectedItems.includes(property);
                        const translationKeyFull = translationKey ? translationKey + '.' + property : property;
                        return (
                            <FormControlLabel key={property}
                                              sx={{
                                                  fontSize: '0.9rem',
                                                  '& .MuiTypography-root': {
                                                      fontSize: '0.9rem',
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      gap: 0.5
                                                  }
                                              }}
                                              control={<Checkbox
                                                  checked={isSelected}
                                                  onChange={() => {
                                                      const newValue = selectedItems.includes(property)
                                                          ? selectedItems.filter(p => p !== property)
                                                          : [...selectedItems, property];
                                                      onFilterChange(newValue);
                                                  }}/>}
                                              label={
                                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                      {getIconFunction?.(property)}
                                                      {t(translationKeyFull)}
                                                  </Box>
                                              }/>
                        );
                    })}
                </FormGroup>
            </Box>
            {shouldShowLoadMore && (
                <Button
                    variant="outlined"
                    onClick={() => setShowAll(!showAll)}
                    sx={{
                        mt: 1,
                        textTransform: 'none',
                        fontSize: '0.7rem'
                    }}
                >
                    {showAll ? t('common.showLess') : t('common.showMore')}
                </Button>
            )}
        </>
    );
}