<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import type { LayoutProps } from './$types';

  let { data, children }: LayoutProps = $props();
</script>

<ModeWatcher />

<main class="min-h-dvh flex flex-col">
  {@render children()}
</main>
