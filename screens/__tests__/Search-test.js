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
import SearchScreen from '../searchScreen-mock';

let wrapper;


  describe('Search screen', () => {
    wrapper = shallow( <SearchScreen/> );
    test('Search for existing neighborhoods', () => {
        expect(wrapper.instance().search('الوا')).toBe(2);
    })
    test('Search for a non existing neighborhood', () => {
        expect(wrapper.instance().search('البساتين')).toBe(0);
    })


    })
