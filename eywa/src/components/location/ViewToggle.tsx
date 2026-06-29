import React from 'react';
import {Box, Button, ButtonGroup} from '@mui/material';
import {GridView, Map} from '@mui/icons-material';

interface ViewToggleProps {
    currentView: 'grid' | 'map';
    onViewChange: (view: 'grid' | 'map') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({currentView, onViewChange}) => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'flex-end', mb: 3}}>
            <ButtonGroup variant="outlined">
                <Button
                    onClick={() => onViewChange('grid')}
                    variant={currentView === 'grid' ? 'contained' : 'outlined'}
                    startIcon={<GridView/>}
                    sx={{textTransform: 'none'}}
                >
                </Button>
                <Button
                    onClick={() => onViewChange('map')}
                    variant={currentView === 'map' ? 'contained' : 'outlined'}
                    startIcon={<Map/>}
                    sx={{textTransform: 'none'}}
                >
                </Button>
            </ButtonGroup>
        </Box>
    );
};

export default ViewToggle;
