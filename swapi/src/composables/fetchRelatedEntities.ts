import { ref, type Ref, watch } from "vue";

export function useFetchRelatedEntities(selectedEntity : Ref) {
    const relatedEntities = ref({});
    watch(() => selectedEntity.value, () => {
        extractRelatedEntities();
    });

    function extractRelatedEntities() {
        for (const key in selectedEntity.value) {
            // console.log(`${key}: ${selectedEntity.value[key]}`);
        }
    }

    return {
        relatedEntities
    };

}
