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
import WatchlistNotifications from '../WatchlistNotifications-mock';

let wrapper;
jest.setTimeout(30000);

  describe('WATCHLIST AND NOTIFICATIONS', () => {

    wrapper = shallow( <WatchlistNotifications/> );


  test('Add an neighborhood to the watchlist - happy path', async () => {
      wrapper.instance().setState({
              nbhdName: 'حي الخزامى',
              userID: 622,
              nbhdID:'10100003141',
              nbhdEn: 'Al Khuzama'
          });
        await wrapper.instance().addToWatchlist()
        expect(wrapper.instance().state.addingToWatchlistStatus).toBe(200);
    })

    test('Add an existing neighborhood to the watchlist', async () => {
       wrapper.instance().setState({
              nbhdName: 'حي المرسلات',
              userID: 622,
              nbhdID:'10100003024',
              nbhdEn: 'Al Mursalat'
           });
         await wrapper.instance().addToWatchlist()
         expect(wrapper.instance().state.addingToWatchlistStatus).not.toBe(200);
     })

     test('Toggle Notifications', async () => {
        wrapper.instance().setState({
               userID: 622,
               nbhdID:'10100003024',
            });
          await wrapper.instance().toggleNotification()
          expect(wrapper.instance().state.notificationStatus).toBe('Toggled successfully');
      })



    })
