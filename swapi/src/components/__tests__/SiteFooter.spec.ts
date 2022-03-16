import { describe, it, expect, beforeEach } from 'vitest';

import { mount, VueWrapper } from '@vue/test-utils';
import SiteFooter from '../SiteFooter.vue';

describe('SiteFooter', () => {
    let wrapper : VueWrapper;

    beforeEach(() => {
        wrapper = mount(SiteFooter);
    });

    it('validates the social links', () => {
        const igBtn = wrapper.find('v-btn.ig-btn');
        const linkedinBtn = wrapper.find('v-btn.linkedin-btn');
        const gmailBtn = wrapper.find('v-btn.gmail-btn');

        expect(igBtn.attributes().href).toBe(
            'https://www.instagram.com/roamherome/'
        );
        expect(linkedinBtn.attributes().href).toBe(
            'https://www.linkedin.com/in/jerome-enrico-requioma-2a954a195/'
        );
        expect(gmailBtn.attributes().href).toBe(
            'mailto:j.requioma@arcanys.com'
        );
    });
});
