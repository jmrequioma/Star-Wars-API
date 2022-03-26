import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';

import FilmsMain from '../FilmsMain.vue';

describe('FilmsMain', () => {
    let wrapper : VueWrapper;

    beforeEach(() => {
        wrapper = mount(FilmsMain);
    });

    it('validates usage of router view', () => {
        expect(wrapper.html()).toContain('<router-view>');
    });
});
