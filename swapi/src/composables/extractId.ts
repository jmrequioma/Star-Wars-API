import { ref } from 'vue';

export function useExtractId(url : string) {
    const entityId = ref('');
    const entityName = ref('');
    extractId();

    function extractId() {
        const urlComponents = url.split('/');
        entityId.value = urlComponents[urlComponents.length - 2];
        entityName.value = urlComponents[urlComponents.length - 3];
    }

    return {
        entityId,
        entityName
    };
}
