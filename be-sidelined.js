import { define } from 'be-decorated/be-decorated.js';
import { register } from 'be-hive/register.js';
export class BeSidelined extends EventTarget {
    closestRef;
    async subscribeToProp({ self, set, onClosest, proxy }) {
        const target = self.closest(onClosest);
        if (target === null)
            throw `${onClosest} 404`;
        this.closestRef = new WeakRef(target);
        const { subscribe } = await import('trans-render/lib/subscribe.js');
        await subscribe(target, set, () => {
            proxy.propChangeCnt++;
        });
        proxy.propChangeCnt++;
        proxy.resolved = true;
    }
    compareVals({ closestRef, set, toVal }) {
        const ref = closestRef.deref();
        if (ref === undefined)
            return;
        const actualVal = ref[set];
        const valsDoNotMatch = actualVal !== toVal;
        const valsMatch = !valsDoNotMatch;
        return {
            valsDoNotMatch,
            valsMatch,
        };
    }
    #abortController;
    addListener({ when, is, set, toVal }) {
        const target = globalThis[when];
        if (this.#abortController !== undefined) {
            this.#abortController.abort();
        }
        this.#abortController = new AbortController();
        target.addEventListener(is, () => {
            if (this.closestRef === undefined)
                return;
            const ref = this.closestRef.deref();
            if (ref === undefined)
                return;
            ref[set] = toVal;
        });
    }
    removeListener({}) {
        if (this.#abortController !== undefined) {
            this.#abortController.abort();
            this.#abortController = undefined;
        }
    }
    async finale(proxy, target) {
        const { unsubscribe } = await import('trans-render/lib/subscribe.js');
        unsubscribe(target);
    }
}
const tagName = 'be-sidelined';
const ifWantsToBe = 'sidelined';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
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
        actions: {
            subscribeToProp: {
                ifAllOf: ['set', 'onClosest']
            },
            compareVals: {
                ifAllOf: ['propChangeCnt', 'closestRef', 'set']
            },
            addListener: {
                ifAllOf: ['closestRef', 'set', 'when', 'valsDoNotMatch']
            },
            removeListener: {
                ifAllOf: ['valsMatch'],
            }
        }
    },
    complexPropDefaults: {
        controller: BeSidelined
    }
});
register(ifWantsToBe, upgrade, tagName);
