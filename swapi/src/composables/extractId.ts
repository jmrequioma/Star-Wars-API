import { ref } from 'vue';

export function useExtractId(url : string) {
    const entityId = ref('');
    extractId(url);

    function extractId(url : string) {
        const urlComponents = url.split('/');
        entityId.value = urlComponents[urlComponents.length - 2];
    }

    return {
        entityId
    };
}