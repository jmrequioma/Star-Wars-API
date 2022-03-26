import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';

import mitt from 'mitt';

import HomeView from '../HomeView.vue';

describe('HomeView', () => {
    let wrapper : VueWrapper;
    const emitter = mitt();

    beforeEach(() => {
        wrapper = mount(HomeView, {
            global: {
                provide: {
                    emitter: emitter
                }
            }
        });
    });

    it('broadcasts the opening of the NavDrawerMenu Component', () => {
        const searchButton = wrapper.find('v-btn');

        searchButton.trigger('click');

        expect(wrapper.emitted().click).toBeTruthy();
    });
});
