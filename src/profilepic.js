import React from 'react';

export function ProfilePic({imageUrl, first, last, clickHandler}) {
    imageUrl = imageUrl || './avatar.png';
    return (<img src={imageUrl} alt={`${first} ${last}`} onClick={clickHandler} className="avatarImg" />);
}
