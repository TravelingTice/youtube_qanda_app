<script lang="ts">
  import type { ActionData } from './$types'

  export let form: ActionData
</script>

<!-- Input URL Page -->
<div class="min-h-screen flex flex-col items-center justify-center">
	<div class="mb-4 flex items-center">
		<img src="/youtube.png" alt="YouTube Logo" class="w-16 h-16 mr-4" />
		<h1 class="text-2xl font-bold">YouTube Video Q&A App!</h1>
	</div>

	<div class="px-6 w-full max-w-lg">
		{#if form?.answered}
			<div class="bg-white shadow rounded-lg w-full p-4">
				<div class="px-4 py-5 sm:px-6">
					<p class="font-medium text-gray-900">Video: {form?.title}</p>
					<p class="mt-1 text-gray-500">
						Question:<br /><span class="text-gray-900">{form?.question}</span>
					</p>
					<p class="mt-1 text-gray-500">
						Answer:<br /><span class="text-gray-900">{form?.answer}</span>
					</p>
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
			<form method="POST" action="?/askQuestion">
				<label for="question" class="block font-medium text-gray-700 mb-2">
					Ask a question about the video: {form.title}
				</label>

				<input
					type="text"
					name="question"
					id="question"
					class="focus:ring-indigo-500 rounded-md p-2 shadow-md block w-full"
					placeholder="Question"
				/>
				<button
					type="submit"
					class="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
				>
					Submit
				</button>
			</form>
		{:else}
			<form method="POST" action="?/loadVideo">
				<label for="url" class="block font-medium text-gray-700 mb-2">Input a video url: </label>
				<input
					type="url"
					name="url"
					id="url"
					class="focus:ring-indigo-500 rounded-md p-2 shadow-md block w-full"
					placeholder="https://"
				/>
				<button
					type="submit"
					class="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
				>
					Submit
				</button>
			</form>
		{/if}
	</div>
</div>
