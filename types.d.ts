import {MinimalProxy} from 'be-decorated/types';
import {MatchRHS} from 'trans-render/lib/types';

export interface BeSidelinedVEndUserProps {
    transform: {[key:string]: MatchRHS},
    closest: string,
    when
}

