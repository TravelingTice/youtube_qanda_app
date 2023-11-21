<script lang="ts">
  import type { ActionData } from './$types'

  export let form: ActionData
</script>

<!-- Input URL Page -->
<div class="min-h-screen flex flex-col items-center justify-center">
	<div class="mb-4">
		<img src="/youtube.png" alt="YouTube Logo" class="w-16 h-16" />
	</div>
	<h1 class="text-2xl font-bold mb-6">YouTube Video Q&A App!</h1>

	{#if form?.answered}
		<div class="bg-white shadow overflow-hidden sm:rounded-lg w-full max-w-xs p-4">
			<div class="px-4 py-5 sm:px-6">
				<h3 class="text-lg leading-6 font-medium text-gray-900">Video: {form?.title}</h3>
				<p class="mt-1 max-w-2xl text-sm text-gray-500">Question: {form?.question}</p>
				<p class="mt-1 max-w-2xl text-sm text-gray-500">Answer: {form?.answer}</p>
			</div>
		</div>
		<form method="POST" action="?/askNewQuestion">
			<button
				id="askAnother"
				class="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
				type="submit"
			>
				Ask another question
			</button>
		</form>
	{:else if form?.loaded}
		<form class="w-full max-w-xs" method="POST" action="?/askQuestion">
			<label for="question" class="block text-sm font-medium text-gray-700"
				>Ask a question about the video {form.title}</label
			>
			<div class="mt-1">
				<input
					type="text"
					name="question"
					id="question"
					class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
					placeholder="Question"
				/>
			</div>
			<button
				type="submit"
				class="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
				>Submit</button
			>
		</form>
	{:else}
		<form class="w-full max-w-xs" method="POST" action="?/loadVideo">
			<label for="url" class="block text-sm font-medium text-gray-700"> Input a video url: </label>
			<div class="mt-1 flex rounded-md shadow-sm">
				<input
					type="url"
					name="url"
					id="url"
					class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
					placeholder="https://"
				/>
			</div>
			<button
				type="submit"
				class="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
				>Submit</button
			>
		</form>
	{/if}
</div>
