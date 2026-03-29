<script lang="ts">
	import { Button } from '@repo/ui/button';
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';
	import * as Field from '@repo/ui/field';
	import { Input } from '@repo/ui/input';
	import { Checkbox } from '@repo/ui/checkbox';
	import { Label } from '@repo/ui/label';
	import { toast } from 'svelte-sonner';
	import { SvelteMap } from 'svelte/reactivity';
	import { asset } from '$app/paths';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
	let loading = $state(false);
	let invalidFields = new SvelteMap<string, string>();

	$effect(() => {
		if (!form) return;
		if (!form?.error) return;
		if (form?.message) toast.error(form.message);
		invalidFields.clear();
		if (form?.errors) {
			for (const error of form.errors) {
				invalidFields.set(error.field as string, error.message);
			}
		}
	});
</script>

<div class="relative flex grow flex-col items-center justify-center">
	<div
		class="w-full max-w-sm animate-in rounded-md bg-input/30 p-px duration-300 zoom-in-80"
	>
		<form
			action="?/signUp"
			method="POST"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					update({ reset: false });
					loading = false;
				};
			}}
			class="flex flex-col space-y-8 rounded-[calc(var(--radius)-1px)] bg-background px-4 py-6 shadow"
		>
			<div class="text-center">
				<div class="mx-auto size-10 rounded bg-card p-2">
					<!-- svelte-ignore a11y_missing_attribute -->
					<img src={asset('/favicon.png')} class="size-full" />
				</div>
				<h1 class="mt-4 mb-1 text-xl font-semibold">Sign up</h1>
				<p class="text-sm">Welcome! Sign up to continue</p>
			</div>

			<Field.Field data-invalid={invalidFields.has('username') || undefined}>
				<Field.Label for="username">Username</Field.Label>
				<Input
					name="username"
					type="username"
					placeholder="John Doe"
					aria-invalid={invalidFields.has('username') || undefined}
				/>
				{#if invalidFields.has('username')}
					<Field.Error>{invalidFields.get('username')}</Field.Error>
				{/if}
			</Field.Field>

			<Field.Field data-invalid={invalidFields.has('email') || undefined}>
				<Field.Label for="email">E-mail</Field.Label>
				<Input
					name="email"
					type="email"
					placeholder="jhon@doe.com"
					aria-invalid={invalidFields.has('email') || undefined}
				/>
				{#if invalidFields.has('email')}
					<Field.Error>{invalidFields.get('email')}</Field.Error>
				{/if}
			</Field.Field>

			<Field.Field data-invalid={invalidFields.has('password') || undefined}>
				<Field.Label for="password">Password</Field.Label>
				<Input
					name="password"
					type="password"
					placeholder="••••••••"
					aria-invalid={invalidFields.has('password') || undefined}
				/>
				{#if invalidFields.has('password')}
					<Field.Error>{invalidFields.get('password')}</Field.Error>
				{/if}
			</Field.Field>

			<div class="flex items-center gap-3">
				<Checkbox name="rememberMe" checked={true} />
				<Label for="rememberMe">Remember me</Label>
			</div>

			<Button {loading} type="submit">Sign up</Button>
		</form>

		<div class="px-2 py-4">
			<p class="font-base text-center text-sm">
				Already have an account ? <a
					href={resolve('/auth/log-in')}
					class="px-2 font-medium text-primary">Log in</a
				>
			</p>
		</div>
	</div>
</div>
