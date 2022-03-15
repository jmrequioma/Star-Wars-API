import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';

import PageLoader from '../PageLoader.vue';

describe('NavDrawerMenu', () => {
    let wrapper : VueWrapper;

    beforeEach(() => {
        wrapper = mount(PageLoader);
    });

    it('renders an image within the component', () => {
        expect(wrapper.html()).toContain('img');
    });
});
