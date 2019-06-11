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

test('4. Clicking the "Save" button causes an ajax request. The request should not actually happen but mocked by axios.', async () => {
    axios.post.mockResolvedValue({
        data: {
            success: true
        }
    });
    const mockSetBio = jest.fn();
    const wrapper = shallow(<BioEditor setBio={mockSetBio} />);
    wrapper.find('button').simulate('click');
    wrapper.find('.saveButton').simulate('click');
    await wrapper.instance().submit();

    expect(
        mockSetBio.mock.calls.length
    ).toBe(1);  // there will be no more save button.
});

// test('5. When the mock request is successful, the function that was passed as a prop to the component gets called.', async () => {
//     axios.post.mockResolvedValue({
//         data: {
//             success: true
//         }
//     });
//     const wrapper = shallow(<BioEditor />);
//     wrapper.find('button').simulate('click');
//     wrapper.find('.saveButton').simulate('click');
//     await wrapper.instance().setBio();
//     expect(wrapper.state("bio")).toBe("testBio");
// });
