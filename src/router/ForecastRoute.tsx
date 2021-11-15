import { useParams } from 'react-router'
import ForecastSummary from '../components/ForecastSummary'

export default function ForecastRoute() {

    const params = useParams();

    return params.id ? <ForecastSummary id={params.id} /> : null;
}
