import React from 'react';
import { ProfilePic } from "./profilepic";
import { shallow } from 'enzyme';

test("when passed profilePic prop, the ProfilePic component renders that image", () => {
    const wrapper = shallow(<ProfilePic imageUrl='/test.png'/>);

    expect(
        wrapper.find('img').prop('src')
    ).toBe('/test.png');
});

test('When no url is passed our default image is in src', () => {
    const wrapper = shallow(<ProfilePic />);

    expect(
        wrapper.find('img').prop('src')
    ).toBe('./avatar.png');
});

test('first and last name appear in alt', () => {
    const wrapper = shallow(<ProfilePic first="adam" last="sandler"/>);

    expect(
        wrapper.find('img').prop('alt')
    ).toBe('adam sandler');
});

test('passing prop onClick will be invoked when user clicks on image', () => {
    const clickHandler = jest.fn();
    console.log("clickHandler in test",clickHandler);
    const wrapper = shallow(
        <ProfilePic clickHandler={ clickHandler } />
    );

    wrapper.find('img').simulate('click');

    expect(
        clickHandler.mock.calls.length
    ).toBe(1);
});
