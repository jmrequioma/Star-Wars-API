import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NavDrawerMenu from '../NavDrawerMenu.vue';

describe('NavDrawerMenu', () => {
    it('renders properly', () => {
        const wrapper = mount(NavDrawerMenu);
    });
});
