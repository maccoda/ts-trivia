import * as React from 'react';
import { shallow, configure, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
import ResponseLabel from '../ResponseLabel';

configure({ adapter: new Adapter() });

describe('ResponseLabel', () => {
  it('should render text', () => {
    const text = 'text';
    const wrapper: ShallowWrapper<any, any> = shallow(
      <ResponseLabel text={text} />
    );
    expect(wrapper.find('h4').text()).toBe(text);
  });
});
