import React from 'react';
import { BioEditor } from './bioeditor';
import { shallow } from 'enzyme';
import axios from './axios';
jest.mock('./axios');

test('1. When no bio is passed to it, an "Add" button is rendered.', () => {
    const wrapper = shallow(<BioEditor />);

    expect(
        wrapper.find('.addBio').length
    ).toBe(1);

    expect(
        wrapper.find('.addButton').length
    ).toBe(1);
});


test('2. When a bio is passed to it, an "Edit" button is rendered.', () => {
    const wrapper = shallow(<BioEditor bio="myBio"/>
    );

    expect(
        wrapper.find('.editBio').length
    ).toBe(1);

    expect(
        wrapper.find('.editButton').length
    ).toBe(1);
});

test('3a. Clicking the "Add" button causes a textarea and a "Save" button to be rendered.', () => {
    const clickHandler = jest.fn();
    const wrapper = shallow(<BioEditor />);

    wrapper.find('button').simulate('click');

    expect(
        wrapper.find('.saveButton').length
    ).toBe(1);
});

test('3b. Clicking the "Edit" button causes a textarea and a "Save" button to be rendered.', () => {
    const clickHandler = jest.fn();
    const wrapper = shallow(<BioEditor bio="myBio"/>);

    wrapper.find('button').simulate('click');

    expect(
        wrapper.find('.saveButton').length
    ).toBe(1);
});

test('4. Clicking the "Save" button causes an ajax request.', () => {
    axios.get.mockResolvedValue({
        success: true
    });

    const wrapper = shallow(
        <BioEditor bio="myBio" />
    );

});
