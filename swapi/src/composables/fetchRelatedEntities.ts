import { ref, watch, computed, onMounted, type Ref } from 'vue';
import { useEntityStore } from '@/stores/index';
import { constants } from '@/lib/constants/index.js';



export function useFetchRelatedEntities(url : Ref) {

    const store = useEntityStore();
    const isFetchingRelatedEntities = ref(false);

    const relatedEntitiesCol = computed(() => {
        return constants.entities;
    });

    onMounted(async() => {
        // unset the selected entity so it doesn't get displayed initially
        store.entity = null;
        store.isFetchingDetails = true;
        fetchSelectedEntity(url.value);
        store.isFetchingDetails = false;
    });

    watch(
        () => store.entity,
        () => {
            fetchRelatedEntities();
        }
    );

    function fetchSelectedEntity(url : string) {
        store.fetchEntityDetails(url);
    }

    async function fetchRelatedEntities() {
        for (const key in store.selectedEntity) {
            if ((relatedEntitiesCol.value.includes(key))) {
                await fetchRelatedEntityName(store.selectedEntity[key], key);
            }
        }
        isFetchingRelatedEntities.value = false;
    }

    async function fetchRelatedEntityName(url: object, key : string) {
        /**
         * fetches the related entities of fetched entity
         * and stores it
         */
        const relatedEntities = [];
        let modifiedUrl = url;
        if (typeof(url) == 'string') {
            modifiedUrl = {
                0: url
            };
        }

        for (const property in modifiedUrl) {
            isFetchingRelatedEntities.value = true;
            const individualUrl = modifiedUrl[property];
            try {
                const res = await store.fetchRelatedEntityDetails(individualUrl);
                const fetchedEntity = res.data;
                relatedEntities.push(fetchedEntity);
            } catch (error) {
                console.error('fetching related entities details failed', error);
            }
        }

        store.entity[key] = relatedEntities;
    }

    return {
        isFetchingRelatedEntities
    };
}
