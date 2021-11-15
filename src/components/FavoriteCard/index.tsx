import { useMemo, useEffect, useState } from 'react'
import { Button, Card } from '@mui/material'
import useCurrentCondition from '../../hooks/useCurrentCondition';
import { FavoriteData } from '../../types/states'
import FavoriteLoadingContent from './FavoriteLoadingContent';
import FavoriteDataContent from './FavoriteDataContent';
import useSnackbar from '../../hooks/useSnackbar';
import FavoriteErrorContent from './FavoriteErrorContent';


interface FavoriteCardProps {
    data: FavoriteData;
    editMode: boolean;
}

const FavoriteCard = ({ data, editMode }: FavoriteCardProps) => {


    const { currentCondition, loading, error, getCurrentCondition } = useCurrentCondition(data.Key);
    const { snackbar, snackbarHandler } = useSnackbar();

    function refresh() {
        getCurrentCondition(data.Key);
    }

    if (loading)
        return <Card sx={{ minWidth: 320, height: 300 }}>
            <FavoriteLoadingContent city={data.LocalizedName} />
        </Card>

    if (error)
        return <Card sx={{ minWidth: 320, height: 300 }}>
            <FavoriteErrorContent title={data.LocalizedName} error={error} onRefresh={refresh} />
        </Card>

    return <Card sx={{ minWidth: 320, height: 300 }}>
        {currentCondition ?
            <FavoriteDataContent favorite={data} data={currentCondition} onRefresh={refresh} editMode={editMode} />
            :
            <p>"UH-HO"</p>
        }
    </Card>


};
// }, (prev, next) => prev.data.Key === next.data.Key && prev.editMode === next.editMode);





export default FavoriteCard;
