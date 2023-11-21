import type { Actions } from './$types';
import { YoutubeLoader } from 'langchain/document_loaders/web/youtube';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { FaissStore } from 'langchain/vectorstores/faiss';
import { OPENAI_KEY } from '$env/static/private';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';
import { RetrievalQAChain, loadQAStuffChain } from 'langchain/chains';

/**
 * TODO: Backend "state" for the loaded in video
 * VectorStore, youtuber and video title
 */
// let vectorStore: FaissStore | null = null;
// let youtuber: string | null = null;
// let videoTitle: string | null = null;

export const actions = {
	loadVideo: async ({ request }) => {
		const formData = await request.formData();
		const url = formData.get('url');
		if (typeof url !== 'string') return;

		/**
		 * TODO: Load Youtube Info from url: create a YoutubeLoader and load in the documents
		 */
		// const docs = await YoutubeLoader.createFromUrl(url, {
		// 	language: 'en',
		// 	addVideoInfo: true
		// }).load();

		/**
		 * TODO: Split up the information into chunks (first create splitter using RecursiveCharacterTextSplitter, then use .splitDocuments on docs.flat())
		 */
		// const splitter = new RecursiveCharacterTextSplitter({
		// 	chunkSize: 1000,
		// 	chunkOverlap: 0
		// });
		// const texts = await splitter.splitDocuments(docs.flat());

		/**
		 * TODO: Create a vector store and store splitted chunks as embeddings
		 */
		// vectorStore = await FaissStore.fromDocuments(
		// 	texts,
		// 	new OpenAIEmbeddings({
		// 		openAIApiKey: OPENAI_KEY
		// 	})
		// );

		/**
		 * TODO: Store the youtuber and video title in the backend state (docs[0].metadata)
		 */
		// youtuber = docs[0].metadata.author;
		// videoTitle = docs[0].metadata.title;

		/**
		 * TODO: Bring back video title and loaded true state
		 */
		return {
			// title: videoTitle,
			loaded: true
		};
	},
	askQuestion: async ({ request }) => {
		const formData = await request.formData();
		const question = formData.get('question');
		if (typeof question !== 'string') return;

		/**
		 * TODO: Return if we have no vector store in backend state
		 */
		// if (!vectorStore) return;

		/**
		 * TODO: Create a retriever from the vector store
		 */
		// const retriever = vectorStore.asRetriever();

		/**
		 * TODO: Create a chat model from the ChatOpenAI class
		 */
		// const model = new ChatOpenAI({
		// 	model: 'gpt-3.5-turbo-16k',
		// 	openAIApiKey: OPENAI_KEY
		// });

		/**
		 * TODO: Create a prompt template that will be used to generate the prompt
		 */
		// const promptStart = `You will be answering questions about a Youtuber named '${youtuber}'. Answer the questions based on the following context, based on the video '${videoTitle}':\n\n`;

		// const template = `${promptStart}
		//   ----
		//   {context}
		//   ----
		//   Question: {question}
		//   Answer:`;

		/**
		 * TODO: Create a retrieval QA chain that will combine the documents, the retriever and the chat model
		 * (First a new PromptTemplate with the input variables, then the chain)
		 */
		// const chainPrompt = new PromptTemplate({
		// 	inputVariables: ['context', 'question'],
		// 	template
		// });

		// const chain = new RetrievalQAChain({
		// 	combineDocumentsChain: loadQAStuffChain(model, { prompt: chainPrompt }),
		// 	retriever,
		// 	returnSourceDocuments: false,
		// 	inputKey: 'question',
		// 	verbose: true
		// });

		/**
		 * TODO: Call the chain with the question
		 */
		// const result = await chain.call({ question });

		/**
		 * TODO: Return the result and answered true state
		 */
		return {
			answered: true
			// title: videoTitle,
			// question,
			// answer: result.text
		};
	},
	askNewQuestion: async () => {
		/**
		 * TODO: Return the video title and loaded true state
		 */
		return {
			// title: videoTitle,
			loaded: true
		};
	}
} satisfies Actions;
