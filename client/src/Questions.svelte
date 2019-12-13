<script>
  import { onMount } from "svelte";
  import Select from "svelte-select";
  import { Remarkable } from "remarkable";
  var md = new Remarkable(
    //   {
    //   html: true, // Enable HTML tags in source
    //   xhtmlOut: true, // Use '/' to close single tags (<br />)
    //   breaks: true
    // }
    "commonmark"
  );

  let non = [];
  let isVisible = "";
  let searchTerm = "JavaScript";
  let categories = [];
  let selectedValue = null;

  onMount(async () => {
    await getQuestions();
    await getCategories();
  });

  function openAnswer(index) {
    if (isVisible === index) {
      isVisible = "";
    } else {
      isVisible = index;
    }
  }

  async function getQuestions() {
    const res = await fetch(
      `http://localhost:3000/api/multi-field?query=${searchTerm}`
    );
    const results = await res.json();

    non = results.result;
  }

  async function getCategories() {
    const res = await fetch(
      "http://localhost:3000/api/category?field=category"
    );
    const rawReturn = await res.json();

    categories = [
      ...rawReturn.result.buckets.map(category => {
        return {
          value: `${category.key}`,
          label: `${category.key}, ${category.doc_count}`
        };
      })
    ];
  }
</script>

<style>
  ul {
    list-style-type: none;
  }

  .item {
    display: flex;
    flex-direction: column;
    padding: 15px;
    margin: 10px;
    margin-left: 0px;
    border-radius: 2px;
    background: #fffffe;
    color: #5f6c7b;
  }
  .item:hover {
    background: #90b4ce;
  }

  .header {
    display: flex;
    flex-direction: row;
  }

  .search {
    /* display: flex; */
  }

  .category {
    display: flex;
    justify-content: left;
    width: 120px;
  }

  .answer {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  /* https://www.happyhues.co/palettes/3 */
</style>

<div class="overview">
  <div class="search">
    <Select items={categories} bind:selectedValue />
    <input
      class="input"
      type="text"
      name="name"
      autocomplete="off"
      bind:value={searchTerm}
      on:change={() => getQuestions()} />

  </div>

  <ul>
    {#each non as item, i}
      <li class="item" on:click={() => openAnswer(i)}>
        <div class="header">
          <span class="category">{item._source.category}</span>
          <span class="question">{item._source.question}</span>
        </div>

        {#if i === isVisible}
          <div class="answer">
            {@html md.render(item._source.answer)}
          </div>
        {/if}
      </li>
    {/each}
  </ul>
</div>
