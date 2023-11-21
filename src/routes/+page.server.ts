import type { Actions } from './$types';
import { YoutubeLoader } from 'langchain/document_loaders/web/youtube';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { FaissStore } from 'langchain/vectorstores/faiss';
import { OPENAI_KEY } from '$env/static/private';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';
import { RetrievalQAChain, loadQAStuffChain } from 'langchain/chains';

// Backend "state" for the loaded in video
let vectorStore: FaissStore | null = null;
let youtuber: string | null = null;
let videoTitle: string | null = null;

export const actions = {
	loadVideo: async ({ request }) => {
		const formData = await request.formData();
		const url = formData.get('url');
		if (typeof url !== 'string') return;

		const docs = await YoutubeLoader.createFromUrl(url, {
			language: 'en',
			addVideoInfo: true
		}).load();

		// Create a text transformer that will split the text into chunks of 1000 characters
		const splitter = new RecursiveCharacterTextSplitter({
			chunkSize: 1000,
			chunkOverlap: 0
		});

		// Split the documents into chunks of 1000 characters
		const texts = await splitter.splitDocuments(docs.flat());

		// Create a vector store from the documents
		vectorStore = await FaissStore.fromDocuments(
			texts,
			new OpenAIEmbeddings({
				openAIApiKey: OPENAI_KEY
			})
		);

		youtuber = docs[0].metadata.author;
		videoTitle = docs[0].metadata.title;

		return {
			loaded: true,
			title: docs[0].metadata.title
		};
	},
	askQuestion: async ({ request }) => {
		const formData = await request.formData();
		const question = formData.get('question');
		if (typeof question !== 'string') return;

		if (!vectorStore) return;

		const retriever = vectorStore.asRetriever();

		const model = new ChatOpenAI({
			model: 'gpt-3.5-turbo-16k',
			openAIApiKey: OPENAI_KEY
		});

		const promptStart = `You will be answering questions about a Youtuber named '${youtuber}'. Answer the questions based on the following context, based on the video '${videoTitle}':\n\n`;

		const template = `${promptStart}
      ----
      {context}
      ----
      Question: {question}
      Answer:`;

		const QA_CHAIN_PROMPT = new PromptTemplate({
			inputVariables: ['context', 'question'],
			template
		});

		// Create a retrieval QA chain that will combine the documents, the retriever and the chat model
		const chain = new RetrievalQAChain({
			combineDocumentsChain: loadQAStuffChain(model, { prompt: QA_CHAIN_PROMPT }),
			retriever,
			returnSourceDocuments: false,
			inputKey: 'question',
			verbose: true
		});

		const result = await chain.call({ question });

		console.log(result);

		return {
			answered: true,
			title: videoTitle,
			question,
			answer: result.text
		};
	}
} satisfies Actions;
