import { ref } from 'vue';

export function useExtractId(url : string) {
    const entityId = ref('');
    extractId();

    function extractId() {
        const urlComponents = url.split('/');
        entityId.value = urlComponents[urlComponents.length - 2];
    }

    return {
        entityId
    };
}
