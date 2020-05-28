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
import Register from '../Register-mock';

let wrapper;
jest.setTimeout(30000);

  describe('Register function', () => {

    wrapper = shallow( <Register/> );

    test('Register - happy path', async () => {
      wrapper.instance().setState({
        name:'Leen',
        email:'Leen.4@testing.com',
        password:'leen321',
        confPassword:'leen321',
        nbhd:'حي الياسمين',
        notStat:1,
          });
      await wrapper.instance().handleRegister()
        expect(wrapper.instance().state.registerationStatus).toBe(200);
    })

    test('Register - missing name field', async () => {
      wrapper.instance().setState({
        name:'',
        email:'Leen.1@testing.com',
        password:'leen321',
        confPassword:'leen321',
        nbhd:'حي الياسمين',
        notStat:1,
          });
      await wrapper.instance().handleRegister()
        expect(wrapper.instance().state.registerationStatus).toBe('missing fields');
    })

    test('Register - missing email field', async () => {
      wrapper.instance().setState({
        name:'Leen',
        email:'',
        password:'leen321',
        confPassword:'leen321',
        nbhd:'حي الياسمين',
        notStat:1,
          });
      await wrapper.instance().handleRegister()
        expect(wrapper.instance().state.registerationStatus).toBe('missing fields');
    })

    test('Register - missing password field', async () => {
      wrapper.instance().setState({
        name:'Leen',
        email:'Leen.1@testing.com',
        password:'',
        confPassword:'leen321',
        nbhd:'حي الياسمين',
        notStat:1,
          });
      await wrapper.instance().handleRegister()
        expect(wrapper.instance().state.registerationStatus).toBe('missing fields');
    })

    test('Register - invalid email', async () => {
      wrapper.instance().setState({
        name:'Leen',
        email:'Leen#testing.com',
        password:'leen321',
        confPassword:'leen321',
        nbhd:'حي الياسمين',
        notStat:1,
          });
      await wrapper.instance().validateEmail()
        expect(wrapper.instance().state.emailBorders).toBe('red');
    })

    test('Register - unidentical passwords', async () => {
      wrapper.instance().setState({
        name:'Leen',
        email:'Leen.2@testing.com',
        password:'leen321',
        confPassword:'leen123',
        nbhd:'حي الياسمين',
        notStat:1,
          });
      await wrapper.instance().handleRegister()
        expect(wrapper.instance().state.passErrorMsg).toBe('flex');
    })

    })
