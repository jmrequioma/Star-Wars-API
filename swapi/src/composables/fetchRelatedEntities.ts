import { ref, watch, computed, onMounted, type Ref } from 'vue';
import { useEntityStore } from '@/stores/index';
import { constants } from '@/lib/constants/index.js';



export function useFetchRelatedEntities(url : Ref) {

    const store = useEntityStore();
    const isFetchingRelatedEntities = ref(false);

    const relatedEntitiesCol = computed(() => {
        return constants.entities;
    });

    onMounted(() => {
        store.isFetchingDetails = true;
        fetchPeople(url.value);
    });

    watch(
        () => store.entity,
        () => {
            fetchRelatedEntities();
        }
    );

    function fetchPeople(url : string) {
        store.fetchEntityDetails(url);
    }

    function fetchRelatedEntities() {
        for (const key in store.selectedEntity) {
            if ((relatedEntitiesCol.value.includes(key))) {
                fetchRelatedEntityName(store.selectedEntity[key], key);
            }
        }
    }

    async function fetchRelatedEntityName(url: object, key : string) {
        /**
         * fetches the related entities of fetched entity
         * and stores it
         */
        isFetchingRelatedEntities.value = true;
        const relatedEntities = [];
        let modifiedUrl = url;
        if (typeof(url) == 'string') {
            modifiedUrl = {
                0: url
            };
        }

        for (const property in modifiedUrl) {
            const individualUrl = modifiedUrl[property];
            try {
                const res = await store.fetchRelatedEntityDetails(individualUrl);
                const fetchedEntity = res.data;
                relatedEntities.push(fetchedEntity);
            } catch (error) {
                console.error('fetching related entities details failed', error);
            } finally {
                store.isFetchingDetails = false;
            }
        }

        store.entity[key] = relatedEntities;
        isFetchingRelatedEntities.value = false;
    }

    return {
        isFetchingRelatedEntities
    };
}
