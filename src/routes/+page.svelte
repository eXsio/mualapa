<script>
    import {Collection, SignedIn} from "sveltefire";
</script>

<h1>Welcome to MUALApka!</h1>

<SignedIn>
  <Collection ref="mualas" let:data={mualas}>
    {#each mualas as muala}
      <h2>{muala.name}</h2>
      <p>{muala.episodeUrl}</p>
    {/each}
  </Collection>

</SignedIn>
