import { LocationOn } from '@mui/icons-material';
import { Autocomplete, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAutocomplete from '../hooks/useAutocomplete';
import { useReduxDispatch } from '../redux/store';
import { AutocompleteData } from '../types/autocomplete';
import { getFlagEmoji } from '../utils/functions';
import setLocation from '../actions/setLocation';

interface PredictionItemProps {
    option: AutocompleteData;
}

function PredictionItem({ option, ...props }: PredictionItemProps) {
    return <li {...props}>
        <Grid container alignItems="center" spacing={2}>
            <Grid item> <LocationOn color="secondary" /> </Grid>
            <Grid item xs>
                <Typography variant="body1" >
                    {<span style={{ fontWeight: 700 }}>{option.LocalizedName}</span>}
                    {<span>, {option.AdministrativeArea.LocalizedName}</span>}
                    {<span style={{ color: "grey" }}>, {getFlagEmoji(option.Country.ID)}</span>}
                </Typography>
            </Grid>
        </Grid>
    </li >
}



export default function AutocompleteSearchbar() {

    const [inputString, setInputString] = useState("");
    const { predictions, loading, getPredictions } = useAutocomplete();
    const dispatch = useReduxDispatch();
    const navigate = useNavigate();

    function onChange(input: string) {
        setInputString(input);
        getPredictions(input);
    }

    function onSelect(option: AutocompleteData) {
        const { Key, LocalizedName } = option;
        setLocation({ Key, LocalizedName })(dispatch, navigate);
    }


    return <Autocomplete fullWidth
        autoComplete
        options={predictions}
        filterOptions={x => x}
        onChange={(e, v) => v && onSelect(v)}
        getOptionLabel={(option) => option.LocalizedName}
        isOptionEqualToValue={(option, value) => option.Key === value.Key}
        renderInput={(params) =>
            <TextField {...params} value={inputString} fullWidth
                variant="filled" label="Search for a location"
                onChange={e => onChange(e.target.value)} InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    endAdornment: loading && <CircularProgress size={24} />
                }} />
        }
        renderOption={(params, option) => <PredictionItem {...params} option={option} />}
    />
}
