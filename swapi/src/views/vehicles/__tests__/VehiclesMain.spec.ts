import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';

import VehiclesMain from '../VehiclesMain.vue';

describe('VehiclesMain', () => {
    let wrapper : VueWrapper;

    beforeEach(() => {
        wrapper = mount(VehiclesMain);
    });

    it('validates usage of router view', () => {
        expect(wrapper.html()).toContain('<router-view>');
    });
});
