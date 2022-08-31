import {MinimalProxy} from 'be-decorated/types';

export interface BeSidelinedVEndUserProps {

}

export interface BeSidelinedVirtualProps extends BeSidelinedVEndUserProps, MinimalProxy{

}

export interface BeSidelinedProps extends BeSidelinedVirtualProps{
    proxy: Element & BeSidelinedVirtualProps
}

export interface BeSidelinedActions{
 
}

