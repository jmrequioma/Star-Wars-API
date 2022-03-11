import { ref, watch, computed, onMounted, type Ref } from 'vue';
import { useEntityStore } from '@/stores/index';
import { useAppStore } from '@/stores/app';
import { constants } from '@/lib/constants/index.js';
import { useExtractId } from './extractId';
import { useTranslateWookiee } from './translateWookiee';

export function useFetchRelatedEntities(url : Ref) {

    const store = useEntityStore();
    const appStore = useAppStore();
    const isFetchingRelatedEntities = ref(false);

    const { translateWookieeToEnglish } = useTranslateWookiee();
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
                    const fetchedEntity = res;
                    relatedEntities.push(fetchedEntity);
                } catch (error) {
                    console.error('fetching related wookiee entities details failed', error);
                }
            } else {
                individualUrl = modifiedUrl[property];
                try {
                    const res = await store.fetchRelatedEntityDetails(individualUrl);
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

        // entityName.value here will be an extracted wookiee word since
        // the url is in wookiee, we pass said url to the translator

        const translatedWookieWord = translateWookieeToEnglish(entityName.value);

        return `${constants.baseUrl}${translatedWookieWord}/${entityId.value}/?format=wookiee`;
    }

    return {
        isFetchingRelatedEntities
    };
}
