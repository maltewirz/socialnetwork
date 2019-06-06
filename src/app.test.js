// import React from 'react';
// import App from './app';
// import {shallow} from 'enzyme';
// import axios from './axios';
//
// //this will create the mock of axios that will have all methods of axios except those mthods don't do anything.
// jest.mock("./axios");
//
// test('app sets state in componentDidMount', async () => {
//     axios.get.mockResolvedValue({
//         data: {
//             bio:"some test bio",
//             first:"test first",
//             last: "test last",
//             pic_url: 'someTestIMg.jpg'
//         }
//     });
//
//     const wrapper = shallow(
//         <App />, {
//             disableLifecycleMethods: true
//         }
//     );
//
//     await wrapper.instance().componentDidMount();
//
//     expect(
//         wrapper.state('first')
//     ).toBe("test first");
//
// });
