<script lang="ts">
    import { resolve } from '$app/paths';
    import { Button } from '@repo/ui/button';
</script>

<Button href={resolve("/auth/log-out")}>Log-out</Button>
