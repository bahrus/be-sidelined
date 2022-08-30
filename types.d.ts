import {MinimalProxy} from 'be-decorated/types';

export interface BeSidelinedVEndUserProps {
    set: string,
    onClosest: string,
    toVal: any,
    when: string,
    is: string,
    outsideClosest: string,
    onEventType: string
}

export interface BeSidelinedVirtualProps extends BeSidelinedVEndUserProps, MinimalProxy{
    valsDoNotMatch: boolean;
    valsMatch: boolean;
    propChangeCnt: number;
    closestRef: WeakRef<Element> | undefined;
}

export interface BeSidelinedProps extends BeSidelinedVirtualProps{
    proxy: Element & BeSidelinedVirtualProps
}

export interface BeSidelinedActions{
    subscribeToProp(self: this): Promise<void>;
    compareVals(self: this): void;
    addOutsideListener(self: this): void;
    removeOutsideListener(self: this): void;
    addLocalListener(self: this): void;
    finale(proxy: Element & BeSidelinedVirtualProps, target:Element): Promise<void>; 
}

