package com.purplerockstudios.whoami.messages;

import com.purplerockstudios.whoami.common.Response;
import lombok.Getter;

@Getter
public class ChatResponse extends Response<String> {

	public ChatResponse(String message) {
		super(message);
	}

	public static ChatResponse stringToChatResponse(String message) {
		return new ChatResponse(message);
	}
}
