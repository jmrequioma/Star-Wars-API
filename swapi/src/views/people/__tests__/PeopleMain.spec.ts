import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';

import PeopleMain from '../PeopleMain.vue';

describe('FilmsMain', () => {
    let wrapper : VueWrapper;

    beforeEach(() => {
        wrapper = mount(PeopleMain);
    });

    it('validates usage of router view', () => {
        expect(wrapper.html()).toContain('<router-view>');
    });
});
