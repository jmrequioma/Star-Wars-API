import axios from 'axios';
import { ref } from 'vue';

export async function useEntityDetails(url : string) {
    const selectedEntity = ref(null);
    console.log(url);
    if (url) {
        console.log('insideeeee');
        await axios.get(url)
            .then((res) => {
                selectedEntity.value = res.data;
            });
    }

    return {
        selectedEntity
    };
}
