import React, {useEffect, useState} from 'react';
import {useMutation} from '@apollo/client/react';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import type {PitchInput} from '../../services/pitches.ts';
import {CREATE_PITCH, UPDATE_PITCH} from '../../services/pitches.ts';
import type {PitchView} from '../../services/location.ts';

const PITCH_TYPES = ['FULL_SIZE', 'HALF_SIZE', 'FIVE_A_SIDE', 'SEVEN_A_SIDE', 'INDOOR', 'OUTDOOR'];
const SURFACE_TYPES = ['GRASS', 'ARTIFICIAL_GRASS', 'CONCRETE', 'ASPHALT', 'TURF', 'HARDCOURT'];
const PROPERTIES = ['LIGHTING', 'COVERED'];

type PitchFormDialogProps = {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    locationId: number;
    existingPitch?: PitchView;
};

const defaultForm: Omit<PitchInput, 'locationId'> = {
    name: '',
    description: '',
    pitchType: 'FULL_SIZE',
    surfaceType: 'GRASS',
    properties: [],
};

const PitchFormDialog: React.FC<PitchFormDialogProps> = ({open, onClose, onSuccess, locationId, existingPitch}) => {
    const isEdit = !!existingPitch;
    const [form, setForm] = useState<Omit<PitchInput, 'locationId'>>(defaultForm);
    const [error, setError] = useState('');

    useEffect(() => {
        if (existingPitch) {
            setForm({
                name: existingPitch.name,
                description: existingPitch.description,
                pitchType: existingPitch.pitchType,
                surfaceType: existingPitch.surfaceType,
                properties: existingPitch.properties ? [...existingPitch.properties] : [],
            });
        } else {
            setForm(defaultForm);
        }
        setError('');
    }, [existingPitch, open]);

    const [createPitch, {loading: createLoading}] = useMutation(CREATE_PITCH, {
        onCompleted: () => {
            onSuccess();
            onClose();
        },
        onError: (e) => setError(e.message),
    });

    const [updatePitch, {loading: updateLoading}] = useMutation(UPDATE_PITCH, {
        onCompleted: () => {
            onSuccess();
            onClose();
        },
        onError: (e) => setError(e.message),
    });

    const loading = createLoading || updateLoading;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const pitchInput: PitchInput = {...form, locationId};
        if (isEdit && existingPitch) {
            updatePitch({variables: {id: Number(existingPitch.id), pitchInput}});
        } else {
            createPitch({variables: {pitchInput}});
        }
    };

    const handlePropertyToggle = (property: string) => {
        setForm((prev) => ({
            ...prev,
            properties: prev.properties.includes(property)
                ? prev.properties.filter((p) => p !== property)
                : [...prev.properties, property],
        }));
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{isEdit ? 'Edit Pitch' : 'Add New Pitch'}</DialogTitle>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    {error && <Alert severity="error" sx={{mb: 2}}>{error}</Alert>}
                    <TextField
                        label="Name"
                        fullWidth
                        required
                        margin="normal"
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        required
                        margin="normal"
                        multiline
                        rows={3}
                        value={form.description}
                        onChange={(e) => setForm({...form, description: e.target.value})}
                    />
                    <FormControl fullWidth margin="normal">
                        <FormLabel>Pitch Type</FormLabel>
                        <Select
                            value={form.pitchType}
                            onChange={(e) => setForm({...form, pitchType: e.target.value})}
                        >
                            {PITCH_TYPES.map((type) => (
                                <MenuItem key={type} value={type}>{type.replaceAll('_', ' ')}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <FormLabel>Surface Type</FormLabel>
                        <Select
                            value={form.surfaceType}
                            onChange={(e) => setForm({...form, surfaceType: e.target.value})}
                        >
                            {SURFACE_TYPES.map((type) => (
                                <MenuItem key={type} value={type}>{type.replaceAll('_', ' ')}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl component="fieldset" margin="normal">
                        <FormLabel component="legend">
                            <Typography variant="body2">Properties</Typography>
                        </FormLabel>
                        <FormGroup row>
                            {PROPERTIES.map((property) => (
                                <FormControlLabel
                                    key={property}
                                    control={
                                        <Checkbox
                                            checked={form.properties.includes(property)}
                                            onChange={() => handlePropertyToggle(property)}
                                        />
                                    }
                                    label={property}
                                />
                            ))}
                        </FormGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} disabled={loading}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? <CircularProgress size={20}/> : (isEdit ? 'Save Changes' : 'Add Pitch')}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default PitchFormDialog;
