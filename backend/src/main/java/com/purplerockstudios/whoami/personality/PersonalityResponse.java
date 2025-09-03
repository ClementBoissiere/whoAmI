package com.purplerockstudios.whoami.personality;

import com.purplerockstudios.whoami.common.Response;
import lombok.Getter;

import java.util.List;

@Getter
public class PersonalityResponse extends Response<List<String>> {

	List<String> response;

	public PersonalityResponse(List<String> message) {
		super(message);
		this.response = message;
	}

	public static PersonalityResponse stringToPersonalityResponse(List<String> message) {
		return new PersonalityResponse(message);
	}
}
