<script>

    import {SignedIn} from "sveltefire";
    import { Card } from 'flowbite-svelte';
    import {LeafletMap, Marker, TileLayer} from 'svelte-leafletjs';
    import { collectionStore } from 'sveltefire';
    import {firestore} from "$lib/firebase.client";
    const mapOptions = {
        center: [52.25142281982823, 22.373216600329556],
        zoom: 6,
    };
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileLayerOptions = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "© OpenStreetMap contributors",
    };

    const mualas = collectionStore(firestore, 'mualas');
</script>

<SignedIn>
  <div style="display: flex">
    <div style="height: 75vh;overflow-x: hidden; overflow-y: auto">

      {#each $mualas as muala}
        <Card class="pl-2 pr-2">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{muala.name}</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight"><a target="_blank" href="{muala.episodeUrl}">YT</a> </p>
        </Card>

      {/each}

    </div>
    <div style="flex-grow: 100; " class="ml-3">
      <LeafletMap options={mapOptions}>
        <TileLayer url={tileUrl} options={tileLayerOptions}/>
          {#each $mualas as muala}
            <Marker latLng={[muala.geo.latitude, muala.geo.longitude]}/>-->
          {/each}
      </LeafletMap>
    </div>

  </div>

</SignedIn>
