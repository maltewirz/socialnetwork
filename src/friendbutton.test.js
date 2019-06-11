import React from 'react';
import { shallow } from 'enzyme';
import { FriendButton } from './friendbutton';
import axios from './axios';
jest.mock('./axios');

const wrapper = shallow(<FriendButton />);
const wrapperId = shallow(<FriendButton otherId=2 />);

test('1. A button is rendered', () => {
    expect(
        wrapper.find('button').length
    ).toBe(1);
});


test('2. The friendButton has two props, myId and otherId', () => {
    console.log("inside test",wrapperId.props());
    expect(
        wrapperId.props().otherId
    ).toEqual(1)
})
