import { Delete, Replay } from '@mui/icons-material'
import { CardHeader, IconButton, Typography } from '@mui/material'

interface FavoriteCardHeaderProps {
    title: string;
    editMode: boolean;
    onRemove: () => void;
    loading?: boolean;
    onRefresh?: () => void;
}
export default function FavoriteCardHeader({ title, editMode, loading, onRefresh, onRemove }: FavoriteCardHeaderProps) {
    return <CardHeader
        action={
            editMode ?
                <IconButton color="error" onClick={onRemove}><Delete /></IconButton>
                :
                !loading && <IconButton aria-label="retry" color="primary" onClick={() => onRefresh && onRefresh()}><Replay /></IconButton>
        }
        title={<Typography variant="h6">{title}</Typography>}
    />
}