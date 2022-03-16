import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';

import SpeciesMain from '../SpeciesMain.vue';

describe('SpeciesMain', () => {
    let wrapper : VueWrapper;

    beforeEach(() => {
        wrapper = mount(SpeciesMain);
    });

    it('validates usage of router view', () => {
        expect(wrapper.html()).toContain('<router-view>');
    });
});
