import * as React from 'react';
import { shallow, ShallowWrapper, configure } from 'enzyme';
import App from '../App';
import * as Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });
let app: ShallowWrapper<undefined, undefined>;

describe('Basic application testing', () => {
  beforeEach(() => (app = shallow(<App title="App" />)));

  it('should render the title from the property', () => {
    expect(app.find('h1').text()).toBe('App');
  });
});
