import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';

import PlanetsMain from '../PlanetsMain.vue';

describe('PlanetsMain', () => {
    let wrapper : VueWrapper;

    beforeEach(() => {
        wrapper = mount(PlanetsMain);
    });

    it('validates usage of router view', () => {
        expect(wrapper.html()).toContain('<router-view>');
    });
});
