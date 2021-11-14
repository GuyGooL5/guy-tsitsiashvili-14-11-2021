import { Dispatch } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { configurationSliceActions } from '../redux/reducers/configurationReducer';
import { useReduxDispatch, useReduxSelector } from '../redux/store'

interface ThemeToggleModalProps {
    open: boolean;
    setOpen: Dispatch<boolean>;
}

export default function ThemeToggleModal({ open, setOpen }: ThemeToggleModalProps) {

    const { theme } = useReduxSelector(s => s.configuration);
    const dispatch = useReduxDispatch();

    function close() {
        setOpen(false);
    }

    function onSelectTheme(value: string) {
        switch (value) {
            case "light": case "dark": case "default":
                dispatch(configurationSliceActions.set_theme(value));
                break;
            default:
                console.error("Invalid value for theme selection: ", value);
        }
        close();
    }

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle >Theme</DialogTitle>
            <DialogContent>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="theme" value={theme} name="theme-radio-group"
                        onChange={(v) => onSelectTheme(v.target.value)}
                    >
                        <FormControlLabel value="default" control={<Radio />} label="System Default" />
                        <FormControlLabel value="light" control={<Radio />} label="Light" />
                        <FormControlLabel value="dark" control={<Radio />} label="Dark" />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={close} aria-label="dismiss">Dismiss</Button>
            </DialogActions>
        </Dialog>
    )
}
