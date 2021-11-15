import { Brightness2, BrightnessHigh, BrightnessAuto, Favorite, Home } from '@mui/icons-material'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React, { ComponentType, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router'
import setLocation from '../actions/setLocation';
import { useReduxDispatch, useReduxSelector } from '../redux/store';
import ThemeToggleModal from './ThemeToggleModal';

interface NavbarProps {
    title: string;
}

export default function Navbar({ title }: NavbarProps) {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useReduxDispatch();
    const { default_location } = useReduxSelector(s => s.configuration);

    const currentLocation = useMemo(() => {
        console.log("current location", location.pathname);
        switch (location.pathname) {
            case "/favorites": return "favorites";
            case "/": return "home"
            default: return "other";

        }
    }, [location.pathname])

    const { theme } = useReduxSelector(s => s.configuration);

    const ThemeIcon = useMemo(() => {
        switch (theme) {
            case "light": return <BrightnessHigh />
            case "dark": return <Brightness2 />
            case "default":
            default: return <BrightnessAuto />
        }
    }, [theme])

    const [openThemeDialog, setOpenThemeDialog] = useState(false)

    return <>
        <div>
            <AppBar position="static">
                <Toolbar>
                    {currentLocation !== "home" &&
                        <IconButton size="large" edge="start" color="inherit" aria-label="home" sx={{ mr: 2 }}
                            onClick={() => setLocation(default_location)(dispatch, navigate)}
                        ><Home />
                        </IconButton>
                    }
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>{title}</Typography>

                    {currentLocation !== "favorites" &&
                        <Button startIcon={<Favorite />} color="inherit"
                            onClick={() => navigate("/favorites")}
                        >Favorites</Button>
                    }

                    <IconButton sx={{ mx: 2 }} color="inherit"
                        onClick={() => setOpenThemeDialog(true)}>
                        {ThemeIcon}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
        <ThemeToggleModal open={openThemeDialog} setOpen={setOpenThemeDialog} />
    </>
}




export function withNavbar<T>(WrappedComponent: ComponentType<T>, navbarProps: NavbarProps) {
    return (props: T) => <>
        <Navbar {...navbarProps} />
        <WrappedComponent {...props} />
    </>
}