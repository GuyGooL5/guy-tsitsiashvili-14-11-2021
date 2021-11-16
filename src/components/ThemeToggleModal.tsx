import { Menu, MenuItem, MenuProps } from '@mui/material'
import { configurationSliceActions } from '../redux/reducers/configurationReducer';
import { useReduxDispatch } from '../redux/store'



export default function ThemeMenu(props: MenuProps) {

    const dispatch = useReduxDispatch();

    function selectTheme(value: "light" | "dark" | "default") {
        dispatch(configurationSliceActions.set_theme(value));
        props.onClose && props.onClose({}, "backdropClick");
    }

    return <Menu {...props}>
        <MenuItem onClick={() => selectTheme("default")}>System Default</MenuItem>
        <MenuItem onClick={() => selectTheme("light")}>Light</MenuItem>
        <MenuItem onClick={() => selectTheme("dark")}>Dark</MenuItem>
    </Menu>
}
