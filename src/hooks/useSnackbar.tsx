import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { Snackbar, SnackbarOrigin } from "@mui/material";

const Context = createContext({});


interface SnackbarConfig {
    buttons?: JSX.Element[];
    autoHideDuration?: number;
    anchorOrigin?: SnackbarOrigin;
    onDismiss?: () => void;
}

type SnackbarFunction = (msg: string, snConfig?: SnackbarConfig) => void;

type SnackbarHandler = {
    close: () => void;
}

export const SnackbarContextProvider: React.FC = ({ children }) => {


    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [config, setConfig] = useState<SnackbarConfig | undefined>();


    const handleClose = useCallback(() => {
        setOpen(false);
        config?.onDismiss && config.onDismiss();
    }, [config]);

    const snackbarHandler: SnackbarHandler = useMemo(() => ({
        close: handleClose
    }), [handleClose]);

    const snackbar: SnackbarFunction = useCallback((msg: string, snConfig?: SnackbarConfig) => {
        setOpen(false);
        setConfig(snConfig);
        setMessage(msg);
        setOpen(true)
    }, []);



    return <Context.Provider value={{ snackbar, snackbarHandler }}>
        <Snackbar
            open={open} message={message} onClose={handleClose}
            autoHideDuration={config?.autoHideDuration}
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            action={<>{config?.buttons}</>}
        />
        {children}

    </Context.Provider >
}

const useSnackbar = () => useContext(Context);
export default useSnackbar as () => { snackbar: SnackbarFunction, snackbarHandler: SnackbarHandler };
