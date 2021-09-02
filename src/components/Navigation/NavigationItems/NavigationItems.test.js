import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it('should render two <NavigationItem/> if user is not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it('should render three <NavigationItem/> if user is authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it('should render 1 logout <NavigationItem/> if user is authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>)).toEqual(true);
  });
});