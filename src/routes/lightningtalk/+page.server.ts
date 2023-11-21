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

export const actions = {
	loadVideo: async ({ request }) => {
		const formData = await request.formData();
		const url = formData.get('url');
		if (typeof url !== 'string') return;

		/**
		 * TODO: Load Youtube Info from url: create a YoutubeLoader and load in the documents
		 */

		/**
		 * TODO: Split up the information into chunks (first create splitter using RecursiveCharacterTextSplitter, then use .splitDocuments on docs.flat())
		 */

		/**
		 * TODO: Create a vector store and store splitted chunks as embeddings
		 */

		/**
		 * TODO: Store the youtuber and video title in the backend state (docs[0].metadata)
		 */

		/**
		 * TODO: Bring back video title and loaded true state
		 */
		return {
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

		/**
		 * TODO: Create a retriever from the vector store
		 */

		/**
		 * TODO: Create a chat model from the ChatOpenAI class
		 */

		/**
		 * TODO: Create a prompt template that will be used to generate the prompt
		 * Prompt: You will be answering questions about a Youtuber named '${youtuber}'. Answer the questions based on the following context, based on the video '${videoTitle}':
		 * Template: `${promptStart}
      ----
      {context}
      ----
      Question: {question}
      Answer:`
		 */

		/**
		 * TODO: Create a retrieval QA chain that will combine the documents, the retriever and the chat model
		 * (First a new PromptTemplate with the input variables, then the chain)
		 */

		/**
		 * TODO: Call the chain with the question
		 */

		/**
		 * TODO: Return the result and answered true state
		 */

		return {
			answered: true
		};
	},
	askNewQuestion: async () => {
		/**
		 * TODO: Return the video title and loaded true state
		 */

		return {
			loaded: true
		};
	}
} satisfies Actions;
