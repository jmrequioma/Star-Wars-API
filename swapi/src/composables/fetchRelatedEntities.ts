import { ref, watch, computed, onMounted, type Ref } from 'vue';
import { useEntityStore } from '@/stores/index';
import { useAppStore } from '@/stores/app';
import { constants } from '@/lib/constants/index.js';

export function useFetchRelatedEntities(url : Ref) {

    const store = useEntityStore();
    const appStore = useAppStore();
    const isFetchingRelatedEntities = ref(false);

    const relatedEntitiesCol = computed(() => {
        return constants.entities.concat(constants.wookieeEntities);
    });

    onMounted(() => {
        if (!store.selectedEntity) {
            store.isFetchingDetails = true;
            fetchSelectedEntity(url.value);
        }
        store.isFetchingDetails = false;
    });

    watch(
        () => url.value,
        () => {
            fetchSelectedEntity(url.value);
        }
    );

    watch(
        () => store.entity,
        () => {
            convertToArray();
        }
    );

    function fetchSelectedEntity(url : string) {
        // unset the selected entity so it doesn't get displayed initially
        store.entity = null;
        if (appStore.isWookieeEncoding) {
            store.fetchWookieeEntityDetails(url);
        } else {
            store.fetchEntityDetails(url);
        }
    }

    function convertToArray() {
        /**
         * converts the string found on
         * related entities columns to an array
         */
        const convertedList = [];
        for (const key in store.entity) {
            if (relatedEntitiesCol.value.includes(key) &&
                typeof(store.entity[key]) == 'string') {
                // push this into an array and make it
                // the new value so we can loop through
                // it on the DataTable Component
                convertedList.push(store.entity[key]);
                store.entity[key] = convertedList;
            }
        }
    }

    return {
        isFetchingRelatedEntities
    };
}
