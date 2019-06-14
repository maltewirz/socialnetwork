import React from 'react';
import { App } from '../src/app';
import {shallow} from 'enzyme';
import axios from '../src/axios';

//this will create the mock of axios that will have all methods of axios except those mthods don't do anything.
jest.mock("../src/axios");

test('app sets state in componentDidMount', async () => {
    axios.get.mockResolvedValue({
        data: {
            bio: "some test bio",
            first: "test first",
            last: "test last",
            pic_url: "someTestImg.jpg"
        }
    });

    const wrapper =  shallow(
        <App />,
        {
            disableLifecycleMethods: true
        }
    );

    await wrapper.instance().componentDidMount();

    expect(
        wrapper.state("first")
    ).toBe("test first");

});
