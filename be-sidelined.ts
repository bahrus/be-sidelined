import {define, BeDecoratedProps, BeDecoratedCore} from 'be-decorated/be-decorated.js';
import {register} from 'be-hive/register.js';
import {BeSidelinedActions, BeSidelinedProps, BeSidelinedVirtualProps} from './types';

export class BeSidelined extends EventTarget implements BeSidelinedActions{
    closestRef: WeakRef<Element> | undefined;
    async subscribeToProp({self, set, onClosest, proxy}: this): Promise<void> {
        console.log('iah');
        const target = self.closest(onClosest);
        if(target === null) throw `${onClosest} 404`;
        proxy.closestRef = new WeakRef(target);
        const {subscribe} = await import('trans-render/lib/subscribe.js');
        await subscribe(target, set, () => {
            proxy.propChangeCnt++;
        });
        proxy.propChangeCnt++;
        proxy.resolved = true;
    }

    compareVals({closestRef, set, toVal}: this){
        const ref = closestRef!.deref();
        if(ref === undefined) return;
        const actualVal = (<any>ref)[set];
        const valsDoNotMatch = actualVal !== toVal;
        const valsMatch = !valsDoNotMatch;
        return {
            valsDoNotMatch,
            valsMatch,
        }
    }

    #abortController: AbortController | undefined;
    addListener({when, is, set, toVal, outsideClosest, self}: this): void {
        const target = (<any>globalThis)[when] as EventTarget;
        if(this.#abortController !== undefined){
            this.#abortController.abort();
        }
        this.#abortController = new AbortController();
        target.addEventListener(is, (e) => {
            
            
            const outside = self!.closest(outsideClosest!);
            if(outside?.contains(e.target as Element)) return;
            if(this.closestRef === undefined) return;
            const ref = this.closestRef.deref();
            if(ref === undefined) return;
            (<any>ref)[set] = toVal;
        });
    }

    removeListener({}: this){
        if(this.#abortController !== undefined){
            this.#abortController.abort();
            this.#abortController = undefined;
        }
    }

    async finale(proxy: Element & BeSidelinedVirtualProps, target: Element) {
        const {unsubscribe} = await import('trans-render/lib/subscribe.js');
        unsubscribe(target);

    }

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
            virtualProps: ['set', 'onClosest', 'toVal', 'when', 'is', 
                'outsideClosest', 'valsDoNotMatch', 'valsMatch', 'propChangeCnt', 'closestRef'],
            proxyPropDefaults: {
                set: 'open',
                onClosest: '*',
                toVal: false,
                when: 'document',
                is: 'click',
                outsideClosest: '*',
                valsDoNotMatch: true,
                valsMatch: false,
                propChangeCnt: 0
            }
        },
        actions:{
            subscribeToProp: {
                ifAllOf: ['set', 'onClosest']
            },
            compareVals: {
                ifAllOf: ['propChangeCnt', 'closestRef', 'set']
            },
            addListener: {
                ifAllOf: ['closestRef', 'set', 'when', 'valsDoNotMatch', 'outsideClosest']
            },
            removeListener: {
                ifAllOf: ['valsMatch'],
            }
        }
    },
    complexPropDefaults:{
        controller: BeSidelined
    }
});

register(ifWantsToBe, upgrade, tagName);