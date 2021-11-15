import { AutocompleteData } from "../types/autocomplete";
import { CurrentConditionData } from "../types/states";
import autocomplete from './autocomplete.json'
import currentCondition213181 from './currentCondition213181.json'
import currentCondition58175 from './currentCondition58175.json'
import currentCondition347625 from './currentCondition347625.json'
interface Mocks {
    autocomplete: AutocompleteData[];
    currentCondition: { [k: string]: CurrentConditionData };
}

const mocks: Mocks = {
    autocomplete,
    currentCondition: {
        "213181": currentCondition213181,
        "58175": currentCondition58175,
        "347625": currentCondition347625
    }
}

export default mocks;