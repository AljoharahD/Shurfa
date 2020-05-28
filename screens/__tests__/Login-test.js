import React from 'react';
import {
    configure
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
    shallow
} from 'enzyme';
configure({
    adapter: new Adapter()
});
import Login from '../Login-mock';

let wrapper;
jest.setTimeout(30000);

  describe('Login function', () => {

    wrapper = shallow( <Login/> );
    
    test('Login with correct credentials', async () => {
      wrapper.instance().setState({
              email: 'Layla@gmail.com',
              password: 'Layla',
          });
      await wrapper.instance().handleLogin()
        expect(wrapper.instance().state.loginStatus).toBe(200);
    })

    test('Login with wrong credentials', async () => {
      wrapper.instance().setState({
              email: 'Layla@gmail.com',
              password: 'Layla1234',
          });
      await wrapper.instance().handleLogin()
        expect(wrapper.instance().state.loginStatus).toBe(404);
    })

    test('Login with empty credentials', async () => {
      wrapper.instance().setState({
              email: '',
              password: '',
          });
      await wrapper.instance().handleLogin()
        expect(wrapper.instance().state.loginStatus).toBe(404);
    })

    })
