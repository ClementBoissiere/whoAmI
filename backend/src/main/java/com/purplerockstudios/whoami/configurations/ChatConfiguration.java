package com.purplerockstudios.whoami.configurations;

import com.purplerockstudios.whoami.messages.ChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
public class ChatConfiguration {

	@Value("${mistral.api.key}")
	private String apiKey;

	public String getApiKey() {
		return apiKey;
	}

	@Bean
	@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
	public ChatModel chatModel() {
		return new ChatModel(apiKey);
	}

}
