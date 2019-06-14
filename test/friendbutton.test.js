import React from 'react';
import { shallow } from 'enzyme';
import { FriendButton } from '../src/friendbutton';
import axios from '../src/axios';
jest.mock('../src/axios');

const wrapper = shallow(<FriendButton />);

test('1. A button is rendered', () => {
    expect(
        wrapper.find('button').length
    ).toBe(1);
});
