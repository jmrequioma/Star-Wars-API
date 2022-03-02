import { describe, it, expect, beforeEach } from 'vitest';

import { mount, VueWrapper } from '@vue/test-utils';
import SiteFooter from '../SiteFooter.vue';

describe('SiteFooter', () => {
    let wrapper : VueWrapper;

    beforeEach(() => {
        wrapper = mount(SiteFooter);
    });

    it('redirects to the correct social links', () => {
        const igBtn = wrapper.find('v-btn.ig-btn');
        const linkedinBtn = wrapper.find('v-btn.linkedin-btn');
        const twitterBtn = wrapper.find('v-btn.twitter-btn');

        expect(igBtn.attributes().href).toBe(
            'https://www.instagram.com/roamherome/'
        );
        expect(linkedinBtn.attributes().href).toBe(
            'https://www.linkedin.com/in/jerome-enrico-requioma-2a954a195/'
        );
        expect(twitterBtn.attributes().href).toBe(
            'https://www.twitter.com/SayHieronimo/'
        );
    });
});
