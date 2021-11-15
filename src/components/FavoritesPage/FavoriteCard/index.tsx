import { useMemo, useCallback } from 'react'
import { Card, CardContent, CircularProgress } from '@mui/material'
import useCurrentCondition from '../../../hooks/useCurrentCondition';
import FavoriteDataContent from './FavoriteDataContent';
import FavoriteErrorContent from './FavoriteErrorContent';
import { useReduxDispatch } from '../../../redux/store';
import { favoritesSliceActions } from '../../../redux/reducers/favoritesReducer';
import FavoriteCardHeader from './FavoriteCardHeader';
import { FavoriteData } from '../../../types';


const LoadingContent = () => <CardContent sx={{ textAlign: "center", flexGrow: 1 }}><CircularProgress size={128} /></CardContent>



interface FavoriteCardProps {
    data: FavoriteData;
    editMode: boolean;
}

const FavoriteCard = ({ data, editMode }: FavoriteCardProps) => {

    const { currentCondition, loading, error, getCurrentCondition } = useCurrentCondition(data.Key);
    const dispatch = useReduxDispatch();
    const refresh = useCallback(() => getCurrentCondition(data.Key), [data.Key, getCurrentCondition]);
    const remove = useCallback(() => dispatch(favoritesSliceActions.remove_favorite(data.Key)), [data.Key, dispatch]);

    const RenderData = useMemo(() => {
        if (loading) return <LoadingContent />
        if (currentCondition) return <FavoriteDataContent favorite={data} data={currentCondition} />
        return <FavoriteErrorContent error={error} onRemove={remove} />
    }, [currentCondition, data, error, loading, remove])

    return <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 320, height: 300 }}>
        <FavoriteCardHeader editMode={editMode} title={data.LocalizedName} loading={loading}
            onRemove={remove} onRefresh={refresh} />
        {RenderData}
    </Card>

};


export default FavoriteCard;
