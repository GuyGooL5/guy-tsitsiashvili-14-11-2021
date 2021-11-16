import { useMemo, useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CircularProgress } from '@mui/material'
import FavoriteDataContent from './FavoriteDataContent';
import FavoriteErrorContent from './FavoriteErrorContent';
import { useReduxDispatch } from '../../../redux/store';
import { favoritesSliceActions } from '../../../redux/reducers/favoritesReducer';
import FavoriteCardHeader from './FavoriteCardHeader';
import { FavoriteData } from '../../../types/states';
import getCurrentCondition from '../../../actions/getCurrentCondition';


const LoadingContent = () => <CardContent sx={{ textAlign: "center", flexGrow: 1 }}><CircularProgress size={128} /></CardContent>



interface FavoriteCardProps {
    data: FavoriteData;
    editMode: boolean;
}

const FavoriteCard = ({ data, editMode }: FavoriteCardProps) => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useReduxDispatch();

    const remove = useCallback(() =>
        dispatch(favoritesSliceActions.remove_favorite(data.location.Key))
        , [data.location.Key, dispatch]);

    const refresh = useCallback(async () => {
        setError("");
        setLoading(true);
        try {
            await getCurrentCondition(data.location.Key)(dispatch);

        } catch (e) {
            setError(`${e}`);
        } finally {
            setLoading(false);
        }

    }, [data.location.Key, dispatch]);

    /**This useEffect refreshes the currentCondition only if it's null, otherwise the data presists on remounts.
     */
    useEffect(() => {
        if (!data.currentCondition)
            refresh();
    }, [data.currentCondition, refresh])

    const RenderData = useMemo(() => {
        if (loading) return <LoadingContent />
        if (data.currentCondition) return <FavoriteDataContent favorite={data.location} data={data.currentCondition} />
        return <FavoriteErrorContent error={error} onRemove={remove} />
    }, [data, error, loading, remove])

    return <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 320, height: 300 }}>
        <FavoriteCardHeader editMode={editMode} title={data.location.LocalizedName} loading={loading}
            onRemove={remove} onRefresh={refresh} />
        {RenderData}
    </Card>

};


export default FavoriteCard;
