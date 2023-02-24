import React, {FC} from 'react';

type PopupProps = {
    title: string
}

export const Popup: FC<PopupProps> = ({title}: PopupProps) => {
    return (
        <div>
            <span>{title}</span>
        </div>
    );
};