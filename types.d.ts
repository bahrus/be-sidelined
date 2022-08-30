import {MinimalProxy} from 'be-decorated/types';

export interface BeSidelinedVEndUserProps {
    set: string,
    onClosest: string,
    toVal: any,
    when: string,
    is: string,
    outsideClosest: string
}

export interface BeSidelinedVirtualProps extends BeSidelinedVEndUserProps, MinimalProxy{}

export interface BeSidelinedProps extends BeSidelinedVirtualProps{
    proxy: Element & BeSidelinedVirtualProps
}

export interface BeSidelinedActions{
    
}

