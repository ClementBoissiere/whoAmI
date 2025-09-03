package com.purplerockstudios.whoami.personality;

import com.purplerockstudios.whoami.common.Response;
import com.purplerockstudios.whoami.messages.ChatResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.purplerockstudios.whoami.messages.ChatResponse.stringToChatResponse;
import static com.purplerockstudios.whoami.personality.PersonalityResponse.stringToPersonalityResponse;

@RestController
@AllArgsConstructor
public class PersonalityController {

	private final PersonalityService personalityService;

	@GetMapping(value = "/personality", produces = MediaType.APPLICATION_JSON_VALUE)
	ChatResponse getPersonalityOfTheDay() {
		return stringToChatResponse(this.personalityService.getPersonalityOfTheDay());
	}

	@GetMapping(value = "/oldPersonalities", produces = MediaType.APPLICATION_JSON_VALUE)
	PersonalityResponse getOldPersonalities() {
		return stringToPersonalityResponse(this.personalityService.getOldPersonalities());
	}

	@GetMapping(value = "/lastPersonality", produces = MediaType.APPLICATION_JSON_VALUE)
	ChatResponse getLastPersonality() {
		return stringToChatResponse(this.personalityService.getLastPersonality());
	}
}