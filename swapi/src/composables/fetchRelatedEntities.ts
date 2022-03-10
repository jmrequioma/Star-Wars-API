import { ref, watch, computed, onMounted, type Ref } from 'vue';
import { useEntityStore } from '@/stores/index';
import { useAppStore } from '@/stores/app';
import { constants } from '@/lib/constants/index.js';
import { useExtractId } from './extractId';

export function useFetchRelatedEntities(url : Ref) {

    const store = useEntityStore();
    const appStore = useAppStore();
    const isFetchingRelatedEntities = ref(false);

    const relatedEntitiesCol = computed(() => {
        return constants.entities.concat(constants.wookieeEntities);
    });

    onMounted(() => {
        store.isFetchingDetails = true;
        fetchSelectedEntity(url.value);
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
            fetchRelatedEntities();
        }
    );

    function fetchSelectedEntity(url : string) {
        // unset the selected entity so it doesn't get displayed initially
        store.entity = null;
        if (appStore.isWookieeEncoding) {
            console.log('url----------', url);
            store.fetchWookieeEntityDetails(url);
        } else {
            store.fetchEntityDetails(url);
        }
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
        // check if url is just a string
        // and not an object
        if (typeof(url) == 'string') {
            modifiedUrl = {
                0: url
            };
        }

        for (const property in modifiedUrl) {
            isFetchingRelatedEntities.value = true;
            let individualUrl = '';
            // check if url is in wookiee
            // there is a need to break it down
            // and translate it to a valid http request url
            if (appStore.isWookieeEncoding) {
                individualUrl = convertWookieeUrl(modifiedUrl[property]);
                try {
                    const res = await store.fetchRelatedWookieEntities(individualUrl);
                    console.log(res);
                    const fetchedEntity = res;
                    relatedEntities.push(fetchedEntity);
                } catch (error) {
                    console.error('fetching related wookiee entities details failed', error);
                }
            } else {
                individualUrl = modifiedUrl[property];
                try {
                    const res = await store.fetchRelatedEntityDetails(individualUrl);
                    console.log(res);
                    const fetchedEntity = res.data;
                    relatedEntities.push(fetchedEntity);
                } catch (error) {
                    console.error('fetching related entities details failed', error);
                }
            }
        }

        // set the data on the selected entity so it displays the related entities
        // and user can click on those and be redirected
        store.entity[key] = relatedEntities;
    }

    function convertWookieeUrl(wookieeUrl : string) {
        const { entityId, entityName } = useExtractId(wookieeUrl);

        // TODO: add logic to check for these constants
        if (entityName.value == 'rcwocahwawowhaoc' || entityName.value == 'akwoooakanwo'
        || entityName.value == 'oaacrarcraoaaoworcc') {
            entityName.value = 'people';
        } else if (entityName.value == 'wwahanscc') {
            entityName.value = 'films';
        } else if (entityName.value == 'cakwooaahwoc') {
            entityName.value = 'species';
        } else if (entityName.value == 'akanrawhwoaoc') {
            entityName.value = 'planets';
        } else if (entityName.value == 'caorarccacahakc') {
            entityName.value = 'starships';
        } else if (entityName.value == 'howoacahoaanwoc') {
            entityName.value = 'vehicles';
        }

        return `${constants.baseUrl}${entityName.value}/${entityId.value}/?format=wookiee`;
    }

    return {
        isFetchingRelatedEntities
    };
}
