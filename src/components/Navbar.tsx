import { Brightness2, BrightnessHigh, BrightnessAuto, Favorite, Home } from '@mui/icons-material'
import { AppBar, Button, ButtonProps, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material'
import { Theme } from '@mui/system';
import React, { ComponentType, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router'
import setLocation from '../actions/setLocation';
import { useReduxDispatch, useReduxSelector } from '../redux/store';
import ThemeMenu from './ThemeToggleModal';



interface CollapseButtonProps {
    text: string;
    collapsed?: boolean;
    Icon: JSX.Element;
}
const CollapseButton = ({ text, Icon, collapsed, ...props }: CollapseButtonProps & ButtonProps) => collapsed ?
    <IconButton {...props}>{Icon}</IconButton> : <Button {...props} startIcon={Icon}>{text}</Button>


interface NavbarProps {
    title: string;
}


export default function Navbar({ title }: NavbarProps) {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useReduxDispatch();
    const [themeMenuAnchor, setThemeMenuAnchor] = useState<HTMLElement | null>(null);

    const { default_location } = useReduxSelector(s => s.configuration);

    const xs = useMediaQuery((_theme: Theme) => _theme.breakpoints.down("sm"));


    const { theme } = useReduxSelector(s => s.configuration);

    const currentLocation = useMemo(() => {
        switch (location.pathname) {
            case "/favorites": return "favorites";
            case "/": return "home"
            default: return "other";
        }
    }, [location.pathname])


    const ThemeIcon = useMemo(() => {
        switch (theme) {
            case "light": return BrightnessHigh;
            case "dark": return Brightness2;
            case "default":
            default: return BrightnessAuto;
        }
    }, [theme])

    return <>
        <AppBar position="static">
            <Toolbar>
                {currentLocation !== "home" &&
                    <IconButton size="large" edge="start" color="inherit" aria-label="home" sx={{ mr: 2 }}
                        onClick={() => setLocation(default_location, "/")(dispatch, navigate)}>
                        <Home />
                    </IconButton>
                }

                <Typography variant="h6" sx={{ flexGrow: 1 }}>{title}</Typography>

                {currentLocation !== "favorites" &&
                    <CollapseButton Icon={<Favorite />} text={"Favorites"} collapsed={xs}
                        color="inherit" onClick={() => navigate("/favorites")} />
                }
                <CollapseButton Icon={<ThemeIcon />} text="Theme" collapsed={xs}
                    sx={{ mx: 2 }} color="inherit"
                    onClick={(e) => setThemeMenuAnchor(e.currentTarget)} />
            </Toolbar>
        </AppBar>
        <ThemeMenu anchorEl={themeMenuAnchor} open={!!themeMenuAnchor} onClose={() => setThemeMenuAnchor(null)} />
    </>
}




export function withNavbar<T>(WrappedComponent: ComponentType<T>, navbarProps: NavbarProps) {
    return (props: T) => <>
        <Navbar {...navbarProps} />
        <WrappedComponent {...props} />
    </>
}