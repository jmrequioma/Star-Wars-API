import { ref, watch, type Ref } from 'vue';
import axios from 'axios';

export function useFetch(url : Ref) {
    const selectedEntity = ref({});
    const error = ref('');

    watch(url, (newUrl) => {
        fetchEntity(newUrl);

    });

    async function fetchEntity(url : string) {
        // fetch specific entity
        try {
            const res = await axios.get(url);
            selectedEntity.value = res.data;
        } catch (error) {
            console.error(error);
        }
    }

    return {
        selectedEntity,
        error
    };
}
