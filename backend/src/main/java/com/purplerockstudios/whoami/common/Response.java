package com.purplerockstudios.whoami.common;

import lombok.Getter;

@Getter
public abstract class Response<T> {

	T simpleResponse;

	protected Response(T message) {
		this.simpleResponse = message;
	}
}
