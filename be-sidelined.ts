import {define, BeDecoratedProps, BeDecoratedCore} from 'be-decorated/be-decorated.js';
import {register} from 'be-hive/register.js';
import {BeSidelinedActions, BeSidelinedProps, BeSidelinedVirtualProps} from './types';

export class BeSidelined extends EventTarget implements BeSidelinedActions{

}

export interface BeSidelined extends BeSidelinedProps{}

const tagName = 'be-sidelined';
const ifWantsToBe = 'sidelined';
const upgrade = '*';

define<BeSidelinedProps & BeDecoratedProps<BeSidelinedProps, BeSidelinedActions>, BeSidelinedActions>({
    config:{
        tagName,
        propDefaults:{
            upgrade,
            ifWantsToBe,
            virtualProps: ['set', 'onClosest', 'toVal', 'when', 'is', 'outsideClosest'],
            proxyPropDefaults: {
                set: 'open',
                onClosest: '*',
                toVal: false,
                when: 'document',
                is: 'click',
                outsideClosest: '*'
            }
        },
        actions:{

        }
    },
    complexPropDefaults:{
        controller: BeSidelined
    }
});

register(ifWantsToBe, upgrade, tagName);