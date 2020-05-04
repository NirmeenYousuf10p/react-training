import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter()});

describe('Navigation Items', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
    });

    it('should render two Navigation item elements if not authenticaticated', ()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three Navigation item elements if authenticaticated', ()=>{
        wrapper.setProps({
            isAuthenticated: true
        });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should contain Logout Navigation item element if authenticaticated', ()=>{
        wrapper.setProps({
            isAuthenticated: true
        });
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    });
});