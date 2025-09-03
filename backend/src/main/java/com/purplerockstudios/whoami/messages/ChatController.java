package com.purplerockstudios.whoami.messages;

import com.purplerockstudios.whoami.personality.PersonalityService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.SessionScope;

import static com.purplerockstudios.whoami.messages.ChatResponse.stringToChatResponse;

@RestController
@SessionScope
@AllArgsConstructor
public class ChatController {

	private final ChatService chatService;
	private final PersonalityService personalityService;

	@PostMapping(value = "/test", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	ChatResponse getMessage(@RequestBody ChatRequest message) {
		if (checkWin(message.getMessage())) {
			return stringToChatResponse("WIN");
		}

		return stringToChatResponse(chatService.answer(message.getMessage()));
	}

	private boolean checkWin(String message) {
		return personalityService.checkWin(message);
	}
}
