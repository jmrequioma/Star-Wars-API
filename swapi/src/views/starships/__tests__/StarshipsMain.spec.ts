import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';

import StarshipsMain from '../StarshipsMain.vue';

describe('StarshipsMain', () => {
    let wrapper : VueWrapper;

    beforeEach(() => {
        wrapper = mount(StarshipsMain);
    });

    it('validates usage of router view', () => {
        expect(wrapper.html()).toContain('<router-view>');
    });
});
