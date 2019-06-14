import React from 'react';
import { shallow } from 'enzyme';
import { FriendButton } from './friendbutton';
import axios from './axios';
jest.mock('./axios');

const wrapper = shallow(<FriendButton />);

test('1. A button is rendered', () => {
    expect(
        wrapper.find('button').length
    ).toBe(1);
});
