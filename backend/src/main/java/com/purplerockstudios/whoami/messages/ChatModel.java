package com.purplerockstudios.whoami.messages;

import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.mistralai.MistralAiChatModel;
import lombok.Getter;

@Getter
public class ChatModel {

	private final ChatLanguageModel assistant;

	public ChatModel(String apiKey) {
		this.assistant = MistralAiChatModel.builder()
				.apiKey(apiKey)
				.modelName("mistral-small-latest")
				.topP(0.1)
				.maxTokens(50)
				.maxRetries(0)
				.logRequests(true)
				.logResponses(true)
				.build();
	}
}
